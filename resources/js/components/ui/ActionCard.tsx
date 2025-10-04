import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Button } from './Button';

interface Action {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ComponentType<any>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
  actions: Action[];
  className?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  actions,
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
      <CardContent className="space-y-2">
        {actions.map((action, index) => {
          const ActionIcon = action.icon;
          const buttonContent = (
            <Button
              variant={action.variant || 'default'}
              className={`w-full justify-start ${action.className || ''}`}
              onClick={action.onClick}
            >
              {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
              {action.label}
            </Button>
          );

          return action.href ? (
            <Link key={index} href={action.href}>
              {buttonContent}
            </Link>
          ) : (
            <div key={index}>
              {buttonContent}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActionCard;
