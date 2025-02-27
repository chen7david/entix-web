import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

export const RolesPage: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Role Management
      </Title>
      <Card>
        <div className="space-y-4">
          <p>
            This page will handle role-based access control (RBAC), including:
          </p>
          <ul className="list-disc pl-6">
            <li>Role creation and management</li>
            <li>Permission assignment</li>
            <li>Role hierarchies</li>
            <li>User role assignments</li>
            <li>Access control policies</li>
            <li>Role-based restrictions</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default RolesPage;
