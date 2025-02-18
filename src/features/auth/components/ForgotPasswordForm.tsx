import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

export interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormData) => Promise<void>;
  loading?: boolean;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  return (
    <Form
      name="forgotPassword"
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full"
          size="large"
        >
          Send Reset Instructions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
