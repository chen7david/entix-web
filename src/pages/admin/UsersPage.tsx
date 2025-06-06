import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUserService, adminGroupService } from "../../services/api";
import {
  Badge,
  Table,
  Button,
  Modal,
  message,
  Space,
  Typography,
  Form,
  Input,
  Select,
  Tabs,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import type {
  AdminUserAttributesDto,
  AdminUserDto,
  AdminCreateUserParamsDto,
} from "../../services/api/admin";
import dayjs, { timeSince } from "../../config/dayjs.config";
import { useState } from "react";

const { Title } = Typography;
const { confirm } = Modal;
const { TabPane } = Tabs;

type UserType = AdminUserDto;

// Type for groups that a user belongs to
type UserGroupType = {
  GroupName: string;
  Status?: string;
  AddedDate?: Date;
};

// Type for group in groups list
type GroupItemType = {
  groupName: string;
  description?: string;
  precedence?: number;
  roleArn?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
};

// Type for user attributes updates
type UserAttributesUpdate = {
  username: string;
  email?: string;
  phone?: string;
  temporaryPassword?: string;
};

/**
 * UserDeleteButton component to handle individual user deletion
 * Each button manages its own loading state
 */
const UserDeleteButton = ({
  username,
  onSuccess,
}: {
  username: string;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await adminUserService.deleteUser(username);
      message.success("User deleted successfully");
      onSuccess();
    } catch (error) {
      message.error(
        `Failed to delete user: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      content:
        "This action cannot be undone. All data associated with this user will be permanently removed.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: handleDelete,
    });
  };

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
 * User form component for creating and editing users
 */
const UserForm = ({
  initialValues,
  onSubmit,
  isSubmitting,
}: {
  initialValues?: Partial<UserAttributesUpdate>;
  onSubmit: (values: UserAttributesUpdate) => void;
  isSubmitting: boolean;
}) => {
  return (
    <Form
      layout="vertical"
      initialValues={initialValues || {}}
      onFinish={onSubmit}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please enter username" }]}
      >
        <Input disabled={!!initialValues?.username} />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input type="email" />
      </Form.Item>

      {!initialValues?.username && (
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password />
        </Form.Item>
      )}

      <Form.Item name="phone" label="Phone Number">
        <Input />
      </Form.Item>

      <Form.Item
        name="temporaryPassword"
        label="Temporary Password"
        extra="Leave blank to keep current password"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          {initialValues?.username ? "Update User" : "Create User"}
        </Button>
      </Form.Item>
    </Form>
  );
};

/**
 * Group management for users
 */
const UserGroupsManagement = ({ username }: { username: string }) => {
  const [visible, setVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const queryClient = useQueryClient();

  const { data: userGroups, isLoading } = useQuery({
    queryKey: ["user-groups", username],
    queryFn: () => adminGroupService.listGroupsForUser({ username }),
    enabled: visible,
  });

  const { data: allGroups } = useQuery({
    queryKey: ["all-groups"],
    queryFn: () => adminGroupService.getGroups(),
    enabled: visible,
  });

  const addToGroupMutation = useMutation({
    mutationFn: (params: { username: string; groupName: string }) =>
      adminGroupService.addUserToGroup(params),
    onSuccess: () => {
      message.success("User added to group");
      setGroupName("");
      queryClient.invalidateQueries({
        queryKey: ["user-groups", username],
      });
    },
    onError: (error) => {
      message.error(`Failed to add to group: ${error.message}`);
    },
  });

  const removeFromGroupMutation = useMutation({
    mutationFn: (params: { username: string; groupName: string }) =>
      adminGroupService.removeUserFromGroup(params),
    onSuccess: () => {
      message.success("User removed from group");
      queryClient.invalidateQueries({
        queryKey: ["user-groups", username],
      });
    },
    onError: (error) => {
      message.error(`Failed to remove from group: ${error.message}`);
    },
  });

  const handleAddToGroup = () => {
    if (!groupName) {
      message.error("Please select a group");
      return;
    }
    addToGroupMutation.mutate({ username, groupName });
  };

  const handleRemoveFromGroup = (groupName: string) => {
    confirm({
      title: "Are you sure you want to remove this user from the group?",
      icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
      okText: "Yes, Remove",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => removeFromGroupMutation.mutate({ username, groupName }),
    });
  };

  // Filter out groups the user is already in
  const availableGroups =
    allGroups?.Groups?.filter(
      (group: GroupItemType) =>
        !userGroups?.Groups?.some(
          (g: UserGroupType) => g.GroupName === group.groupName
        )
    ) || [];

  return (
    <>
      <Button
        type="link"
        icon={<UserAddOutlined />}
        onClick={() => setVisible(true)}
      >
        Manage Groups
      </Button>
      <Modal
        title={`Manage Groups for ${username}`}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
      >
        <div className="mb-4">
          <Select
            placeholder="Select a group to add"
            value={groupName}
            onChange={setGroupName}
            style={{ width: 300 }}
            options={availableGroups.map((group: GroupItemType) => ({
              value: group.groupName,
              label: group.groupName,
            }))}
          />
          <Button
            type="primary"
            onClick={handleAddToGroup}
            loading={addToGroupMutation.isPending}
            className="ml-2"
            disabled={!groupName}
          >
            Add to Group
          </Button>
        </div>

        <Table
          dataSource={(userGroups?.Groups || []) as UserGroupType[]}
          rowKey="GroupName"
          loading={isLoading}
          size="small"
          pagination={false}
          columns={[
            {
              title: "Group Name",
              dataIndex: "GroupName",
              key: "groupName",
            },
            {
              title: "Status",
              dataIndex: "Status",
              key: "status",
            },
            {
              title: "Actions",
              key: "actions",
              render: (_: unknown, record: UserGroupType) => (
                <Button
                  danger
                  type="link"
                  onClick={() => handleRemoveFromGroup(record.GroupName)}
                  loading={removeFromGroupMutation.isPending}
                >
                  Remove
                </Button>
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

export const UsersPage = () => {
  const queryClient = useQueryClient();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editUser, setEditUser] = useState<UserType | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => adminUserService.getUsers(),
    select: (data) => data.users,
  });

  const createUserMutation = useMutation({
    mutationFn: (values: AdminCreateUserParamsDto) =>
      adminUserService.createUser(values),
    onSuccess: () => {
      message.success("User created successfully");
      setCreateModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`Failed to create user: ${error.message}`);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: UserAttributesUpdate) => {
      const { username, ...attributes } = values;
      return adminUserService.updateUserAttributes({
        username,
        attributes: {
          email: attributes.email || "",
          phone_number: attributes.phone || "",
          ...(attributes.temporaryPassword
            ? { temporary_password: attributes.temporaryPassword }
            : {}),
        },
      });
    },
    onSuccess: () => {
      message.success("User updated successfully");
      setEditUser(null);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      message.error(`Failed to update user: ${error.message}`);
    },
  });

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleEdit = (record: UserType) => {
    setEditUser(record);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: UserType, b: UserType) =>
        a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "userAttributes",
      key: "email",
      render: (userAttributes: AdminUserAttributesDto) => userAttributes.email,
    },
    {
      title: "Created At",
      dataIndex: "userCreateDate",
      key: "userCreateDate",
      sorter: (a: UserType, b: UserType) =>
        new Date(a.userCreateDate).getTime() -
        new Date(b.userCreateDate).getTime(),
      render: (date: Date) => dayjs(date).format("MM-DD-YYYY"),
    },
    {
      title: "Last Modified",
      dataIndex: "userLastModifiedDate",
      key: "userLastModifiedDate",
      render: (date: Date) => timeSince(date),
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      render: (enabled: boolean) => (
        <Badge
          status={enabled ? "success" : "error"}
          text={enabled ? "Active" : "Inactive"}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: UserType) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <UserGroupsManagement username={record.username} />
          <UserDeleteButton
            username={record.username}
            onSuccess={handleDeleteSuccess}
          />
        </Space>
      ),
    },
  ];

  if (isLoading)
    return <div className="py-8 text-center">Loading users...</div>;
  if (error)
    return (
      <div className="py-8 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Title level={4}>User Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalVisible(true)}
        >
          Create User
        </Button>
      </div>

      <Table
        rowKey="username"
        dataSource={data}
        columns={columns}
        size="middle"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />

      {/* Create User Modal */}
      <Modal
        title="Create New User"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
      >
        <UserForm
          onSubmit={
            createUserMutation.mutate as (values: UserAttributesUpdate) => void
          }
          isSubmitting={createUserMutation.isPending}
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title={`Edit User: ${editUser?.username}`}
        open={!!editUser}
        onCancel={() => setEditUser(null)}
        footer={null}
      >
        {editUser && (
          <Tabs defaultActiveKey="profile">
            <TabPane tab="Profile" key="profile">
              <UserForm
                initialValues={{
                  username: editUser.username,
                  email: editUser.userAttributes.email,
                }}
                onSubmit={updateUserMutation.mutate}
                isSubmitting={updateUserMutation.isPending}
              />
            </TabPane>
            <TabPane tab="Groups" key="groups">
              <UserGroupsManagement username={editUser.username} />
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </div>
  );
};
