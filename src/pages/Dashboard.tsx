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
    primaryText: '奥利维亚·马丁',
    secondaryText: 'olivia.martin@email.com',
    valueText: '+$1,999.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/01.png',
  },
  {
    id: 2,
    avatarFallback: 'JL',
    primaryText: '杰克逊·李',
    secondaryText: 'jackson.lee@email.com',
    valueText: '+$39.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/02.png',
  },
  {
    id: 3,
    avatarFallback: 'IN',
    primaryText: '伊莎贝拉·阮',
    secondaryText: 'isabella.nguyen@email.com',
    valueText: '+$299.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/03.png',
  },
  {
    id: 4,
    avatarFallback: 'WK',
    primaryText: '威廉·金',
    secondaryText: 'will@email.com',
    valueText: '+$99.00',
  },
  {
    id: 5,
    avatarFallback: 'SD',
    primaryText: '索菲亚·戴维斯',
    secondaryText: 'sofia.davis@email.com',
    valueText: '+$39.00',
    avatarSrc: 'https://ui.shadcn.com/avatars/05.png',
  },
];

const topProductsData: ActivityItem[] = [
    {
        id: 'prod-1',
        primaryText: '人体工学办公椅',
        secondaryText: 'SKU: CH-001',
        valueText: '+1,230 已售',
        avatarSrc: 'https://placehold.co/40x40/e2e8f0/64748b?text=P1',
        avatarFallback: 'P1'
    },
    {
        id: 'prod-2',
        primaryText: '无线机械键盘',
        secondaryText: 'SKU: KB-012',
        valueText: '+980 已售',
        avatarSrc: 'https://placehold.co/40x40/e2e8f0/64748b?text=P2',
        avatarFallback: 'P2'
    },
    {
        id: 'prod-3',
        primaryText: '4K 超高清显示器',
        secondaryText: 'SKU: MN-054',
        valueText: '+750 已售',
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
                            title="总收入"
                            metric="$45,231.89"
                            change="+20.1%"
                            changeType="increase"
                            Icon={DollarSign}
                        />
                        <KPIWidgetCard 
                            title="新客户"
                            metric="+2350"
                            change="+180.1%"
                            changeType="increase"
                            Icon={Users}
                        />
                        <KPIWidgetCard 
                            title="新订单"
                            metric="1,245"
                            change="-2.4%"
                            changeType="decrease"
                            Icon={CreditCard}
                        />
                        <KPIWidgetCard 
                            title="当前在线"
                            metric="573"
                            change="+10 自上一小时"
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
                                        <CardTitle>最近订单</CardTitle>
                                        <CardDescription>本月您有 265 个新订单。</CardDescription>
                                    </div>
                                    <Link to="/orders" className="text-sm font-medium text-primary hover:underline">查看全部</Link>
                                </CardHeader>
                                <CardContent>
                                    <ActivityList items={recentOrdersData} />
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>热门产品</CardTitle>
                                        <CardDescription>您最畅销的商品。</CardDescription>
                                    </div>
                                    <Link to="/products" className="text-sm font-medium text-primary hover:underline">查看全部</Link>
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