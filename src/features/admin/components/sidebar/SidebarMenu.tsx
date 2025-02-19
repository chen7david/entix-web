import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
  FileOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    children: [
      {
        key: '/admin/dashboard',
        label: 'Overview',
      },
      {
        key: '/admin/dashboard/analytics',
        label: 'Analytics',
        icon: <BarChartOutlined />,
      },
    ],
  },
  {
    type: 'divider',
    style: { background: 'rgba(255,255,255,0.2)', margin: '8px 0' },
  },
  {
    key: 'users',
    icon: <TeamOutlined />,
    label: 'Users',
    children: [
      {
        key: '/admin/users',
        label: 'All Users',
      },
      {
        key: '/admin/users/roles',
        label: 'Roles',
      },
    ],
  },
  {
    key: 'products',
    icon: <ShopOutlined />,
    label: 'Products',
    children: [
      {
        key: '/admin/products',
        label: 'All Products',
      },
      {
        key: '/admin/products/categories',
        label: 'Categories',
      },
    ],
  },
  {
    key: 'reports',
    icon: <FileOutlined />,
    label: 'Reports',
    children: [
      {
        key: '/admin/reports/sales',
        label: 'Sales Report',
      },
      {
        key: '/admin/reports/inventory',
        label: 'Inventory',
      },
    ],
  },
  {
    type: 'divider',
    style: { background: 'rgba(255,255,255,0.2)', margin: '8px 0' },
  },
  {
    key: 'account',
    icon: <UserOutlined />,
    label: 'Account',
    children: [
      {
        key: '/admin/profile',
        label: 'Profile',
      },
      {
        key: '/admin/settings',
        icon: <SettingOutlined />,
        label: 'Settings',
      },
    ],
  },
];

interface SidebarMenuProps {
  collapsed: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find the open keys based on current path
  const findOpenKeys = (path: string): string[] => {
    const keys: string[] = [];
    menuItems?.forEach((item) => {
      if ('children' in item && item.children) {
        item.children.forEach((child) => {
          if (child.key === path) {
            keys.push(item.key as string);
          }
        });
      }
    });
    return keys;
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      defaultOpenKeys={collapsed ? [] : findOpenKeys(location.pathname)}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
      className="border-none"
    />
  );
};
