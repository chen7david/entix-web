import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { useAtom } from "jotai";

import {
  UserOutlined,
  ScheduleOutlined,
  LockOutlined,
  AreaChartOutlined,
  ShopOutlined,
  FundProjectionScreenOutlined,
  TagOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  InboxOutlined,
  BarcodeOutlined,
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
            key: AdminRoutes.STORE_PRODUCTS,
            icon: <BarcodeOutlined />,
          },
          {
            label: "Categories",
            key: AdminRoutes.STORE_CATEGORIES,
            icon: <AppstoreOutlined />,
          },
          {
            label: "Inventory",
            key: AdminRoutes.STORE_INVENTORY,
            icon: <InboxOutlined />,
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
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpenAtom] = useAtom(sidebarOpenAtom);

  const menuOnClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    setIsSideBarOpenAtom(!isSideBarOpen);
  };

  return (
    <Menu
      onClick={menuOnClick}
      selectedKeys={[location.pathname]}
      mode="inline"
      items={adminSidebarMenuItems}
      style={{ borderRight: "none", backgroundColor: "#E5E7EB" }}
    />
  );
};
