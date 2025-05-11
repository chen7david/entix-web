import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Card, Space, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * Home page component that serves as the landing page for the application.
 * Follows the Ant Design system used throughout the app.
 * @returns {JSX.Element} The rendered Home page.
 */
const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-2xl mt-8 shadow-md">
        <Row gutter={[16, 24]} className="text-center">
          <Col span={24}>
            <Title level={2}>Welcome to Entix Platform</Title>
            <Paragraph className="mb-6">
              Your complete solution for efficient account management
            </Paragraph>
          </Col>

          <Col span={24}>
            <Space size="large">
              <Button type="primary" size="large">
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button size="large">
                <Link to="/auth/signup">Create Account</Link>
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default HomePage;
