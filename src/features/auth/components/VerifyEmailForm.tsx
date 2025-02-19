import { Form, Input, Button, Space } from "antd";
import { MailOutlined, NumberOutlined } from "@ant-design/icons";

export interface VerifyEmailFormData {
  email: string;
  code: string;
}

interface VerifyEmailFormProps {
  onSubmit: (values: VerifyEmailFormData) => Promise<void>;
  onResendCode: (email: string) => Promise<void>;
  loading?: boolean;
}

export const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  onSubmit,
  onResendCode,
  loading = false,
}) => {
  const [form] = Form.useForm<VerifyEmailFormData>();

  const handleResendCode = async () => {
    try {
      const email = form.getFieldValue("email");
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
      name="verifyEmail"
      onFinish={onSubmit}
      layout="vertical"
      requiredMark={false}
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

      <Space direction="vertical" className="w-full">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
          size="large"
        >
          Verify Email
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

export default VerifyEmailForm;
