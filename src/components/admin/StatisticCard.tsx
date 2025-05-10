import React from 'react';
import { Card, Statistic, Col } from 'antd';
import type { CardProps } from 'antd/es/card'; // Type-only import
import type { StatisticProps } from 'antd/es/statistic/Statistic'; // Type-only import

/**
 * Props for the StatisticCard component.
 */
export type StatisticCardProps = {
  title: React.ReactNode;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
  cardProps?: CardProps; // Allow passing through other card props if needed
  statisticProps?: Omit<
    StatisticProps,
    'title' | 'value' | 'prefix' | 'suffix' | 'precision' | 'valueStyle'
  >; // Allow other statistic props
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
};

/**
 * A reusable card component for displaying a single statistic.
 * @param {StatisticCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered statistic card.
 */
const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision,
  valueStyle,
  cardProps,
  statisticProps,
  xs = 24,
  sm = 12,
  md = 8,
  lg = 6,
}) => {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg}>
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }} {...cardProps}>
        <Statistic
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
          precision={precision}
          valueStyle={valueStyle}
          {...statisticProps}
        />
      </Card>
    </Col>
  );
};

export default StatisticCard;
