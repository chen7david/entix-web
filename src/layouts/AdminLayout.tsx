import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const menuItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "Users" },
  { key: "settings", label: "Settings" },
];

export const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const SidebarContent = (
    <Menu
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={menuItems}
      className="h-full border-r-0"
    />
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col">
        {SidebarContent}
      </aside>

      {/* Mobile drawer sidebar */}
      <Drawer
        title="Menu"
        placement="left"
        closable
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        className="md:hidden"
        bodyStyle={{ padding: 0 }}
      >
        {SidebarContent}
      </Drawer>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen">
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
