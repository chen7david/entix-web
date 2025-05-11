import React from 'react';
import { Result, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

/**
 * UnauthorizedPage component for 403 errors
 * Uses Ant Design's Result component to display a user-friendly error page
 * @returns {JSX.Element} The 403 unauthorized page component
 */
const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={[
        <Button type="primary" key="home">
          <Link to="/">Back Home</Link>
        </Button>,
        <Button key="back" onClick={() => navigate(-1)}>
          Go Back
        </Button>,
      ]}
    />
  );
};

export default UnauthorizedPage;
