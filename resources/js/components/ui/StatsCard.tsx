import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { useTranslation } from '@/lib/i18n/translate';

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
  title?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  stats?: StatItem[];
  // Legacy props for backward compatibility
  value?: string | number;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  description,
  icon: Icon,
  stats,
  value,
  className = '',
}) => {
  const { t } = useTranslation();
  // Handle legacy single stat format
  const displayStats = stats || (value !== undefined ? [{
    label: title || t('stats.value'),
    value: value,
    description: description,
    icon: Icon,
  }] : []);

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
        {displayStats && displayStats.length > 0 ? (
          displayStats.map((stat, index) => {
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
          })
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">{t('stats.no_statistics')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;