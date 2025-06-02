import { Button, Form, Input, Typography, message } from "antd";
import { authService } from "../../services/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SignUpDto } from "../../services/api/auth.dto";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

export const SignUpPage = () => {
  const rules = createSchemaFieldRule(SignUpDto);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm();
  const [isCodeDisabled, setIsCodeDisabled] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      form.setFieldsValue({ code });
      setIsCodeDisabled(true);
    }
  }, [searchParams, form]);

  const handleSignUp = async (params: SignUpDto) => {
    await authService.signUp(params);

    message.success(
      `Sign up successful. A confirmation code has been sent to ${params.email}`
    );

    navigate(
      `/auth/signup-confirm?username=${encodeURIComponent(params.username)}`
    );
  };

  return (
    <>
      <div className="text-center mb-6">
        <Title level={2}>Sign Up</Title>
        <Text type="secondary">Welcome! Please sign up for an account.</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSignUp}
        size="middle"
        autoComplete="off"
      >
        <Form.Item label="Username" name="username" rules={[rules]}>
          <Input allowClear placeholder="Enter your username" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[rules]}>
          <Input allowClear type="email" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[rules]}>
          <Input.Password allowClear placeholder="Enter your password" />
        </Form.Item>

        <Form.Item label="Code" name="code" rules={[rules]}>
          <Input
            allowClear
            placeholder="8-character code"
            disabled={isCodeDisabled}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-between items-center text-sm mt-4">
        <Link to="/auth/signin" className="text-blue-500 hover:underline">
          Already have an account? Sign In
        </Link>
      </div>
    </>
  );
};
