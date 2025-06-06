// pages/auth/SignInPage.tsx
import { Button, Form, Input, Typography, message } from "antd";
import { authService } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { SignInDto } from "../../services/api";
import { createSchemaFieldRule } from "antd-zod";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/auth.hooks";

const { Title, Text } = Typography;

export const SignInPage = () => {
  const rules = createSchemaFieldRule(SignInDto);
  const navigate = useNavigate();
  const { setTokens } = useAuth();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async (params: SignInDto) => {
      const response = await authService.signIn(params);
      setTokens(response);
      return response;
    },
    onSuccess: () => {
      message.success("Sign in successful");
      navigate("/profile");
    },
  });

  return (
    <>
      <div className="text-center mb-6">
        <Title level={2}>Sign In</Title>
        <Text type="secondary">
          Welcome back! Please sign in to your account.
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={signIn}
        size="middle"
        autoComplete="off"
      >
        <Form.Item label="Username" name="username" rules={[rules]}>
          <Input allowClear placeholder="Enter your username" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[rules]}>
          <Input.Password allowClear placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-between items-center text-sm mt-4">
        <Link
          to="/auth/forgot-password"
          className="text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>
        <Link to="/auth/signup" className="text-blue-500 hover:underline">
          Don't have an account?
        </Link>
      </div>
    </>
  );
};
