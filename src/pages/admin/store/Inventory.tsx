import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

export const InventoryPage: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Inventory Management
      </Title>
      <Card>
        <div className="space-y-4">
          <p>This page will handle inventory management, including:</p>
          <ul className="list-disc pl-6">
            <li>Stock levels</li>
            <li>Inventory tracking</li>
            <li>Low stock alerts</li>
            <li>Warehouse management</li>
            <li>Stock transfers</li>
            <li>Inventory reports</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default InventoryPage;
