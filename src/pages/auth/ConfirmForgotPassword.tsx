import { Button, Form, Input, Typography, message } from "antd";
import { authService } from "../../services/api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ConfirmForgotPasswordDto } from "../../services/api";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

export const ConfirmForgotPassword = () => {
  const rules = createSchemaFieldRule(ConfirmForgotPasswordDto);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm();
  const [isUsernameDisabled, setIsUsernameDisabled] = useState(false);
  const [isCodeDisabled, setIsCodeDisabled] = useState(false);

  useEffect(() => {
    const username = searchParams.get("username");
    const code = searchParams.get("code");

    if (username) {
      form.setFieldsValue({ username });
      setIsUsernameDisabled(true);
    }

    if (code) {
      form.setFieldsValue({ confirmationCode: code });
      setIsCodeDisabled(true);
    }
  }, [searchParams, form]);

  const { mutate: confirmReset, isPending } = useMutation({
    mutationFn: async (params: ConfirmForgotPasswordDto) => {
      await authService.confirmForgotPassword(params);
    },
    onSuccess: () => {
      message.success("Password reset successful");
      navigate("/auth/signin");
    },
  });

  return (
    <>
      <div className="text-center mb-6">
        <Title level={2}>Reset Password</Title>
        <Text type="secondary">
          Set your new password using the code sent to your email.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={confirmReset}
        size="middle"
        autoComplete="off"
      >
        <Form.Item label="Username" name="username" rules={[rules]}>
          <Input
            allowClear
            placeholder="Enter your username"
            disabled={isUsernameDisabled}
          />
        </Form.Item>

        <Form.Item label="Code" name="confirmationCode" rules={[rules]}>
          <Input
            allowClear
            placeholder="Enter verification code"
            disabled={isCodeDisabled}
          />
        </Form.Item>

        <Form.Item label="Password" name="newPassword" rules={[rules]}>
          <Input.Password allowClear placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item
          label="Repeat Password"
          name="newPasswordRepeat"
          rules={[rules]}
        >
          <Input.Password allowClear placeholder="Enter your new password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending}
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-between items-center text-sm mt-4">
        <Link
          to="/auth/forgot-password"
          className="text-blue-500 hover:underline"
        >
          Request a new code
        </Link>
        <Link to="/auth/signup" className="text-blue-500 hover:underline">
          Don't have an account?
        </Link>
      </div>
    </>
  );
};
