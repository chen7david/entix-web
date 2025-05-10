import React from 'react';
import {
  Typography,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Card,
  Col,
  Row,
  Divider,
  notification,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import PageHeaderComponent from '../../components/ui/PageHeader';

const { Title, Paragraph } = Typography;
const { Option } = Select;

/**
 * Type for settings form values.
 */
type SettingsFormValues = {
  siteName?: string;
  siteUrl?: string;
  adminEmail?: string;
  maintenanceMode?: boolean;
  defaultTheme?: 'light' | 'dark';
  itemsPerPage?: number;
  sendEmailNotifications?: boolean;
};

/**
 * Admin Settings Page.
 * Allows configuration of various application settings.
 * @returns {JSX.Element} The rendered AdminSettingsPage component.
 */
const AdminSettingsPage: React.FC = () => {
  const [form] = Form.useForm();

  const initialValues: SettingsFormValues = {
    siteName: 'My Awesome App',
    siteUrl: 'https://example.com',
    adminEmail: 'admin@example.com',
    maintenanceMode: false,
    defaultTheme: 'light',
    itemsPerPage: 10,
    sendEmailNotifications: true,
  };

  /**
   * Handles form submission.
   * @param {SettingsFormValues} values - The form values.
   */
  const onFinish = (values: SettingsFormValues) => {
    console.log('Settings saved:', values);
    // Here you would typically save the settings to a backend
    notification.success({
      message: 'Settings Saved',
      description: 'Your application settings have been successfully updated.',
      placement: 'topRight',
    });
  };

  return (
    <div>
      <PageHeaderComponent
        title="Application Settings"
        description="Configure general settings for the application. Changes made here will affect the entire system."
      />
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}>
        <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
          <Title level={4}>General Settings</Title>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="siteName"
                label="Site Name"
                rules={[{ required: true, message: 'Please input the site name!' }]}
              >
                <Input placeholder="e.g., My Application" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="siteUrl"
                label="Site URL"
                rules={[{ required: true, type: 'url', message: 'Please input a valid URL!' }]}
              >
                <Input placeholder="e.g., https://myapp.com" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="adminEmail"
            label="Administrator Email"
            rules={[
              { required: true, type: 'email', message: 'Please input a valid email address!' },
            ]}
          >
            <Input placeholder="e.g., admin@myapp.com" />
          </Form.Item>

          <Divider />

          <Title level={4}>Appearance & Behavior</Title>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="defaultTheme"
                label="Default Theme"
                rules={[{ required: true, message: 'Please select a default theme!' }]}
              >
                <Select placeholder="Select a theme">
                  <Option value="light">Light</Option>
                  <Option value="dark">Dark (Coming Soon!)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="itemsPerPage"
                label="Items Per Page (Pagination)"
                rules={[
                  {
                    required: true,
                    type: 'number',
                    min: 5,
                    max: 50,
                    message: 'Must be between 5 and 50',
                  },
                ]}
              >
                <Input type="number" placeholder="e.g., 10" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Title level={4}>System</Title>

          <Form.Item name="maintenanceMode" label="Maintenance Mode" valuePropName="checked">
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Form.Item>
          <Paragraph type="secondary">
            When enabled, users will see a maintenance page. Only administrators will be able to
            access the admin panel.
          </Paragraph>

          <Form.Item
            name="sendEmailNotifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch checkedChildren="ENABLED" unCheckedChildren="DISABLED" />
          </Form.Item>
          <Paragraph type="secondary">
            Toggle sending of system-wide email notifications (e.g., new user registration, password
            resets).
          </Paragraph>

          <Divider />

          <Form.Item style={{ marginTop: '24px' }}>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminSettingsPage;
