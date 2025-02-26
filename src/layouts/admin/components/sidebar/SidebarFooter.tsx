import cn from "classnames";
import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Space, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Text } = Typography;

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
            <div className="flex flex-col">
              <Text strong className="text-white">
                Admin User
              </Text>
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
