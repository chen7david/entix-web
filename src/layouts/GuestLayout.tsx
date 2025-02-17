import { Outlet } from "react-router-dom";

export const GuestLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
