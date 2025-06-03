import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        <Outlet />
      </div>
    </div>
  );
};
