import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Define the type for the icon component
type LucideIcon = React.ElementType;

export interface KPIWidgetCardProps {
  title: string;
  metric: string;
  change: string;
  changeType: 'increase' | 'decrease';
  Icon: LucideIcon;
}

const KPIWidgetCard: React.FC<KPIWidgetCardProps> = ({ title, metric, change, changeType, Icon }) => {
  console.log('KPIWidgetCard loaded for:', title);

  const isIncrease = changeType === 'increase';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span
            className={cn(
              "flex items-center gap-1",
              isIncrease ? "text-emerald-600" : "text-red-600"
            )}
          >
            {isIncrease ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {change}
          </span>
          <span className="ml-2">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default KPIWidgetCard;