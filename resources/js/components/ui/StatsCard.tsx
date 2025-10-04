import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';

interface StatItem {
  label: string;
  value: string | number;
  icon?: React.ComponentType<any>;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface StatsCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
  stats: StatItem[];
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  description,
  icon: Icon,
  stats,
  className = '',
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {Icon && <Icon className="h-5 w-5" />}
          <span>{title}</span>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {StatIcon && <StatIcon className="h-4 w-4 text-muted-foreground" />}
                <div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                {stat.trend && (
                  <div className={`text-xs ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend.isPositive ? '+' : ''}{stat.trend.value}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default StatsCard;