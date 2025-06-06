import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/api";
import { Badge, Table } from "antd";
import type { AdminUserAttributesDto } from "../../services/api/admin.dto";
import dayjs, { timeSince } from "../../config/dayjs.config";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "userAttributes",
    render: (userAttributes: AdminUserAttributesDto) => userAttributes.email,
  },
  {
    title: "Created At",
    dataIndex: "userCreateDate",
    render: (date: Date) => dayjs(date).format("MM-DD-YYYY"),
  },
  {
    title: "Last Modified",
    dataIndex: "userLastModifiedDate",
    render: (date: Date) => timeSince(date),
  },
  {
    title: "Enabled",
    dataIndex: "enabled",
    render: (enabled: boolean) => (
      <Badge status={enabled ? "success" : "error"} />
    ),
  },
];

export const UsersPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => adminService.getUsers(),
    select: (data) => data.users,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <Table size="small" dataSource={data} columns={columns} />
    </div>
  );
};
