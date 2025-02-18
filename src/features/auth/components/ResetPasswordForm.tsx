import { Form, Input, Button } from "antd";
import { LockOutlined, NumberOutlined } from "@ant-design/icons";

export interface ResetPasswordFormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  onSubmit: (values: ResetPasswordFormData) => Promise<void>;
  loading?: boolean;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="resetPassword"
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

      <Form.Item
        name="newPassword"
        rules={[
          { required: true, message: "Please input your new password!" },
          { min: 8, message: "Password must be at least 8 characters!" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="New Password"
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
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
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
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
