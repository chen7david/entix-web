import { Form, Switch, Select, Button, Divider, Space, Typography } from "antd";
import { BellOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";

const { Title } = Typography;

export interface SettingsFormData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  theme: "light" | "dark" | "system";
  twoFactorAuth: boolean;
}

interface SettingsFormProps {
  initialData: SettingsFormData;
  onSubmit: (values: SettingsFormData) => Promise<void>;
  loading?: boolean;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialData}
      onFinish={onSubmit}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5}>
            <BellOutlined /> Notifications
          </Title>
          <Form.Item
            name="emailNotifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="pushNotifications"
            label="Push Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>

        <Divider />

        <div>
          <Title level={5}>
            <GlobalOutlined /> Preferences
          </Title>
          <Form.Item name="language" label="Language">
            <Select>
              <Select.Option value="en">English</Select.Option>
              <Select.Option value="es">Español</Select.Option>
              <Select.Option value="fr">Français</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="theme" label="Theme">
            <Select>
              <Select.Option value="light">Light</Select.Option>
              <Select.Option value="dark">Dark</Select.Option>
              <Select.Option value="system">System</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Divider />

        <div>
          <Title level={5}>
            <LockOutlined /> Security
          </Title>
          <Form.Item
            name="twoFactorAuth"
            label="Two-Factor Authentication"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Save Settings
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default SettingsForm;
