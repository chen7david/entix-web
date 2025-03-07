import cn from "classnames";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import { Fake } from "@/constants/fakes.constant";

type SidebarFooterProps = HTMLAttributes<HTMLDivElement> & {};

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate("/admin/profile"),
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      onClick: () => navigate("/admin/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: onLogout,
    },
  ];

  return (
    <div className={cn(className)} {...props}>
      <div className="px-4 align-middle ">
        <Space className="w-full justify-between items-center ">
          <Space>
            <Badge status="success" />
            <Avatar
              size={45}
              icon={<UserOutlined />}
              src={Fake.avatar}
              style={{ borderColor: "#6B7280", borderWidth: 1 }}
            />
            <div className="flex flex-row justify-center gap-2">
              <span className="text-gray-500 text-sm">David</span>
            </div>
          </Space>
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="topRight"
            trigger={["click"]}
            dropdownRender={(menu) => (
              <div style={{ minWidth: "200px" }}>{menu}</div>
            )}
          >
            <MoreOutlined className="text-white text-xl" />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};
