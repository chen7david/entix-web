import { Card, Statistic } from "antd";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
  loading?: boolean;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  loading = false,
  color,
}) => {
  return (
    <Card loading={loading} className="h-full">
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ color }}
      />
    </Card>
  );
};

export default StatCard;
