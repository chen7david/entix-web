import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

export const ProductsPage: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Products
      </Title>
      <Card>
        <div className="space-y-4">
          <p>This page will manage product listings, including:</p>
          <ul className="list-disc pl-6">
            <li>Product catalog management</li>
            <li>Product details and pricing</li>
            <li>Product images and media</li>
            <li>Product variants</li>
            <li>SKU management</li>
            <li>Product categories and tags</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ProductsPage;
