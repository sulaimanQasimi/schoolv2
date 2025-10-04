import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Card, CardContent } from './Card';
import { Button } from './Button';
import { Search, Filter, X, Calendar } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchFiltersProps {
  searchPlaceholder: string;
  filters: {
    search?: string;
    date_from?: string;
    date_to?: string;
    sort_by?: string;
    sort_order?: string;
    [key: string]: any;
  };
  onSearch: (filters: any) => void;
  onClear: () => void;
  additionalFilters?: {
    label: string;
    key: string;
    type: 'select' | 'date' | 'text';
    options?: FilterOption[];
    placeholder?: string;
  }[];
  sortOptions?: FilterOption[];
  showAdvancedFilters?: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchPlaceholder,
  filters,
  onSearch,
  onClear,
  additionalFilters = [],
  sortOptions = [
    { value: 'created_at', label: 'Created Date' },
    { value: 'name', label: 'Name' },
  ],
  showAdvancedFilters = true,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      search: '',
      date_from: '',
      date_to: '',
      sort_by: 'created_at',
      sort_order: 'desc',
    };
    setLocalFilters(clearedFilters);
    onClear();
  };

  const updateFilter = (key: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = localFilters && Object.entries(localFilters).some(([key, value]) => {
    if (key === 'sort_by' && value === 'created_at') return false;
    if (key === 'sort_order' && value === 'desc') return false;
    return value && value !== '';
  });

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={localFilters.search || ''}
                onChange={(e) => updateFilter('search', e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            {hasActiveFilters && (
              <Button type="button" variant="outline" onClick={handleClear}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
            {showAdvancedFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-accent' : ''}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border">
              {/* Date From */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date From</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={localFilters.date_from || ''}
                    onChange={(e) => updateFilter('date_from', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date To</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={localFilters.date_to || ''}
                    onChange={(e) => updateFilter('date_to', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Sort By</label>
                <select
                  value={localFilters.sort_by || 'created_at'}
                  onChange={(e) => updateFilter('sort_by', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Order</label>
                <select
                  value={localFilters.sort_order || 'desc'}
                  onChange={(e) => updateFilter('sort_order', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              {/* Additional Filters */}
              {additionalFilters.map((filter) => (
                <div key={filter.key} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{filter.label}</label>
                  {filter.type === 'select' ? (
                    <select
                      value={localFilters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="">All {filter.label}</option>
                      {filter.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : filter.type === 'date' ? (
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={localFilters[filter.key] || ''}
                        onChange={(e) => updateFilter(filter.key, e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={localFilters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      placeholder={filter.placeholder}
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
