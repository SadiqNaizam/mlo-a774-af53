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
    { date: 'Day 1', sales: 2450 },
    { date: 'Day 2', sales: 2800 },
    { date: 'Day 3', sales: 2290 },
    { date: 'Day 4', sales: 3100 },
    { date: 'Day 5', sales: 2780 },
    { date: 'Day 6', sales: 3500 },
    { date: 'Day 7', sales: 3890 },
  ],
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    sales: 2000 + Math.sin(i / 3) * 500 + Math.random() * 600,
  })),
  '90d': Array.from({ length: 90 }, (_, i) => ({
    date: `Day ${i + 1}`,
    sales: 2500 + Math.sin(i / 10) * 800 + Math.random() * 800,
  })),
};

const chartConfig = {
  sales: {
    label: "Sales",
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
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>
            Recent sales performance over the selected period.
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value: '7d' | '30d' | '90d') => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
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