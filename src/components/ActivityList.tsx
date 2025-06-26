import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// Define the shape of a single item in the activity list
export interface ActivityItem {
  id: string | number;
  avatarSrc?: string;
  avatarFallback: string;
  primaryText: string;
  secondaryText: string;
  valueText: string;
}

// Define the props for the ActivityList component
interface ActivityListProps {
  items: ActivityItem[];
}

const ActivityList: React.FC<ActivityListProps> = ({ items }) => {
  console.log('ActivityList loaded');

  if (!items || items.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">近期无活动。</p>;
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.avatarSrc} alt="Avatar" />
            <AvatarFallback>{item.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.primaryText}</p>
            <p className="text-sm text-muted-foreground">{item.secondaryText}</p>
          </div>
          <div className="ml-auto font-medium">{item.valueText}</div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;