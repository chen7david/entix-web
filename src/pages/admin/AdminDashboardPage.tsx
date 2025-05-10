import React from 'react';
import { Row } from 'antd';
import {
  ArrowUpOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import PageHeaderComponent from '../../components/ui/PageHeader';
import StatisticCard from '../../components/admin/StatisticCard';

/**
 * Admin Dashboard Page.
 * Displays summary statistics and information.
 * @returns {JSX.Element} The rendered AdminDashboardPage component.
 */
const AdminDashboardPage: React.FC = () => {
  const dashboardStats = [
    {
      title: 'Active Users',
      value: 112893,
      precision: 0,
      valueStyle: { color: '#3f8600' },
      prefix: <UserOutlined />,
      suffix: 'users',
    },
    {
      title: 'New Signups (Last 7 Days)',
      value: 930,
      precision: 0,
      valueStyle: { color: '#cf1322' },
      prefix: <ArrowUpOutlined />,
      cardProps: { bordered: true },
    },
    {
      title: 'Sales (Last 7 Days)',
      value: 12500.5,
      precision: 2,
      valueStyle: { color: '#3f8600' },
      prefix: <DollarCircleOutlined />,
      suffix: 'USD',
    },
    {
      title: 'Pending Orders',
      value: 78,
      precision: 0,
      valueStyle: { color: '#1890ff' },
      prefix: <ShoppingCartOutlined />,
    },
  ];

  return (
    <div>
      <PageHeaderComponent
        title="Admin Dashboard"
        description="Welcome to the admin dashboard. Here you can see an overview of your application statistics and manage various aspects."
      />
      <Row gutter={[16, 16]}>
        {dashboardStats.map((stat, index) => (
          <StatisticCard
            key={index}
            title={stat.title}
            value={stat.value}
            precision={stat.precision}
            valueStyle={stat.valueStyle}
            prefix={stat.prefix}
            suffix={stat.suffix}
            cardProps={stat.cardProps}
          />
        ))}
      </Row>
      {/* Add more dashboard widgets or charts here */}
    </div>
  );
};

export default AdminDashboardPage;
