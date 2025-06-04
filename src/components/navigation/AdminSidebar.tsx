import { Menu, Drawer, Button } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { menuItems } from "../../config/admin-menu.config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks";

interface AdminSidebarProps {
  drawerOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar = ({ drawerOpen, onClose }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    onClose(); // Close drawer on mobile
  };

  const SidebarContent = (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 shrink-0">
        <UserOutlined className="text-xl" />
        <div>
          <div className="text-base font-semibold">Jane Admin</div>
          <div className="text-xs text-gray-500">Administrator</div>
        </div>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={handleMenuClick}
          items={menuItems}
          className="border-r-0"
          style={{ minHeight: 0 }}
        />
      </div>

      {/* Footer Controls */}
      <div className="px-4 py-3 space-y-2 shrink-0">
        <Button
          block
          icon={<SettingOutlined />}
          className="flex items-center justify-start"
          onClick={() => navigate("/admin/settings")}
        >
          Settings
        </Button>
        <Button
          block
          danger
          icon={<LogoutOutlined />}
          className="flex items-center justify-start"
          onClick={() => {
            // Ideally call logout logic here
            signOut();
            navigate("/auth/signin");
          }}
        >
          Logout
        </Button>
        <div className="text-xs text-gray-400 pt-2 text-center">
          © 2025 MyApp
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-md flex-col h-screen sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        closable
        onClose={onClose}
        open={drawerOpen}
        className="md:hidden"
        styles={{ body: { padding: 0 } }}
        height="100vh"
      >
        <div className="h-screen">{SidebarContent}</div>
      </Drawer>
    </>
  );
};
