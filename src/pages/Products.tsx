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
    name: 'Gourmet Coffee Beans',
    sku: 'GCB-001',
    price: 19.99,
    stock: 120,
    status: 'In Stock',
  },
  {
    id: 'prod_2',
    name: 'Artisanal Tea Set',
    sku: 'ATS-005',
    price: 45.50,
    stock: 8,
    status: 'Low Stock',
  },
  {
    id: 'prod_3',
    name: 'Organic Chocolate Bar',
    sku: 'OCB-012',
    price: 5.99,
    stock: 250,
    status: 'In Stock',
  },
  {
    id: 'prod_4',
    name: 'Handmade Ceramic Mug',
    sku: 'HCM-003',
    price: 24.00,
    stock: 0,
    status: 'Out of Stock',
  },
    {
    id: 'prod_5',
    name: 'Premium Olive Oil',
    sku: 'POO-021',
    price: 29.99,
    stock: 55,
    status: 'In Stock',
  },
];

type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

const getBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case 'In Stock':
      return 'default'; // A neutral or positive color
    case 'Low Stock':
      return 'secondary'; // A warning color
    case 'Out of Stock':
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
              <h1 className="text-2xl font-semibold">Products</h1>
              <div className="ml-auto flex items-center gap-2">
                  <Dialog>
                      <DialogTrigger asChild>
                          <Button size="sm" className="h-8 gap-1">
                              <PlusCircle className="h-3.5 w-3.5" />
                              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                  Add Product
                              </span>
                          </Button>
                      </DialogTrigger>
                      <DialogContent>
                          <DialogHeader>
                              <DialogTitle>Add New Product</DialogTitle>
                              <DialogDescription>
                                  Fill in the details below to add a new product to your inventory.
                              </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">Name</Label>
                                  <Input id="name" placeholder="e.g., Gourmet Coffee Beans" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="sku" className="text-right">SKU</Label>
                                  <Input id="sku" placeholder="e.g., GCB-001" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="price" className="text-right">Price</Label>
                                  <Input id="price" type="number" placeholder="e.g., 19.99" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="stock" className="text-right">Stock</Label>
                                  <Input id="stock" type="number" placeholder="e.g., 120" className="col-span-3" />
                              </div>
                          </div>
                          <DialogFooter>
                              <Button type="submit" variant="secondary">Cancel</Button>
                              <Button type="submit">Save Product</Button>
                          </DialogFooter>
                      </DialogContent>
                  </Dialog>
              </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                A list of all products in your store.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      Image
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
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
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
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