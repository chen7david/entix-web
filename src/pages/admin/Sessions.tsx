import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

export const SessionsPage: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Active Sessions
      </Title>
      <Card>
        <div className="space-y-4">
          <p>
            This page will display all active user sessions, including:
          </p>
          <ul className="list-disc pl-6">
            <li>Current active sessions</li>
            <li>Session duration</li>
            <li>Last activity</li>
            <li>Device information</li>
            <li>IP addresses</li>
            <li>Login timestamps</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default SessionsPage;
