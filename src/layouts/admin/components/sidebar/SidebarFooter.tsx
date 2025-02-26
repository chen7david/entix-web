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

type SidebarFooterProps = HTMLAttributes<HTMLDivElement> & {};

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();

  const onLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
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
      <div className="px-4 py-3">
        <Space className="cursor-pointer w-full justify-between items-center">
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="bg-primary"
            />
            <div className="flex flex-row justify-center gap-2">
              <span className="text-gray-500 text-sm">Admin User</span>
              <Badge status="success" />
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
