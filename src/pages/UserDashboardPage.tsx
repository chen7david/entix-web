import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Button, Row, Col, Divider } from 'antd';
import { apiService } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';
import { clearAuthTokens, type User } from '@/features/auth/auth.store';
import { useMessage } from '@/utils/message';

const { Title, Paragraph } = Typography;

/**
 * UserDashboardPage component displays user information and logout option
 * @returns {JSX.Element} User dashboard page
 */
const UserDashboardPage: React.FC = () => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const message = useMessage();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiService.get('/api/v1/users/me');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        message.error('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [message]);

  const handleLogout = () => {
    // Clear authentication tokens
    clearAuthTokens();
    // Show success message
    message.success('You have been logged out successfully');
    // Redirect to sign-in page
    navigate('/auth/signin');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="shadow-md">
            <div className="mb-4">
              <Title level={2}>Welcome to Your Dashboard</Title>
              <Paragraph>
                Hello, {user?.username || 'User'}! Here you can manage your account and see your
                recent activity.
              </Paragraph>
            </div>

            <Divider />

            <div className="mb-4">
              <Title level={4}>Account Information</Title>
              <Paragraph>
                <strong>Username:</strong> {user?.username || 'Not available'}
              </Paragraph>
              <Paragraph>
                <strong>Email:</strong> {user?.email || 'Not available'}
              </Paragraph>
            </div>

            <Divider />

            <div className="mb-4">
              <Title level={4}>Recent Activity</Title>
              <Paragraph>No recent activity to display.</Paragraph>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="shadow-md">
            <Title level={4}>Quick Actions</Title>
            <div className="flex flex-col gap-2">
              <Button type="primary" href="/profile">
                Edit Profile
              </Button>
              <Button href="/settings">Account Settings</Button>
              <Button danger onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboardPage;
