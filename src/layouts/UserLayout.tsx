import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Button, Drawer, Typography } from 'antd';
import { MenuOutlined, HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAtom, useAtomValue } from 'jotai';
import { mobileSidebarVisibleAtom, isMobileAtom } from '../store/sidebarAtoms';
import AppFooter from '../components/layout/AppFooter';
import PageContentWrapper from '../components/layout/PageContentWrapper';

const { Header, Content } = Layout;
// const { useBreakpoint } = Grid; // Removed
const { Title } = Typography;

/**
 * User layout component.
 * Provides a header with navigation, content area, and footer.
 * On mobile, navigation is within a drawer.
 * @returns {JSX.Element} The rendered UserLayout component.
 */
const UserLayout: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useAtom(mobileSidebarVisibleAtom);
  const isMobile = useAtomValue(isMobileAtom);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    { key: '/auth/signin', icon: <LoginOutlined />, label: <Link to="/auth/signin">Sign In</Link> },
    {
      key: '/auth/signup',
      icon: <UserAddOutlined />,
      label: <Link to="/auth/signup">Sign Up</Link>,
    },
    // Add other user-specific menu items here
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        {isMobile ? (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        ) : null}
        <Link to="/">
          <Title level={3} style={{ margin: 0, color: '#00b96b' }}>
            Entix
          </Title>
        </Link>
        {!isMobile && (
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[window.location.pathname]}
            items={menuItems}
            style={{
              lineHeight: '62px',
              borderBottom: 'none',
              flex: 1,
              justifyContent: 'flex-end',
            }}
            onClick={() => setDrawerVisible(false)}
          />
        )}
      </Header>
      <Content
        style={{
          padding: isMobile ? '16px' : '24px 48px',
          marginTop: 16,
          backgroundColor: '#f5f5f5',
        }}
      >
        <PageContentWrapper>
          <Outlet />
        </PageContentWrapper>
      </Content>
      <Drawer
        title="Menu"
        placement="left"
        onClose={toggleDrawer}
        open={drawerVisible && isMobile}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={menuItems}
          onClick={toggleDrawer}
        />
      </Drawer>
      <AppFooter layoutType="Entix Platform" />
    </Layout>
  );
};

export default UserLayout;
