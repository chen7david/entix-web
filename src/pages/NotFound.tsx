import { Button } from "antd";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <div>NotFound</div>
      <Link to="/profile">
        <Button type="primary">Profile</Button>
      </Link>
    </>
  );
};
