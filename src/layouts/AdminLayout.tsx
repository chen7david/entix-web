import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = () => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <h1>
        <Outlet />
      </h1>
    </div>
  );
};
