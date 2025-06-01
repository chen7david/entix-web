import { Button, message } from "antd";
import { Link } from "react-router-dom";

export const SignInPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Sign In</h1>
      <Button type="primary" onClick={() => message.success("Hello World")}>
        Click me
      </Button>
      <Link to="/">Home</Link>
    </div>
  );
};
