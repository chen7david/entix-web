import { useState } from "react";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { useAtom } from "jotai";

import {
  UserOutlined,
  ScheduleOutlined,
  LockOutlined,
  AreaChartOutlined,
  TeamOutlined,
  ShopOutlined,
  FundProjectionScreenOutlined,
  TagOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { sidebarOpenAtom } from "../../stores/sidebar.store";
import { AdminRoutes } from "@/constants/routes.constant";

type MenuItem = Required<MenuProps>["items"][number];

const adminSidebarMenuItems: MenuItem[] = [
  {
    // label: "Admin",
    key: "/admin",
    type: "group",
    children: [
      {
        label: "Dashboard",
        key: AdminRoutes.DASHBOARD,
        icon: <DashboardOutlined />,
      },
      {
        label: "Users",
        key: AdminRoutes.USERS,
        icon: <UserOutlined />,
      },
      {
        label: "Reports",
        key: AdminRoutes.REPORTS,
        icon: <AreaChartOutlined />,
      },
      {
        label: "Sessions",
        key: AdminRoutes.SESSIONS,
        icon: <FundProjectionScreenOutlined />,
      },
      {
        label: "Roles",
        key: AdminRoutes.ROLES,
        icon: <LockOutlined />,
      },
      {
        label: "Plans",
        key: AdminRoutes.PLANS,
        icon: <TagOutlined />,
      },
      {
        label: "Store",
        key: "/store",
        icon: <ShopOutlined />,
        children: [
          {
            label: "Products",
            key: "/store/products",
            icon: <ShopOutlined />,
          },
          {
            label: "Categories",
            key: "/store/categories",
            icon: <ShopOutlined />,
          },
        ],
      },
    ],
  },
  {
    label: "Calendar",
    key: "/calendar",
    icon: <ScheduleOutlined />,
  },
];

export const SidebarMenu = () => {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpenAtom] = useAtom(sidebarOpenAtom);

  const menuOnClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
    setIsSideBarOpenAtom(!isSideBarOpen);
  };

  return (
    <Menu
      onClick={menuOnClick}
      selectedKeys={[current]}
      mode="inline"
      items={adminSidebarMenuItems}
      style={{ borderRight: "none", backgroundColor: "#E5E7EB" }}
    />
  );
};
