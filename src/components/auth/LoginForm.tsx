import { Form, Input, Button, Alert } from "antd";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    await login(values.email, values.password);
  };

  return (
    <Form
      name="login"
      onFinish={onFinish}
      layout="vertical"
      className="max-w-md w-full"
    >
      {error && (
        <Form.Item>
          <Alert type="error" message={error} />
        </Form.Item>
      )}

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className="w-full"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
