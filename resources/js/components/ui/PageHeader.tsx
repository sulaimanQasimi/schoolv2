import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from './Button';
import { ArrowLeft, Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  primaryAction?: {
    label: string;
    href: string;
    icon?: React.ComponentType<any>;
  };
  secondaryActions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ComponentType<any>;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }>;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backHref,
  backLabel = 'Back',
  primaryAction,
  secondaryActions = [],
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center space-x-4">
        {backHref && (
          <Link href={backHref}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLabel}
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      {(primaryAction || secondaryActions.length > 0) && (
        <div className="flex items-center space-x-2">
          {secondaryActions.map((action, index) => {
            const ActionIcon = action.icon;
            const buttonContent = (
              <Button variant={action.variant || 'outline'} size="sm">
                {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
                {action.label}
              </Button>
            );

            return action.href ? (
              <Link key={index} href={action.href}>
                {buttonContent}
              </Link>
            ) : (
              <div key={index} onClick={action.onClick}>
                {buttonContent}
              </div>
            );
          })}
          
          {primaryAction && (
            <Link href={primaryAction.href}>
              <Button size="sm">
                {primaryAction.icon && <primaryAction.icon className="mr-2 h-4 w-4" />}
                {primaryAction.label}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;