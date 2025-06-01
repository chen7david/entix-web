import { Button, Form, Input, message } from "antd";
import { authService } from "../../services/api";
import { Link } from "react-router-dom";
import { SignInDto } from "../../services/api/auth.dto";
import { createSchemaFieldRule } from "antd-zod";

export const SignInPage = () => {
  const rules = createSchemaFieldRule(SignInDto);

  const handleSignIn = async (params: SignInDto) => {
    console.log(params);
    const response = await authService.signIn(params);
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
    message.success("Sign in successful");
    console.log(response);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Sign In</h1>

      <Form onFinish={handleSignIn}>
        <Form.Item name="username" rules={[rules]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[rules]}>
          <Input placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form>

      <Link to="/auth/home">Home</Link>
    </div>
  );
};
