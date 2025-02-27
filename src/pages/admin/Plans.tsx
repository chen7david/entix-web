import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

export const PlansPage: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Subscription Plans
      </Title>
      <Card>
        <div className="space-y-4">
          <p>
            This page will manage subscription plans and features, including:
          </p>
          <ul className="list-disc pl-6">
            <li>Plan tiers and pricing</li>
            <li>Feature availability</li>
            <li>Usage limits</li>
            <li>Billing cycles</li>
            <li>Plan comparisons</li>
            <li>Custom enterprise options</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PlansPage;
