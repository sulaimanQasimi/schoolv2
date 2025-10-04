import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Button } from './Button';
import { 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  AlertCircle 
} from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface Action {
  label: string;
  icon: React.ComponentType<any>;
  href?: string | ((item: any) => string);
  onClick?: (item: any) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

interface DataTableProps {
  title: string;
  description?: string;
  data: any[];
  columns: Column[];
  actions?: Action[];
  primaryAction?: {
    label: string;
    href: string;
    icon: React.ComponentType<any>;
  };
  emptyState?: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    action?: {
      label: string;
      href: string;
    };
  };
  pagination?: {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
    links: any[];
  };
  onPageChange?: (page: number) => void;
  onDelete?: (item: any) => void;
  deleteRoute?: string;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  description,
  data,
  columns,
  actions = [],
  primaryAction,
  emptyState,
  pagination,
  onPageChange,
  onDelete,
  deleteRoute,
  className = '',
}) => {
  const handleDelete = (item: any) => {
    const resourceName = title.toLowerCase();
    const itemName = item.name || item.title || `${resourceName} #${item.id}`;
    
    if (confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
      if (onDelete) {
        onDelete(item);
      } else if (deleteRoute) {
        router.delete(deleteRoute.replace(':id', item.id), {
          onSuccess: () => {
            // Optionally show success message
          },
          onError: (errors) => {
            console.error('Delete failed:', errors);
            alert('Failed to delete item. Please try again.');
          }
        });
      } else {
        // Fallback to default route pattern
        router.delete(`/${resourceName}/${item.id}`, {
          onSuccess: () => {
            // Optionally show success message
          },
          onError: (errors) => {
            console.error('Delete failed:', errors);
            alert('Failed to delete item. Please try again.');
          }
        });
      }
    }
  };

  const defaultActions: Action[] = [
    {
      label: 'View',
      icon: Eye,
      href: (item: any) => `/${title.toLowerCase()}/${item.id}`,
      variant: 'outline',
    },
    {
      label: 'Edit',
      icon: Edit,
      href: (item: any) => `/${title.toLowerCase()}/${item.id}/edit`,
      variant: 'outline',
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: handleDelete,
      variant: 'destructive',
    },
  ];

  const allActions = actions.length > 0 ? actions : defaultActions;

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {emptyState ? (
            <div className="text-center py-12">
              <emptyState.icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {emptyState.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {emptyState.description}
              </p>
              {emptyState.action && (
                <Link href={emptyState.action.href}>
                  <Button>
                    {emptyState.action.label}
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No {title.toLowerCase()} found
              </h3>
              <p className="text-muted-foreground">
                There are no {title.toLowerCase()} to display at the moment.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {primaryAction && (
            <Link href={primaryAction.href}>
              <Button>
                <primaryAction.icon className="mr-2 h-4 w-4" />
                {primaryAction.label}
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block space-y-4">
          {data.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                {columns.map((column) => (
                  <div key={column.key} className={`${column.className || ''}`}>
                    {column.render ? (
                      column.render(item[column.key], item)
                    ) : (
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {item[column.key]}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                {allActions.map((action, actionIndex) => {
                  const ActionIcon = action.icon;
                  return (
                    <div key={actionIndex}>
                      {action.href ? (
                        <Link href={typeof action.href === 'function' ? action.href(item) : action.href}>
                        <Button
                          variant={action.variant || 'outline'}
                          size="default"
                          className={`${action.className || ''} flex items-center gap-2`}
                        >
                          <ActionIcon className="h-4 w-4" />
                          {action.label}
                        </Button>
                        </Link>
                      ) : (
                        <Button
                          variant={action.variant || 'outline'}
                          size="default"
                          onClick={() => action.onClick?.(item)}
                          className={`${action.className || ''} flex items-center gap-2`}
                        >
                          <ActionIcon className="h-4 w-4" />
                          {action.label}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {data.map((item, index) => (
            <div
              key={item.id || index}
              className="p-4 border border-border rounded-lg hover:bg-accent transition-colors space-y-3"
            >
              {/* Main Content */}
              <div className="space-y-3">
                {columns.map((column) => (
                  <div key={column.key} className={`${column.className || ''}`}>
                    {column.render ? (
                      column.render(item[column.key], item)
                    ) : (
                      <div>
                        <span className="text-sm font-medium text-foreground">
                          {item[column.key]}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border">
                {allActions.map((action, actionIndex) => {
                  const ActionIcon = action.icon;
                  return (
                    <div key={actionIndex}>
                      {action.href ? (
                        <Link href={typeof action.href === 'function' ? action.href(item) : action.href}>
                        <Button
                          variant={action.variant || 'outline'}
                          size="sm"
                          className={`${action.className || ''} flex items-center gap-1`}
                        >
                          <ActionIcon className="h-3 w-3" />
                          <span className="text-xs">{action.label}</span>
                        </Button>
                        </Link>
                      ) : (
                        <Button
                          variant={action.variant || 'outline'}
                          size="sm"
                          onClick={() => action.onClick?.(item)}
                          className={`${action.className || ''} flex items-center gap-1`}
                        >
                          <ActionIcon className="h-3 w-3" />
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && pagination.lastPage > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-border gap-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              Showing {((pagination.currentPage - 1) * pagination.perPage) + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of{' '}
              {pagination.total} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="hidden sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="sm:hidden"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-1">
                {pagination.links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => link.url && onPageChange?.(parseInt(link.label))}
                    disabled={!link.url}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded ${
                      link.active
                        ? 'bg-primary text-primary-foreground'
                        : link.url
                        ? 'text-foreground hover:bg-accent'
                        : 'text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.lastPage}
                className="hidden sm:flex"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.lastPage}
                className="sm:hidden"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
