import cn from "classnames";
import { Outlet } from "react-router-dom";

export const AdminLayout: React.FC = () => {
  return (
    <div className={cn("min-h-screen flex flex-col")}>
      <Outlet />
    </div>
  );
};
