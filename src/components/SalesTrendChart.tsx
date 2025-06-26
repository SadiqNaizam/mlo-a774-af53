import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

// Mock data for different time ranges
const MOCK_DATA = {
  '7d': [
    { date: '第 1 天', sales: 2450 },
    { date: '第 2 天', sales: 2800 },
    { date: '第 3 天', sales: 2290 },
    { date: '第 4 天', sales: 3100 },
    { date: '第 5 天', sales: 2780 },
    { date: '第 6 天', sales: 3500 },
    { date: '第 7 天', sales: 3890 },
  ],
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: `第 ${i + 1} 天`,
    sales: 2000 + Math.sin(i / 3) * 500 + Math.random() * 600,
  })),
  '90d': Array.from({ length: 90 }, (_, i) => ({
    date: `第 ${i + 1} 天`,
    sales: 2500 + Math.sin(i / 10) * 800 + Math.random() * 800,
  })),
};

const chartConfig = {
  sales: {
    label: "销售额",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const SalesTrendChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  console.log('SalesTrendChart loaded');

  const chartData = useMemo(() => MOCK_DATA[timeRange], [timeRange]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>销售趋势</CardTitle>
          <CardDescription>
            选定时期内的近期销售业绩。
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value: '7d' | '30d' | '90d') => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择一个范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">最近7天</SelectItem>
            <SelectItem value="30d">最近30天</SelectItem>
            <SelectItem value="90d">最近90天</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // Only show a few ticks for longer ranges to avoid clutter
              interval={timeRange === '7d' ? 0 : Math.floor(chartData.length / 7)}
              tickFormatter={(value) => (timeRange === '7d' ? value : value.substring(0, 6))}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toFixed(2)}`}
                />
              }
            />
            <Line
              dataKey="sales"
              type="monotone"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesTrendChart;