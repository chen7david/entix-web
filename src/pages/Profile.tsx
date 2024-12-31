import { Button } from "antd";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  return (
    <>
      <div>Profile</div>
      <Link to="/profile">
        <Button type="primary">Profile</Button>
      </Link>
    </>
  );
};
