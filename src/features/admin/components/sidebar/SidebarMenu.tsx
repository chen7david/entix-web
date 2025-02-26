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
} from "@ant-design/icons";
import { sidebarOpenAtom } from "@/layouts/admin/stores/sidebar.store";

type MenuItem = Required<MenuProps>["items"][number];

const adminSidebarMenuItems: MenuItem[] = [
  {
    // label: "Admin",
    key: "/admin",
    type: "group",
    children: [
      {
        label: "Reports",
        key: "/reports",
        icon: <AreaChartOutlined />,
      },
      {
        label: "Users",
        key: "/users",
        icon: <UserOutlined />,
      },
      {
        label: "Groups",
        key: "/groups",
        icon: <TeamOutlined />,
      },
      {
        label: "Sessions",
        key: "/sessions",
        icon: <FundProjectionScreenOutlined />,
      },
      {
        label: "Roles",
        key: "/roles",
        icon: <LockOutlined />,
      },
      {
        label: "Plans",
        key: "/paymentplans",
        icon: <TagOutlined />,
      },

      // copies start
      // {
      //   label: "Reports",
      //   key: "/reports",
      //   icon: <AreaChartOutlined />,
      // },
      // {
      //   label: "Users",
      //   key: "/users",
      //   icon: <UserOutlined />,
      // },
      // {
      //   label: "Groups",
      //   key: "/groups",
      //   icon: <TeamOutlined />,
      // },
      // {
      //   label: "Sessions",
      //   key: "/sessions",
      //   icon: <FundProjectionScreenOutlined />,
      // },
      // {
      //   label: "Roles",
      //   key: "/roles",
      //   icon: <LockOutlined />,
      // },
      // {
      //   label: "Plans",
      //   key: "/paymentplans",
      //   icon: <TagOutlined />,
      // },
      // {
      //   label: "Reports",
      //   key: "/reports",
      //   icon: <AreaChartOutlined />,
      // },
      // {
      //   label: "Users",
      //   key: "/users",
      //   icon: <UserOutlined />,
      // },
      // {
      //   label: "Groups",
      //   key: "/groups",
      //   icon: <TeamOutlined />,
      // },
      // {
      //   label: "Sessions",
      //   key: "/sessions",
      //   icon: <FundProjectionScreenOutlined />,
      // },
      // {
      //   label: "Roles",
      //   key: "/roles",
      //   icon: <LockOutlined />,
      // },
      // {
      //   label: "Plans",
      //   key: "/paymentplans",
      //   icon: <TagOutlined />,
      // },
      // copies end
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
      style={{ borderRight: "none", backgroundColor: "#f5f5f5" }}
    />
  );
};
