import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Avatar, Upload, Spin, Row, Col, Typography } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { apiService } from '@/services/apiService';
import type { User } from '@/features/auth/auth.store';
import { useMessage } from '@/utils/message';

const { Title } = Typography;

/**
 * ProfilePage component for user profile management
 * Allows users to view and update their profile information
 * @returns {JSX.Element} The profile page component
 */
const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const messageApi = useMessage();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiService.get('/api/v1/users/me');
        setUser(response.data);

        // Set form values
        form.setFieldsValue({
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          phone: response.data.phone || '',
        });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        messageApi.error('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [form, messageApi]);

  const handleSubmit = async (values: Record<string, string>) => {
    setSubmitting(true);
    try {
      await apiService.put('/api/v1/users/me', values);
      messageApi.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      messageApi.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
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
        <Col xs={24} md={8}>
          <Card className="shadow-md text-center">
            <Avatar size={100} icon={<UserOutlined />} />
            <Title level={4} className="mt-4">
              {user?.username}
            </Title>
            <p className="text-gray-500">{user?.email}</p>
            <Upload
              name="avatar"
              listType="picture"
              className="mt-4"
              showUploadList={false}
              beforeUpload={() => {
                messageApi.info('Avatar upload is not implemented in this demo');
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Change Avatar</Button>
            </Upload>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card className="shadow-md">
            <Title level={4}>Profile Information</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Email" disabled />
              </Form.Item>

              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <Input placeholder="Username" disabled />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number' },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
