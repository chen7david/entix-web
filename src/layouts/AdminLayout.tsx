import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { AdminSidebar } from "../components/navigation/AdminSidebar";

export const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AdminSidebar
        drawerOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
          <div className="text-lg font-semibold hidden md:block">
            Admin Panel
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <div className="p-6 bg-white rounded-2xl shadow-xl max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
