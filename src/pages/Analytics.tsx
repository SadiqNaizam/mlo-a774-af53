import React from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Recharts for Charts
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data for Charts and Tables
const salesData = [
  { date: '2024-01-01', sales: 4000 },
  { date: '2024-01-02', sales: 3000 },
  { date: '2024-01-03', sales: 2000 },
  { date: '2024-01-04', sales: 2780 },
  { date: '2024-01-05', sales: 1890 },
  { date: '2024-01-06', sales: 2390 },
  { date: '2024-01-07', sales: 3490 },
];

const trafficData = [
    { source: '谷歌', visitors: 1200 },
    { source: 'Facebook', visitors: 800 },
    { source: '直接访问', visitors: 650 },
    { source: 'Instagram', visitors: 400 },
    { source: '其他', visitors: 250 },
];

const customerData = [
    { month: '一月', new: 150, returning: 80 },
    { month: '二月', new: 180, returning: 120 },
    { month: '三月', new: 220, returning: 160 },
    { month: '四月', new: 200, returning: 150 },
];

const topProducts = [
    { id: 'PROD-001', name: '现代台灯', sales: 150, revenue: '$4,500' },
    { id: 'PROD-002', name: '人体工学椅', sales: 90, revenue: '$18,000' },
    { id: 'PROD-003', name: '无线鼠标', sales: 300, revenue: '$7,500' },
]

const Analytics = () => {
    console.log('Analytics page loaded');

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/* The sidebar state would be managed globally in a real app, here it's fixed */}
            <LeftSidebar isOpen={true} />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20"> {/* Adjusted pl to account for collapsed sidebar width */}
                <Header />
                <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-8 space-y-8">
                    <Tabs defaultValue="sales">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="sales">销售</TabsTrigger>
                                <TabsTrigger value="traffic">流量</TabsTrigger>
                                <TabsTrigger value="customers">客户</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Select defaultValue="last-30-days">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="选择日期范围" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">今天</SelectItem>
                                        <SelectItem value="last-7-days">最近7天</SelectItem>
                                        <SelectItem value="last-30-days">最近30天</SelectItem>
                                        <SelectItem value="last-90-days">最近90天</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Sales Tab Content */}
                        <TabsContent value="sales" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>销售概览</CardTitle>
                                    <CardDescription>在选定时期内您的销售业绩概览。</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                            <Line type="monotone" dataKey="sales" name="销售额" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>最畅销产品</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>产品</TableHead>
                                                <TableHead>销售单位</TableHead>
                                                <TableHead>总收入</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {topProducts.map(p => (
                                                <TableRow key={p.id}>
                                                    <TableCell>{p.name}</TableCell>
                                                    <TableCell>{p.sales}</TableCell>
                                                    <TableCell>{p.revenue}</TableCell>
                                                </TableRow>
                                            ))}\
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Traffic Tab Content */}
                        <TabsContent value="traffic" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>网站流量来源</CardTitle>
                                    <CardDescription>您的访客来自哪里。</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={trafficData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="source" />
                                            <YAxis />
                                             <Tooltip
                                                cursor={{fill: "hsl(var(--muted))"}}
                                                content={<ChartTooltipContent hideLabel />}
                                            />
                                            <Bar dataKey="visitors" name="访客数" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Customer Behavior Tab Content */}
                        <TabsContent value="customers" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>新客户 vs. 回头客</CardTitle>
                                    <CardDescription>您的客户群增长分析。</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[350px]">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <ChartContainer config={{}} className="min-h-[200px] w-full">
                                            <BarChart accessibilityLayer data={customerData}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                                <YAxis />
                                                <Tooltip content={<ChartTooltipContent />} />
                                                <Legend />
                                                <Bar dataKey="new" fill="#2563eb" name="新客户" radius={4} />
                                                <Bar dataKey="returning" fill="#60a5fa" name="回头客" radius={4} />
                                            </BarChart>
                                        </ChartContainer>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Analytics;