import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for the orders table
const orders = [
  {
    id: 'ORD001',
    customerName: 'Liam Johnson',
    email: 'liam@example.com',
    date: '2023-07-15',
    status: '已送达',
    total: '$250.00',
  },
  {
    id: 'ORD002',
    customerName: 'Olivia Smith',
    email: 'olivia@example.com',
    date: '2023-07-16',
    status: '处理中',
    total: '$150.00',
  },
  {
    id: 'ORD003',
    customerName: 'Noah Williams',
    email: 'noah@example.com',
    date: '2023-07-17',
    status: '已取消',
    total: '$350.00',
  },
  {
    id: 'ORD004',
    customerName: 'Emma Brown',
    email: 'emma@example.com',
    date: '2023-07-18',
    status: '已送达',
    total: '$450.00',
  },
  {
    id: 'ORD005',
    customerName: 'Ava Jones',
    email: 'ava@example.com',
    date: '2023-07-19',
    status: '处理中',
    total: '$550.00',
  },
  {
    id: 'ORD006',
    customerName: 'James Davis',
    email: 'james@example.com',
    date: '2023-07-20',
    status: '已送达',
    total: '$200.00',
  },
];

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
        case '已送达':
            return 'default';
        case '处理中':
            return 'secondary';
        case '已取消':
            return 'destructive';
        default:
            return 'secondary';
    }
}

const Orders: React.FC = () => {
  console.log('Orders page loaded');

  // For this example, we'll assume the sidebar is always open on desktop
  const isSidebarOpen = true;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* The main layout is managed by the combination of Header, LeftSidebar and the main content */}
        <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <LeftSidebar isOpen={isSidebarOpen} />
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 overflow-auto">
              <div className="grid flex-1 items-start gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>订单</CardTitle>
                    <CardDescription>
                      管理您的订单并查看其状态。
                    </CardDescription>
                    <div className="pt-2">
                       <Input placeholder="按ID或客户名称搜索订单..." />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>订单ID</TableHead>
                          <TableHead>顾客</TableHead>
                          <TableHead>日期</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead className="text-right">总计</TableHead>
                          <TableHead>操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                                <div className="font-medium">{order.customerName}</div>
                                <div className="text-sm text-muted-foreground">{order.email}</div>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{order.total}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                                        <DropdownMenuItem>打印发票</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))ж
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;