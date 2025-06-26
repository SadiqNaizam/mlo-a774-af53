import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  LineChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LeftSidebarProps {
  isOpen: boolean;
}

const navItems = [
  { to: '/', icon: LayoutDashboard, label: '仪表盘' },
  { to: '/orders', icon: ShoppingCart, label: '订单' },
  { to: '/products', icon: Package, label: '产品' },
  { to: '/analytics', icon: LineChart, label: '分析' },
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen }) => {
  console.log('LeftSidebar loaded');

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
      { 'bg-muted text-primary': isActive }
    );

  return (
    <div className={cn("hidden border-r bg-muted/40 md:block", { "md:w-64": isOpen, "md:w-20": !isOpen })}>
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className={cn("flex h-16 items-center border-b px-6", {"justify-start": isOpen, "justify-center": !isOpen})}>
                <NavLink to="/" className="flex items-center gap-2 font-semibold">
                    <Package className="h-6 w-6" />
                    {isOpen && <span className="">商店脉搏</span>}
                </NavLink>
            </div>
            <div className="flex-1">
                <nav className={cn("grid items-start text-sm font-medium", {"px-4": isOpen, "px-2": !isOpen})}>
                    {navItems.map((item) => (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <NavLink to={item.to} className={getNavLinkClass} end={item.to === '/'}>
                                    <item.icon className="h-4 w-4" />
                                    {isOpen && <span>{item.label}</span>}
                                </NavLink>
                            </TooltipTrigger>
                            {!isOpen && (
                                <TooltipContent side="right">
                                    {item.label}
                                </TooltipContent>
                            )}
                        </Tooltip>
                    ))}
                </nav>
            </div>
        </div>
    </div>
  );
};

export default LeftSidebar;