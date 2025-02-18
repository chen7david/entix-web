import { Card } from "antd";
import { Line } from "@ant-design/plots";

interface DataPoint {
  date: string;
  value: number;
  category: string;
}

interface AnalyticsChartProps {
  data: DataPoint[];
  loading?: boolean;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  loading = false,
}) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
    seriesField: "category",
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    xAxis: {
      type: "time",
    },
  };

  return (
    <Card loading={loading} className="h-full">
      <Line {...config} />
    </Card>
  );
};

export default AnalyticsChart;
