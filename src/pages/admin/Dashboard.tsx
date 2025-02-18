import { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Tabs } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import StatCard from "@/features/admin/components/StatCard";
import RecentActivityTable from "@/features/admin/components/RecentActivityTable";
import AnalyticsChart from "@/features/admin/components/AnalyticsChart";

const { Title } = Typography;
const { TabPane } = Tabs;

export const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock data for statistics
  const stats = [
    {
      title: "Total Users",
      value: 1234,
      prefix: <TeamOutlined />,
      color: "#1890ff",
    },
    {
      title: "Active Users",
      value: 891,
      prefix: <UserOutlined />,
      color: "#52c41a",
    },
    {
      title: "Total Orders",
      value: 456,
      prefix: <ShoppingCartOutlined />,
      color: "#722ed1",
    },
    {
      title: "Revenue",
      value: 12345,
      prefix: <DollarOutlined />,
      suffix: "USD",
      color: "#faad14",
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      key: "1",
      user: "John Doe",
      action: "Created account",
      type: "user",
      status: "success",
      timestamp: "2025-02-18 10:30 AM",
    },
    {
      key: "2",
      user: "Jane Smith",
      action: "Placed order #123",
      type: "order",
      status: "pending",
      timestamp: "2025-02-18 10:15 AM",
    },
    {
      key: "3",
      user: "Bob Johnson",
      action: "Verified email",
      type: "email",
      status: "success",
      timestamp: "2025-02-18 10:00 AM",
    },
  ] as const;

  // Mock data for analytics chart
  const analyticsData = [
    { date: "2025-02-12", value: 3, category: "Users" },
    { date: "2025-02-13", value: 4, category: "Users" },
    { date: "2025-02-14", value: 6, category: "Users" },
    { date: "2025-02-15", value: 8, category: "Users" },
    { date: "2025-02-16", value: 7, category: "Users" },
    { date: "2025-02-17", value: 9, category: "Users" },
    { date: "2025-02-18", value: 11, category: "Users" },
    { date: "2025-02-12", value: 1, category: "Orders" },
    { date: "2025-02-13", value: 2, category: "Orders" },
    { date: "2025-02-14", value: 3, category: "Orders" },
    { date: "2025-02-15", value: 4, category: "Orders" },
    { date: "2025-02-16", value: 3, category: "Orders" },
    { date: "2025-02-17", value: 5, category: "Orders" },
    { date: "2025-02-18", value: 6, category: "Orders" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2}>Dashboard</Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              loading={loading}
              color={stat.color}
            />
          </Col>
        ))}
      </Row>

      {/* Analytics and Activity */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} lg={16}>
          <Card title="Analytics" className="h-full">
            <Tabs defaultActiveKey="weekly">
              <TabPane
                tab={
                  <span className="flex items-center gap-2">Weekly Overview</span>
                }
                key="weekly"
              >
                <AnalyticsChart data={analyticsData} loading={loading} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Activity" className="h-full">
            <RecentActivityTable data={recentActivity} loading={loading} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
