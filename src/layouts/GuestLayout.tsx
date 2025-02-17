import { Outlet } from "react-router-dom";

export const GuestLayout: React.FC = () => {
  return (
    <div>
      <h1>Guest Layout</h1>
      <h1>
        <Outlet />
      </h1>
    </div>
  );
};
