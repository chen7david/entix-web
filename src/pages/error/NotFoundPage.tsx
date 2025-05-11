import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage component for 404 errors
 * Uses Ant Design's Result component to display a user-friendly error page
 * @returns {JSX.Element} The 404 page component
 */
const NotFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
