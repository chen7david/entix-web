import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    path: "/admin/dashboard",
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    path: "/admin/users",
    key: "users",
    label: "Users",
    icon: <UserOutlined />,
  },
  {
    path: "/admin/roles",
    key: "roles",
    label: "Roles",
    icon: <SettingOutlined />,
  },
];
