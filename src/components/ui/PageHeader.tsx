import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

/**
 * Props for the PageHeader component.
 */
type PageHeaderProps = {
  title: string;
  description?: string | React.ReactNode;
  marginBottom?: string | number;
};

/**
 * A reusable component for displaying a page title and optional description.
 * @param {PageHeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered page header.
 */
const PageHeaderComponent: React.FC<PageHeaderProps> = ({
  title,
  description,
  marginBottom = '24px',
}) => {
  return (
    <div style={{ marginBottom }}>
      <Title level={2} style={{ marginBottom: description ? '8px' : 0 }}>
        {title}
      </Title>
      {description && <Paragraph>{description}</Paragraph>}
    </div>
  );
};

export default PageHeaderComponent;
