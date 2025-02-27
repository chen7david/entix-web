import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

export const CategoriesPage: React.FC = () => {
  return (
    <div className="p-6">
      <Title level={2} className="mb-6">
        Categories
      </Title>
      <Card>
        <div className="space-y-4">
          <p>This page will manage product categories, including:</p>
          <ul className="list-disc pl-6">
            <li>Category hierarchy</li>
            <li>Category attributes</li>
            <li>Category descriptions</li>
            <li>Category images</li>
            <li>Category relationships</li>
            <li>Category sorting and ordering</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default CategoriesPage;
