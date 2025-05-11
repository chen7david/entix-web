import React, { useState } from 'react';
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Space,
  Row,
  Col,
  Typography,
  Divider,
} from 'antd';
import { LockOutlined, BellOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { apiService } from '@/services/apiService';
import { createZodFieldRule } from '@/components/common/ZodForm';
import { z } from 'zod';
import { useMessage } from '@/utils/message';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// Individual field schemas for validation
const currentPasswordSchema = z.string().min(1, 'Current password is required');
const newPasswordSchema = z.string().min(8, 'Password must be at least 8 characters');
const confirmPasswordSchema = z.string().min(1, 'Please confirm your password');

// Full form schema with explicit usage
const passwordSchema = z
  .object({
    currentPassword: currentPasswordSchema,
    newPassword: newPasswordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Use the schema for validation
type PasswordFormValues = z.infer<typeof passwordSchema>;

// Preferences type definition
type PreferencesValues = {
  emailNotifications: boolean;
  lessonReminders: boolean;
  marketingEmails: boolean;
};

/**
 * SettingsPage component for user settings management
 * Allows users to update password, notification preferences, and privacy settings
 * @returns {JSX.Element} The settings page component
 */
const SettingsPage: React.FC = () => {
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(false);
  const [passwordForm] = Form.useForm();
  const messageApi = useMessage();

  // Handle password change
  const handlePasswordChange = async (values: PasswordFormValues) => {
    // Validate using the schema before submitting
    try {
      passwordSchema.parse(values);
      setLoadingPassword(true);

      await apiService.post('/api/v1/auth/change-password', {
        accessToken: null, // Will be handled by apiService interceptor
        previousPassword: values.currentPassword,
        proposedPassword: values.newPassword,
      });

      messageApi.success('Password changed successfully');
      passwordForm.resetFields();
    } catch (error) {
      console.error('Failed to change password:', error);
      messageApi.error('Failed to change password. Please check your current password.');
    } finally {
      setLoadingPassword(false);
    }
  };

  // Handle notification preferences change
  const handlePreferencesChange = async (values: PreferencesValues) => {
    setLoadingPreferences(true);
    try {
      await apiService.put('/api/v1/users/me/preferences', values);
      messageApi.success('Preferences updated successfully');
    } catch (error) {
      console.error('Failed to update preferences:', error);
      messageApi.error('Failed to update preferences');
    } finally {
      setLoadingPreferences(false);
    }
  };

  return (
    <div className="p-6">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card className="shadow-md">
            <Title level={3}>Account Settings</Title>
            <Paragraph className="text-gray-500">
              Manage your account settings and preferences
            </Paragraph>

            <Tabs defaultActiveKey="security">
              <TabPane
                tab={
                  <span>
                    <LockOutlined /> Security
                  </span>
                }
                key="security"
              >
                <div className="max-w-xl">
                  <Title level={4}>Change Password</Title>
                  <Paragraph className="mb-4">
                    Update your password to keep your account secure
                  </Paragraph>

                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordChange}
                    requiredMark={false}
                  >
                    <Form.Item
                      name="currentPassword"
                      label="Current Password"
                      rules={[createZodFieldRule(currentPasswordSchema)]}
                    >
                      <Input.Password placeholder="Enter current password" />
                    </Form.Item>

                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[createZodFieldRule(newPasswordSchema)]}
                    >
                      <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Confirm New Password"
                      rules={[
                        createZodFieldRule(confirmPasswordSchema),
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("Passwords don't match"));
                          },
                        }),
                      ]}
                      dependencies={['newPassword']}
                    >
                      <Input.Password placeholder="Confirm new password" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" loading={loadingPassword}>
                        Change Password
                      </Button>
                    </Form.Item>
                  </Form>

                  <Divider />

                  <Title level={4}>Two-Factor Authentication</Title>
                  <Paragraph className="mb-4">
                    Add an extra layer of security to your account
                  </Paragraph>

                  <Switch disabled defaultChecked={false} />
                  <span className="ml-2">Enable two-factor authentication (Coming soon)</span>
                </div>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <BellOutlined /> Notifications
                  </span>
                }
                key="notifications"
              >
                <div className="max-w-xl">
                  <Title level={4}>Notification Preferences</Title>
                  <Paragraph className="mb-4">Control what notifications you receive</Paragraph>

                  <Form
                    layout="vertical"
                    onFinish={handlePreferencesChange}
                    initialValues={{
                      emailNotifications: true,
                      lessonReminders: true,
                      marketingEmails: false,
                    }}
                  >
                    <Form.Item name="emailNotifications" valuePropName="checked">
                      <Space>
                        <Switch defaultChecked />
                        <span>Email Notifications</span>
                      </Space>
                    </Form.Item>

                    <Form.Item name="lessonReminders" valuePropName="checked">
                      <Space>
                        <Switch defaultChecked />
                        <span>Lesson Reminders</span>
                      </Space>
                    </Form.Item>

                    <Form.Item name="marketingEmails" valuePropName="checked">
                      <Space>
                        <Switch />
                        <span>Marketing Emails</span>
                      </Space>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" loading={loadingPreferences}>
                        Save Preferences
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <EyeOutlined /> Privacy
                  </span>
                }
                key="privacy"
              >
                <div className="max-w-xl">
                  <Title level={4}>Privacy Settings</Title>
                  <Paragraph className="mb-4">Control your privacy settings</Paragraph>

                  <Form
                    layout="vertical"
                    initialValues={{
                      profileVisibility: true,
                      activityTracking: true,
                    }}
                  >
                    <Form.Item name="profileVisibility" valuePropName="checked">
                      <Space>
                        <Switch defaultChecked />
                        <span>Public Profile Visibility (Coming soon)</span>
                      </Space>
                    </Form.Item>

                    <Form.Item name="activityTracking" valuePropName="checked">
                      <Space>
                        <Switch defaultChecked />
                        <span>Activity Tracking</span>
                      </Space>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" disabled>
                        Save Privacy Settings
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <UserOutlined /> Account
                  </span>
                }
                key="account"
              >
                <div className="max-w-xl">
                  <Title level={4}>Account Management</Title>
                  <Paragraph className="mb-4">Manage your account</Paragraph>

                  <Button danger>Deactivate Account (Coming soon)</Button>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
