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
    { source: 'Google', visitors: 1200 },
    { source: 'Facebook', visitors: 800 },
    { source: 'Direct', visitors: 650 },
    { source: 'Instagram', visitors: 400 },
    { source: 'Other', visitors: 250 },
];

const customerData = [
    { month: 'Jan', new: 150, returning: 80 },
    { month: 'Feb', new: 180, returning: 120 },
    { month: 'Mar', new: 220, returning: 160 },
    { month: 'Apr', new: 200, returning: 150 },
];

const topProducts = [
    { id: 'PROD-001', name: 'Modern Desk Lamp', sales: 150, revenue: '$4,500' },
    { id: 'PROD-002', name: 'Ergonomic Chair', sales: 90, revenue: '$18,000' },
    { id: 'PROD-003', name: 'Wireless Mouse', sales: 300, revenue: '$7,500' },
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
                                <TabsTrigger value="sales">Sales</TabsTrigger>
                                <TabsTrigger value="traffic">Traffic</TabsTrigger>
                                <TabsTrigger value="customers">Customers</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Select defaultValue="last-30-days">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select date range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                                        <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Sales Tab Content */}
                        <TabsContent value="sales" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sales Overview</CardTitle>
                                    <CardDescription>A look at your sales performance over the selected period.</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Selling Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead>Units Sold</TableHead>
                                                <TableHead>Total Revenue</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {topProducts.map(p => (
                                                <TableRow key={p.id}>
                                                    <TableCell>{p.name}</TableCell>
                                                    <TableCell>{p.sales}</TableCell>
                                                    <TableCell>{p.revenue}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Traffic Tab Content */}
                        <TabsContent value="traffic" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Website Traffic Sources</CardTitle>
                                    <CardDescription>Where your visitors are coming from.</CardDescription>
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
                                            <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Customer Behavior Tab Content */}
                        <TabsContent value="customers" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>New vs. Returning Customers</CardTitle>
                                    <CardDescription>Analysis of your customer base growth.</CardDescription>
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
                                                <Bar dataKey="new" fill="#2563eb" name="New Customers" radius={4} />
                                                <Bar dataKey="returning" fill="#60a5fa" name="Returning Customers" radius={4} />
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