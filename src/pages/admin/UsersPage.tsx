import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../services/api";
import { Table } from "antd";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
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
      <Table dataSource={data} columns={columns} />
    </div>
  );
};
