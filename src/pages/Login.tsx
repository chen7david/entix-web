import { Button } from "antd";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <>
      <div>Login</div>
      <Link to="/profile">
        <Button type="primary">Profile</Button>
      </Link>
    </>
  );
};
