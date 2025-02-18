import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

export interface EmailVerificationFormData {
  email: string;
}

interface RequestEmailVerificationFormProps {
  onSubmit: (values: EmailVerificationFormData) => Promise<void>;
  loading?: boolean;
}

export const RequestEmailVerificationForm: React.FC<
  RequestEmailVerificationFormProps
> = ({ onSubmit, loading = false }) => {
  return (
    <Form
      name="requestEmailVerification"
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
          Send Verification OTP
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestEmailVerificationForm;
