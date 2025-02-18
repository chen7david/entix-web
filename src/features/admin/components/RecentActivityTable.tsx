import { Table, Tag, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { UserOutlined, ShoppingCartOutlined, MailOutlined } from "@ant-design/icons";

interface Activity {
  key: string;
  user: string;
  action: string;
  type: "user" | "order" | "email";
  status: "success" | "pending" | "failed";
  timestamp: string;
}

interface RecentActivityTableProps {
  data: Activity[];
  loading?: boolean;
}

const getStatusColor = (status: Activity["status"]) => {
  switch (status) {
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "error";
    default:
      return "default";
  }
};

const getActionIcon = (type: Activity["type"]) => {
  switch (type) {
    case "user":
      return <UserOutlined />;
    case "order":
      return <ShoppingCartOutlined />;
    case "email":
      return <MailOutlined />;
    default:
      return null;
  }
};

export const RecentActivityTable: React.FC<RecentActivityTableProps> = ({
  data,
  loading = false,
}) => {
  const columns: ColumnsType<Activity> = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: Activity) => (
        <Space>
          {getActionIcon(record.type)}
          {text}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Activity["status"]) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
  ];

  return (
    <Table<Activity>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default RecentActivityTable;
