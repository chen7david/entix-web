import React from 'react';
import { HashRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import AppRouter from './router'; // Import the new router

const { Header, Content, Footer } = Layout;

/**
 * Main application component with routing and layout.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  // Determine current path for defaultSelectedKeys in Menu
  // This is a simple way; for more complex scenarios, consider `useLocation` from react-router-dom
  const currentPath = window.location.hash.substring(1) || '/';

  return (
    <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <div
            className="logo"
            style={{ float: 'left', marginRight: '20px', color: 'white', fontWeight: 'bold' }}
          >
            My App
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[currentPath]}>
            <Menu.Item key="/">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 48px', marginTop: '24px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280, borderRadius: '8px' }}>
            <AppRouter />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          My App ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
    </HashRouter>
  );
};

export default App;
