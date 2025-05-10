import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useAtom, useAtomValue } from 'jotai';
import {
  sidebarCollapsedAtom,
  mobileSidebarVisibleAtom,
  isMobileAtom,
} from '../store/sidebarAtoms';
import AppFooter from '../components/layout/AppFooter';
import PageContentWrapper from '../components/layout/PageContentWrapper';

const { Header, Sider, Content } = Layout;

// Helper to generate breadcrumb items from path
const generateBreadcrumbs = (pathname: string) => {
  const pathSnippets = pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSnippets.length - 1;
    const titleText = snippet.charAt(0).toUpperCase() + snippet.slice(1);
    return {
      key: url,
      title: isLast ? titleText : <Link to={url}>{titleText}</Link>,
    };
  });
  return [
    {
      key: '/admin',
      title: (
        <Link to="/admin">
          <HomeOutlined /> Admin
        </Link>
      ),
    },
    ...breadcrumbItems,
  ];
};

/**
 * Admin layout component.
 * Provides a collapsible sidebar, header, content area, and footer.
 * Sidebar becomes a drawer on mobile.
 * @returns {JSX.Element} The rendered AdminLayout component.
 */
const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom);
  const [drawerVisible, setDrawerVisible] = useAtom(mobileSidebarVisibleAtom);
  const isMobile = useAtomValue(isMobileAtom);
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const adminMenuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    { key: '/admin/users', icon: <UserOutlined />, label: <Link to="/admin/users">Users</Link> },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: <Link to="/admin/settings">Settings</Link>,
    },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
  ];

  const currentPath = location.pathname;
  const breadcrumbItems = generateBreadcrumbs(currentPath.replace('/admin', ''));

  const siderContent = (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[currentPath]}
      selectedKeys={[currentPath]}
      items={adminMenuItems}
      onClick={isMobile ? toggleDrawer : undefined}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          title="Admin Menu"
          placement="left"
          onClose={toggleDrawer}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
          width={250}
        >
          {siderContent}
        </Drawer>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="md"
          collapsedWidth={80}
          theme="dark"
          style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1000, overflow: 'auto' }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 6,
              textAlign: 'center',
              lineHeight: '32px',
              color: 'white',
            }}
          >
            {collapsed ? 'APP' : 'My Admin App'}
          </div>
          {siderContent}
        </Sider>
      )}
      <Layout
        style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}
      >
        <Header
          style={{
            padding: '0 16px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          {isMobile ? (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
          ) : (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapse}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
          )}
          <Breadcrumb items={breadcrumbItems} style={{ marginLeft: '16px' }} />
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <PageContentWrapper>
            <Outlet />
          </PageContentWrapper>
        </Content>
        <AppFooter appName="Admin Panel" />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
