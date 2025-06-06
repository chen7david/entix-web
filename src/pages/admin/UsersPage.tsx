import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../../services/api";
import { Badge, Table, Button, Modal, message, Space, Typography } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import type {
  AdminUserAttributesDto,
  AdminListUsersResponseDto,
} from "../../services/api/admin.dto";
import dayjs, { timeSince } from "../../config/dayjs.config";
import { useState } from "react";

const { Title } = Typography;
const { confirm } = Modal;

type UserType = AdminListUsersResponseDto["users"][0];

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
      await adminService.deleteUser(username);
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

export const UsersPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => adminService.getUsers(),
    select: (data) => data.users,
  });

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
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
    </div>
  );
};
