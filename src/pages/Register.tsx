import { Button } from "antd";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <>
      <div>Register</div>
      <Link to="/profile">
        <Button type="primary">Profile</Button>
      </Link>
    </>
  );
};