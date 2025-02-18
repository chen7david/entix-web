import { Form, Input, Button } from "antd";
import { NumberOutlined } from "@ant-design/icons";

export interface VerifyEmailFormData {
  otp: string;
}

interface VerifyEmailFormProps {
  onSubmit: (values: VerifyEmailFormData) => Promise<void>;
  loading?: boolean;
}

export const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  return (
    <Form
      name="verifyEmail"
      onFinish={onSubmit}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="otp"
        rules={[
          { required: true, message: "Please input the OTP!" },
          { len: 6, message: "OTP must be exactly 6 digits!" },
          { pattern: /^\d+$/, message: "OTP must contain only numbers!" },
        ]}
      >
        <Input
          prefix={<NumberOutlined />}
          placeholder="Enter OTP"
          size="large"
          maxLength={6}
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
          Verify Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VerifyEmailForm;
