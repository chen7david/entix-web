import { Button, Form, Input, Typography, message } from "antd";
import { authService } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { ResendConfirmationCodeDto } from "../../services/api";
import { createSchemaFieldRule } from "antd-zod";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

export const ResendConfirmationCode = () => {
  const rules = createSchemaFieldRule(ResendConfirmationCodeDto); // Replace with appropriate DTO if needed
  const navigate = useNavigate();

  const { mutate: resendCode, isPending } = useMutation({
    mutationFn: async (params: ResendConfirmationCodeDto) => {
      await authService.resendConfirmationCode(params); // Replace with your actual API call
    },
    onSuccess: () => {
      message.success("Confirmation code has been resent to your email");
      navigate(`/auth/signup-confirm`);
    },
  });

  return (
    <>
      <div className="text-center mb-6">
        <Title level={2}>Resend Confirmation Code</Title>
        <Text type="secondary">
          Enter your username to receive a new confirmation code.
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={resendCode}
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
            Resend Code
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
