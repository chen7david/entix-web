import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import PageHeaderComponent from '../../components/ui/PageHeader';

/**
 * Admin Dashboard Page.
 * Displays summary statistics and information.
 * @returns {JSX.Element} The rendered AdminDashboardPage component.
 */
const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <PageHeaderComponent
        title="Admin Dashboard"
        description="Welcome to the admin dashboard. Here you can see an overview of your application statistics and manage various aspects."
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card variant="borderless" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Statistic
              title="Active Users"
              value={112893}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
              suffix="users"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card variant="outlined" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Statistic
              title="New Signups (Last 7 Days)"
              value={930}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card variant="borderless" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Statistic
              title="Sales (Last 7 Days)"
              value={12500.5}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarCircleOutlined />}
              suffix="USD"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card variant="borderless" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
            <Statistic
              title="Pending Orders"
              value={78}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      {/* Add more dashboard widgets or charts here */}
    </div>
  );
};

export default AdminDashboardPage;
