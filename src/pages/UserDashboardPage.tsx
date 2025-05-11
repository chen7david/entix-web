import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Button, Row, Col, Divider, Statistic, List, Tag } from 'antd';
import { apiService } from '@/services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthTokens, type User } from '@/features/auth/auth.store';
import { useMessage } from '@/utils/message';
import { CalendarOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// Sample data for demonstration
const upcomingLessons = [
  {
    id: 1,
    title: 'Introduction to React',
    date: '2023-11-15',
    time: '10:00 AM',
    instructor: 'John Doe',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    date: '2023-11-20',
    time: '2:00 PM',
    instructor: 'Jane Smith',
  },
];

const pastLessons = [
  {
    id: 3,
    title: 'HTML & CSS Basics',
    date: '2023-10-20',
    time: '11:00 AM',
    instructor: 'Mike Johnson',
    score: 92,
  },
  {
    id: 4,
    title: 'Git Fundamentals',
    date: '2023-10-10',
    time: '3:00 PM',
    instructor: 'Sarah Wilson',
    score: 88,
  },
];

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

            <Row gutter={16} className="mb-4">
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Student Points"
                    value={850}
                    prefix={<TrophyOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic title="Completed Lessons" value={8} prefix={<BookOutlined />} />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="Upcoming Lessons"
                    value={2}
                    prefix={<CalendarOutlined />}
                    valueStyle={{ color: '#1677ff' }}
                  />
                </Card>
              </Col>
            </Row>

            <Divider />

            <div className="mb-4">
              <Title level={4}>Upcoming Classes</Title>
              <List
                itemLayout="horizontal"
                dataSource={upcomingLessons}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <div>
                          <CalendarOutlined /> {item.date} at {item.time}
                          <br />
                          <Text type="secondary">Instructor: {item.instructor}</Text>
                        </div>
                      }
                    />
                    <Tag color="blue">Scheduled</Tag>
                  </List.Item>
                )}
              />
            </div>

            <Divider />

            <div className="mb-4">
              <Title level={4}>Past Lessons</Title>
              <List
                itemLayout="horizontal"
                dataSource={pastLessons}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={
                        <div>
                          <CalendarOutlined /> {item.date} at {item.time}
                          <br />
                          <Text type="secondary">Instructor: {item.instructor}</Text>
                        </div>
                      }
                    />
                    <Tag color="green">Score: {item.score}%</Tag>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="shadow-md">
            <Title level={4}>Quick Actions</Title>
            <div className="flex flex-col gap-2">
              <Button type="primary">
                <Link to="/profile">Edit Profile</Link>
              </Button>
              <Button>
                <Link to="/settings">Account Settings</Link>
              </Button>
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
