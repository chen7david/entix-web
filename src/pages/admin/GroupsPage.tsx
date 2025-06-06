import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminGroupService } from "../../services/api";
import {
  Table,
  Button,
  Modal,
  message,
  Space,
  Typography,
  Form,
  Input,
  Dropdown,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  UserAddOutlined,
  ReloadOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import dayjs from "../../config/dayjs.config";
import { useState, useEffect } from "react";

const { Title } = Typography;
const { confirm } = Modal;

// Group type for rendering - should match what comes from the API
type GroupType = {
  groupName: string;
  userPoolId?: string;
  description?: string;
  precedence?: number;
  roleArn?: string;
  creationDate?: Date | string;
  lastModifiedDate?: Date | string;
};

// API response type
type GroupsApiResponse = {
  groups: GroupType[];
};

// User type for the users in a group
type GroupUserType = {
  Username: string;
  Status?: string;
  AddedDate?: Date;
};

/**
 * GroupDeleteButton component to handle individual group deletion
 */
const GroupDeleteButton = ({
  groupName,
  onSuccess,
  isInDropdown = false,
}: {
  groupName: string;
  onSuccess: () => void;
  isInDropdown?: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await adminGroupService.deleteGroup({ groupName });
      message.success("Group deleted successfully");
      onSuccess();
    } catch (error) {
      message.error(
        `Failed to delete group: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this group?",
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content:
        "This action cannot be undone. All data associated with this group will be permanently removed.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: handleDelete,
    });
  };

  if (isInDropdown) {
    return (
      <div
        onClick={showDeleteConfirm}
        className="flex items-center text-red-500 px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <DeleteOutlined className="mr-2" />
        <span>Delete</span>
      </div>
    );
  }

  return (
    <Button
      danger
      type="link"
      icon={<DeleteOutlined />}
      onClick={showDeleteConfirm}
      loading={loading}
    >
      Delete
    </Button>
  );
};

/**
 * GroupForm component for creating/editing groups
 */
const GroupForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
}: {
  initialValues?: Partial<GroupType>;
  onSubmit: (values: GroupType) => void;
  isSubmitting: boolean;
}) => {
  return (
    <Form
      layout="vertical"
      initialValues={initialValues || {}}
      onFinish={onSubmit}
    >
      <Form.Item
        name="groupName"
        label="Group Name"
        rules={[{ required: true, message: "Please enter group name" }]}
      >
        <Input disabled={!!initialValues?.groupName} />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item name="precedence" label="Precedence">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="roleArn" label="Role ARN">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          {initialValues?.groupName ? "Update Group" : "Create Group"}
        </Button>
      </Form.Item>
    </Form>
  );
};

/**
 * User management modal for adding/removing users from a group
 */
const GroupUsersManagement = ({
  groupName,
  isInDropdown = false,
}: {
  groupName: string;
  isInDropdown?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const queryClient = useQueryClient();

  const { data: usersInGroup, isLoading } = useQuery({
    queryKey: ["users-in-group", groupName],
    queryFn: () => adminGroupService.listUsersInGroup({ groupName }),
    enabled: visible,
  });

  const addUserMutation = useMutation({
    mutationFn: (params: { username: string; groupName: string }) =>
      adminGroupService.addUserToGroup(params),
    onSuccess: () => {
      message.success("User added to group");
      setUsername("");
      queryClient.invalidateQueries({
        queryKey: ["users-in-group", groupName],
      });
    },
    onError: (error) => {
      message.error(`Failed to add user: ${error.message}`);
    },
  });

  const removeUserMutation = useMutation({
    mutationFn: (params: { username: string; groupName: string }) =>
      adminGroupService.removeUserFromGroup(params),
    onSuccess: () => {
      message.success("User removed from group");
      queryClient.invalidateQueries({
        queryKey: ["users-in-group", groupName],
      });
    },
    onError: (error) => {
      message.error(`Failed to remove user: ${error.message}`);
    },
  });

  const handleAddUser = () => {
    if (!username.trim()) {
      message.error("Username is required");
      return;
    }
    addUserMutation.mutate({ username, groupName });
  };

  const handleRemoveUser = (username: string) => {
    confirm({
      title: "Are you sure you want to remove this user from the group?",
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      okText: "Yes, Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => removeUserMutation.mutate({ username, groupName }),
    });
  };

  const closeModal = () => {
    setVisible(false);
  };

  if (isInDropdown) {
    return (
      <>
        <div
          onClick={() => setVisible(true)}
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <UserAddOutlined className="mr-2" />
          <span>Manage Users</span>
        </div>

        {visible && (
          <Modal
            title={`Manage Users in ${groupName}`}
            open={visible}
            onCancel={closeModal}
            footer={null}
            width={700}
          >
            <div className="mb-4">
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: 300 }}
                onPressEnter={handleAddUser}
              />
              <Button
                type="primary"
                onClick={handleAddUser}
                loading={addUserMutation.isPending}
                className="ml-2"
              >
                Add User
              </Button>
            </div>

            <Table
              dataSource={(usersInGroup?.Users || []) as GroupUserType[]}
              rowKey="Username"
              loading={isLoading}
              size="small"
              pagination={false}
              columns={[
                {
                  title: "Username",
                  dataIndex: "Username",
                  key: "username",
                },
                {
                  title: "Actions",
                  key: "actions",
                  render: (_: unknown, record: GroupUserType) => (
                    <Button
                      danger
                      type="link"
                      onClick={() => handleRemoveUser(record.Username)}
                      loading={removeUserMutation.isPending}
                    >
                      Remove
                    </Button>
                  ),
                },
              ]}
            />
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      <Button
        type="link"
        icon={<UserAddOutlined />}
        onClick={() => setVisible(true)}
      >
        Manage Users
      </Button>
      {visible && (
        <Modal
          title={`Manage Users in ${groupName}`}
          open={visible}
          onCancel={closeModal}
          footer={null}
          width={700}
        >
          <div className="mb-4">
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: 300 }}
              onPressEnter={handleAddUser}
            />
            <Button
              type="primary"
              onClick={handleAddUser}
              loading={addUserMutation.isPending}
              className="ml-2"
            >
              Add User
            </Button>
          </div>

          <Table
            dataSource={(usersInGroup?.Users || []) as GroupUserType[]}
            rowKey="Username"
            loading={isLoading}
            size="small"
            pagination={false}
            columns={[
              {
                title: "Username",
                dataIndex: "Username",
                key: "username",
              },
              {
                title: "Actions",
                key: "actions",
                render: (_: unknown, record: GroupUserType) => (
                  <Button
                    danger
                    type="link"
                    onClick={() => handleRemoveUser(record.Username)}
                    loading={removeUserMutation.isPending}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
          />
        </Modal>
      )}
    </>
  );
};

export const GroupsPage = () => {
  const queryClient = useQueryClient();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editGroup, setEditGroup] = useState<GroupType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const { data, isLoading, error, refetch } = useQuery<GroupsApiResponse>({
    queryKey: ["groups"],
    queryFn: () => adminGroupService.getGroups(),
  });

  // Log the data to see what we're getting
  useEffect(() => {
    if (data) {
      console.log("Groups data:", data);
    }
  }, [data]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const createGroupMutation = useMutation({
    mutationFn: (values: GroupType) => adminGroupService.createGroup(values),
    onSuccess: () => {
      message.success("Group created successfully");
      setCreateModalVisible(false);
      // Force refetch after creation to ensure new group appears
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      // Additional delay and refetch to ensure API consistency
      setTimeout(() => {
        refetch();
      }, 500);
    },
    onError: (error) => {
      message.error(`Failed to create group: ${error.message}`);
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: (values: GroupType) => adminGroupService.updateGroup(values),
    onSuccess: () => {
      message.success("Group updated successfully");
      setEditGroup(null);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      message.error(`Failed to update group: ${error.message}`);
    },
  });

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["groups"] });
  };

  const handleEdit = (record: GroupType) => {
    setEditGroup(record);
  };

  // Actions dropdown menu for each group
  const getActionMenu = (record: GroupType) => [
    {
      key: "edit",
      label: (
        <div
          onClick={() => handleEdit(record)}
          className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <EditOutlined className="mr-2" />
          <span>Edit</span>
        </div>
      ),
    },
    {
      key: "users",
      label: (
        <GroupUsersManagement
          groupName={record.groupName}
          isInDropdown={true}
        />
      ),
    },
    {
      key: "delete",
      label: (
        <GroupDeleteButton
          groupName={record.groupName}
          onSuccess={handleDeleteSuccess}
          isInDropdown={true}
        />
      ),
    },
  ];

  // Define columns based on screen size
  const getColumns = () => {
    // Base columns
    const baseColumns = [
      {
        title: "Group Name",
        dataIndex: "groupName",
        key: "groupName",
        sorter: (a: GroupType, b: GroupType) =>
          a.groupName.localeCompare(b.groupName),
        ellipsis: true,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
      },
      {
        title: "Precedence",
        dataIndex: "precedence",
        key: "precedence",
        sorter: (a: GroupType, b: GroupType) =>
          (a.precedence || 0) - (b.precedence || 0),
      },
      {
        title: "Creation Date",
        dataIndex: "creationDate",
        key: "creationDate",
        render: (date?: Date | string) =>
          date ? dayjs(date).format("MM-DD-YYYY") : "-",
      },
      {
        title: "Actions",
        key: "actions",
        fixed: "right" as const,
        width: 70,
        render: (_: unknown, record: GroupType) => (
          <Dropdown
            menu={{ items: getActionMenu(record) }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              icon={<EllipsisOutlined />}
              type="text"
              className="flex items-center justify-center"
            />
          </Dropdown>
        ),
      },
    ];

    // If on mobile, use a simplified column set
    if (isMobile) {
      return [
        {
          title: "Group",
          key: "group",
          render: (_: unknown, record: GroupType) => (
            <div>
              <div className="font-medium">{record.groupName}</div>
              {record.description && (
                <div className="text-xs text-gray-500">
                  {record.description}
                </div>
              )}
            </div>
          ),
        },
        baseColumns[4], // Actions
      ];
    }

    return baseColumns;
  };

  if (isLoading)
    return <div className="py-8 text-center">Loading groups...</div>;
  if (error)
    return (
      <div className="py-8 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  // Get the groups data from the API response
  const groups = data?.groups || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Title level={4}>Group Management</Title>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={isRefreshing}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Create Group
          </Button>
        </Space>
      </div>

      <Table
        rowKey="groupName"
        dataSource={groups}
        columns={getColumns()}
        size="middle"
        scroll={{ x: "max-content" }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />

      {/* Create Group Modal */}
      <Modal
        title="Create New Group"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <GroupForm
          onSubmit={createGroupMutation.mutate}
          isSubmitting={createGroupMutation.isPending}
        />
      </Modal>

      {/* Edit Group Modal */}
      <Modal
        title={`Edit Group: ${editGroup?.groupName}`}
        open={!!editGroup}
        onCancel={() => setEditGroup(null)}
        footer={null}
      >
        {editGroup && (
          <GroupForm
            initialValues={editGroup}
            onSubmit={updateGroupMutation.mutate}
            isSubmitting={updateGroupMutation.isPending}
          />
        )}
      </Modal>
    </div>
  );
};
