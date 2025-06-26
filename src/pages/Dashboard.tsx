import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Custom Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import KPIWidgetCard from '@/components/KPIWidgetCard';
import SalesTrendChart from '@/components/SalesTrendChart';
import ActivityList, { type ActivityItem } from '@/components/ActivityList';

// Placeholder data for the ActivityList component
const recentOrdersData: ActivityItem[] = [
  {
    id: 1,
    avatarFallback: 'OM',
    primaryText: 'Olivia Martin',
    secondaryText: 'olivia.martin@email.com',
    valueText: '+$1,999.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/01.png',
  },
  {
    id: 2,
    avatarFallback: 'JL',
    primaryText: 'Jackson Lee',
    secondaryText: 'jackson.lee@email.com',
    valueText: '+$39.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/02.png',
  },
  {
    id: 3,
    avatarFallback: 'IN',
    primaryText: 'Isabella Nguyen',
    secondaryText: 'isabella.nguyen@email.com',
    valueText: '+$299.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/03.png',
  },
  {
    id: 4,
    avatarFallback: 'WK',
    primaryText: 'William Kim',
    secondaryText: 'will@email.com',
    valueText: '+$99.00',
  },
  {
    id: 5,
    avatarFallback: 'SD',
    primaryText: 'Sofia Davis',
    secondaryText: 'sofia.davis@email.com',
    valueText: '+$39.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/05.png',
  },
];

const topProductsData: ActivityItem[] = [
    {
        id: 'prod-1',
        primaryText: 'Ergonomic Office Chair',
        secondaryText: 'SKU: CH-001',
        valueText: '+1,230 sold',
        avatarSrc: 'https://placehold.co/40x40/e2e8f0/64748b?text=P1',
        avatarFallback: 'P1'
    },
    {
        id: 'prod-2',
        primaryText: 'Wireless Mechanical Keyboard',
        secondaryText: 'SKU: KB-012',
        valueText: '+980 sold',
        avatarSrc: 'https://placehold.co/40x40/e2e8f0/64748b?text=P2',
        avatarFallback: 'P2'
    },
    {
        id: 'prod-3',
        primaryText: '4K UHD Monitor',
        secondaryText: 'SKU: MN-054',
        valueText: '+750 sold',
        avatarSrc: 'https://placehold.co/40x40/e2e8f0/64748b?text=P3',
        avatarFallback: 'P3'
    }
];

const Dashboard = () => {
    console.log('Dashboard page loaded');

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            {/* For this page component, we assume the sidebar is always open on desktop. */}
            {/* In a real app, its state would be managed globally. */}
            <LeftSidebar isOpen={true} />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
                    {/* KPI Cards Section */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <KPIWidgetCard 
                            title="Total Revenue"
                            metric="$45,231.89"
                            change="+20.1%"
                            changeType="increase"
                            Icon={DollarSign}
                        />
                        <KPIWidgetCard 
                            title="New Customers"
                            metric="+2350"
                            change="+180.1%"
                            changeType="increase"
                            Icon={Users}
                        />
                        <KPIWidgetCard 
                            title="New Orders"
                            metric="1,245"
                            change="-2.4%"
                            changeType="decrease"
                            Icon={CreditCard}
                        />
                        <KPIWidgetCard 
                            title="Active Now"
                            metric="573"
                            change="+10 since last hour"
                            changeType="increase"
                            Icon={Activity}
                        />
                    </div>
                    {/* Main Content Grid: Chart and Activity Lists */}
                    <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <SalesTrendChart />
                        </div>
                        <div className="space-y-4 lg:space-y-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Recent Orders</CardTitle>
                                        <CardDescription>You have 265 new orders this month.</CardDescription>
                                    </div>
                                    <Link to="/orders" className="text-sm font-medium text-primary hover:underline">View All</Link>
                                </CardHeader>
                                <CardContent>
                                    <ActivityList items={recentOrdersData} />
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Top Products</CardTitle>
                                        <CardDescription>Your best-selling items.</CardDescription>
                                    </div>
                                    <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All</Link>
                                </CardHeader>
                                <CardContent>
                                    <ActivityList items={topProductsData} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;