import React, { useState } from 'react';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock Product Data
const productsData = [
  {
    id: 'prod_1',
    name: '美食咖啡豆',
    sku: 'GCB-001',
    price: 19.99,
    stock: 120,
    status: '有货',
  },
  {
    id: 'prod_2',
    name: '工匠茶具套装',
    sku: 'ATS-005',
    price: 45.50,
    stock: 8,
    status: '低库存',
  },
  {
    id: 'prod_3',
    name: '有机巧克力棒',
    sku: 'OCB-012',
    price: 5.99,
    stock: 250,
    status: '有货',
  },
  {
    id: 'prod_4',
    name: '手工陶瓷杯',
    sku: 'HCM-003',
    price: 24.00,
    stock: 0,
    status: '缺货',
  },
    {
    id: 'prod_5',
    name: '优质橄榄油',
    sku: 'POO-021',
    price: 29.99,
    stock: 55,
    status: '有货',
  },
];

type ProductStatus = '有货' | '低库存' | '缺货';

const getBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case '有货':
      return 'default'; // A neutral or positive color
    case '低库存':
      return 'secondary'; // A warning color
    case '缺货':
      return 'destructive'; // A danger/error color
    default:
      return 'outline';
  }
};

const Products = () => {
  console.log('Products page loaded');
  // For this example, we'll assume the sidebar is controlled by a context in a real app.
  // Here, we'll just set it to be open.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center mt-6 mb-6">
              <h1 className="text-2xl font-semibold">产品</h1>
              <div className="ml-auto flex items-center gap-2">
                  <Dialog>
                      <DialogTrigger asChild>
                          <Button size="sm" className="h-8 gap-1">
                              <PlusCircle className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                  添加产品
                              </span>
                          </Button>
                      </DialogTrigger>
                      <DialogContent>
                          <DialogHeader>
                              <DialogTitle>添加新产品</DialogTitle>
                              <DialogDescription>
                                  请填写以下详细信息以将新产品添加到您的库存中。
                              </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">名称</Label>
                                  <Input id="name" placeholder="例如, 美食咖啡豆" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="sku" className="text-right">SKU</Label>
                                  <Input id="sku" placeholder="例如, GCB-001" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="price" className="text-right">价格</Label>
                                  <Input id="price" type="number" placeholder="例如, 19.99" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="stock" className="text-right">库存</Label>
                                  <Input id="stock" type="number" placeholder="例如, 120" className="col-span-3" />
                              </div>
                          </div>
                          <DialogFooter>
                              <Button type="submit" variant="secondary">取消</Button>
                              <Button type="submit">保存产品</Button>
                          </DialogFooter>
                      </DialogContent>
                  </Dialog>
              </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>产品库存</CardTitle>
              <CardDescription>
                您商店中所有产品的列表。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      图片
                    </TableHead>
                    <TableHead>名称</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="text-right">价格</TableHead>
                    <TableHead className="text-right">库存</TableHead>
                    <TableHead>
                      <span className="sr-only">操作</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={`https://picsum.photos/seed/${product.id}/64`}
                            width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(product.status as ProductStatus)}>{product.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">切换菜单</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>编辑</DropdownMenuItem>
                                <DropdownMenuItem>删除</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}\
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Products;