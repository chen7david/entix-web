import { Button, Form, Input, Typography, message } from "antd";
import { authService } from "../../services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ConfirmSignUpDto } from "../../services/api";
import { createSchemaFieldRule } from "antd-zod";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

export const SignupConfirmPage = () => {
  const rules = createSchemaFieldRule(ConfirmSignUpDto);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const prefilledUsername = queryParams.get("username") || "";
  const prefilledCode = queryParams.get("code") || "";

  const isUsernamePrefilled = !!prefilledUsername;
  const isCodePrefilled = !!prefilledCode;

  const { mutate: confirmSignUp, isPending } = useMutation({
    mutationFn: (params: ConfirmSignUpDto) => authService.confirmSignUp(params),
    onSuccess: () => {
      message.success("Account confirmed successfully");
      navigate("/auth/signin");
    },
  });

  return (
    <>
      <div className="text-center mb-6">
        <Title level={2}>Confirm Signup</Title>
        <Text type="secondary">
          Please confirm your account using the code you received.
        </Text>
      </div>

      <Form
        layout="vertical"
        onFinish={confirmSignUp}
        size="middle"
        autoComplete="off"
        initialValues={{
          username: prefilledUsername,
          confirmationCode: prefilledCode,
        }}
      >
        <Form.Item label="Username" name="username" rules={[rules]}>
          <Input
            allowClear={!isUsernamePrefilled}
            placeholder="Enter your username"
            disabled={isUsernamePrefilled}
          />
        </Form.Item>

        <Form.Item label="Code" name="confirmationCode" rules={[rules]}>
          <Input
            allowClear={!isCodePrefilled}
            placeholder="8-character confirmation code"
            disabled={isCodePrefilled}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
            disabled={isPending}
          >
            Confirm Account
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-between items-center text-sm mt-4">
        <Link
          to="/auth/resend-confirmation-code"
          className="text-blue-500 hover:underline"
        >
          Didn't get a code? Sign Up again
        </Link>
      </div>
    </>
  );
};
