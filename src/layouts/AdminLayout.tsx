import { Outlet } from "react-router-dom";
import { authService } from "../services/auth.service";

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <button
              onClick={() => authService.logout()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
