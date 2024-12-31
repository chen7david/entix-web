import { Button } from "antd";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div>Home</div>
      <Link to="/profile">
        <Button type="primary">Profile</Button>
      </Link>
    </>
  );
};
