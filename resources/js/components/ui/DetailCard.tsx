import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';

interface DetailItemProps {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ComponentType<any>;
  className?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon: Icon, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
        <div className="text-foreground">{value}</div>
      </div>
    </div>
  );
};

interface DetailCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
  className?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  description,
  icon: Icon,
  children,
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
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};

export { DetailCard, DetailItem };
