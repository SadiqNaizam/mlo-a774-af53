import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Search,
  Menu,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LeftSidebar from './LeftSidebar'; // Import for mobile sheet view

interface HeaderProps {
  // In a real app, a function to toggle the desktop sidebar would be passed here
  // onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  console.log('Header loaded');

  // Placeholder for sidebar toggle functionality
  const handleSidebarToggle = () => {
    console.log("Sidebar toggle clicked");
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Desktop Logo */}
        <Link to="/" className="hidden font-bold md:flex items-center gap-2 text-lg">
          <Package className="h-6 w-6" />
          <span>商店脉搏</span>
        </Link>
        {/* Mobile Sidebar Toggle - using Sheet for drawer effect */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">切换导航菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            {/* We can reuse LeftSidebar component here for mobile nav consistency */}
            <div className="flex h-full max-h-screen flex-col">
              <div className="flex h-16 items-center border-b px-6">
                  <Link to="/" className="flex items-center gap-2 font-semibold">
                      <Package className="h-6 w-6" />
                      <span>商店脉搏</span>
                  </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                {/* Passing a prop to indicate it's always open inside the sheet */}
                <LeftSidebar isOpen={true} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索产品..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="@storeowner" />
                <AvatarFallback>店主</AvatarFallback>
              </Avatar>
              <span className="sr-only">切换用户菜单</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>设置</DropdownMenuItem>
            <DropdownMenuItem>支持</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">登出</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;