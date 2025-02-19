import { Form, Input, Button, Space } from "antd";
import { LockOutlined, MailOutlined, NumberOutlined } from "@ant-design/icons";

export interface ResetPasswordFormData {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormData) => Promise<void>;
  onResendCode: (email: string) => Promise<void>;
  loading?: boolean;
  defaultEmail?: string;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  onResendCode,
  loading = false,
  defaultEmail = "",
}) => {
  const [form] = Form.useForm<ResetPasswordFormData>();

  const handleResendCode = async () => {
    try {
      const email = form.getFieldValue("email") || defaultEmail;
      if (!email) {
        form.validateFields(["email"]);
        return;
      }
      await onResendCode(email);
    } catch (error) {
      // Form validation error, already handled by form
    }
  };

  return (
    <Form
      form={form}
      name="resetPassword"
      onFinish={onSubmit}
      layout="vertical"
      requiredMark={false}
      initialValues={{ email: defaultEmail }}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          type="email"
          size="large"
          disabled={!!defaultEmail}
        />
      </Form.Item>

      <Form.Item
        name="code"
        rules={[
          { required: true, message: "Please input the verification code!" },
          { len: 6, message: "Code must be exactly 6 digits!" },
          { pattern: /^\d+$/, message: "Code must contain only numbers!" },
        ]}
      >
        <Input
          prefix={<NumberOutlined />}
          placeholder="Enter verification code"
          size="large"
          maxLength={6}
        />
      </Form.Item>

      <Form.Item
        name="newPassword"
        rules={[
          { required: true, message: "Please input your new password!" },
          { min: 8, message: "Password must be at least 8 characters!" },
          {
            pattern: /[A-Z]/,
            message: "Password must contain at least one uppercase letter!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="New password"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm password"
          size="large"
        />
      </Form.Item>

      <Space direction="vertical" className="w-full">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
          size="large"
        >
          Reset Password
        </Button>
        <Button 
          type="link" 
          onClick={handleResendCode}
          disabled={loading}
          className="w-full"
        >
          Resend verification code
        </Button>
      </Space>
    </Form>
  );
};

export default ResetPasswordForm;
