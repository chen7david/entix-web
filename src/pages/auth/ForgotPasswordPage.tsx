import { Button, Form, Input, Typography, message } from "antd";
import { authService } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordDto } from "../../services/api/auth.dto";
import { createSchemaFieldRule } from "antd-zod";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

export const ForgotPasswordPage = () => {
  const rules = createSchemaFieldRule(ForgotPasswordDto);
  const navigate = useNavigate();

  const { mutate: sendResetLink, isPending } = useMutation({
    mutationFn: async (params: ForgotPasswordDto) => {
      await authService.forgotPassword(params);
    },
    onSuccess: () => {
      message.success("Password reset link sent to your email");
      navigate("/auth/password-confirm");
    },
  });

  return (
    <>
      <div className="text-center mb-6">
        <Title level={2}>Forgot Password</Title>
        <Text type="secondary">
          Enter your username to receive a password reset link.
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={sendResetLink}
        size="middle"
        autoComplete="off"
      >
        <Form.Item label="Username" name="username" rules={[rules]}>
          <Input allowClear placeholder="Enter your username" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending}
          >
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-between items-center text-sm mt-4">
        <Link to="/auth/signin" className="text-blue-500 hover:underline">
          Back to Sign In
        </Link>
        <Link to="/auth/signup" className="text-blue-500 hover:underline">
          Don't have an account?
        </Link>
      </div>
    </>
  );
};
