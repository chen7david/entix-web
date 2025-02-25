import { Avatar, Dropdown, Space, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface SidebarUserInfoProps {
  isOpen: boolean;
  onLogout: () => void;
}

export const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({
  isOpen,
  onLogout,
}) => {
  const navigate = useNavigate();

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

  if (isOpen) {
    return (
      <div className="px-4 py-3">
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="topRight"
          trigger={["click"]}
        >
          <Avatar
            icon={<UserOutlined />}
            className="cursor-pointer bg-primary"
          />
        </Dropdown>
      </div>
    );
  }

  return (
    <div className="px-4 py-3">
      <Dropdown
        menu={{ items: userMenuItems }}
        placement="topRight"
        trigger={["click"]}
      >
        <Space className="cursor-pointer w-full justify-between">
          <Space>
            <Avatar icon={<UserOutlined />} className="bg-primary" />
            <div className="flex flex-col">
              <Text strong className="text-white">
                Admin User
              </Text>
              <Text className="text-sm">admin@example.com</Text>
            </div>
          </Space>
        </Space>
      </Dropdown>
    </div>
  );
};
