import { Button, message } from "antd";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button type="primary" onClick={() => message.success("Hello World")}>
        Click me
      </Button>
      <Link to="/signin">Sign In</Link>
    </div>
  );
};
