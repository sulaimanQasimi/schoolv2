import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import PageHeader from '../../components/ui/PageHeader';
import SearchFilters from '../../components/ui/SearchFilters';
import StatsCard from '../../components/ui/StatsCard';
import DataTable from '../../components/ui/DataTable';
import { Building2, Users, Plus, Eye, Edit, Trash2, Hash, Calendar, User } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  branch: {
    id: number;
    name: string;
    school: {
      id: number;
      name: string;
    };
  };
  head: {
    id: number;
    name: string;
  } | null;
  created_at: string;
}

interface Branch {
  id: number;
  name: string;
  school: {
    id: number;
    name: string;
  };
}

interface DepartmentsIndexProps {
  departments: {
    data: Department[];
    links: any[];
    meta: {
      current_page: number;
      last_page: number;
      total: number;
      per_page: number;
    };
  };
  branches: Branch[];
  filters: {
    search?: string;
    branch_id?: string;
    date_from?: string;
    date_to?: string;
    sort_by?: string;
    sort_order?: string;
  };
}

const DepartmentsIndex: React.FC<DepartmentsIndexProps> = ({ departments, branches, filters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    router.get('/departments', { search: searchTerm }, { preserveState: true });
  };

  const handlePageChange = (page: number) => {
    router.get('/departments', { page }, { preserveState: true });
  };

  const clearFilters = () => {
    setSearchTerm('');
    router.get('/departments', {}, { preserveState: true });
  };

  const hasActiveFilters = filters.search || filters.branch_id || filters.date_from || filters.date_to;

  const columns = [
    {
      key: 'name',
      label: 'Department',
      render: (item: Department) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-chart-1 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-foreground">{item.name}</div>
            <div className="text-sm text-muted-foreground">{item.code}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'branch',
      label: 'Branch',
      render: (item: Department) => (
        <div>
          <div className="font-medium text-foreground">{item.branch.name}</div>
          <div className="text-sm text-muted-foreground">{item.branch.school.name}</div>
        </div>
      ),
    },
    {
      key: 'head',
      label: 'Head',
      render: (item: Department) => (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">
            {item.head ? item.head.name : 'Not assigned'}
          </span>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (item: Department) => (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      ),
    },
  ];

  const stats = [
    {
      title: 'Total Departments',
      value: departments.meta.total,
      description: 'Across all branches',
      icon: Building2,
    },
    {
      title: 'Active Branches',
      value: branches.length,
      description: 'With departments',
      icon: Users,
    },
  ];

  return (
    <MainLayout>
      <Head title="Departments" />

      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Departments"
          description="Manage all departments across your organization"
          primaryAction={{
            label: 'Add Department',
            href: '/departments/create',
            icon: Plus,
          }}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Branch
              </label>
              <select
                value={filters.branch_id || ''}
                onChange={(e) => router.get('/departments', { branch_id: e.target.value }, { preserveState: true })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} ({branch.school.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date From
              </label>
              <input
                type="date"
                value={filters.date_from || ''}
                onChange={(e) => router.get('/departments', { date_from: e.target.value }, { preserveState: true })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date To
              </label>
              <input
                type="date"
                value={filters.date_to || ''}
                onChange={(e) => router.get('/departments', { date_to: e.target.value }, { preserveState: true })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        </SearchFilters>

        {/* Data Table */}
        <DataTable
          title="Department Directory"
          description="A list of all departments across your organization"
          data={departments.data}
          columns={columns}
          actions={[
            {
              label: 'View',
              icon: Eye,
              href: (item: any) => `/departments/${item.id}`,
              variant: 'outline',
            },
            {
              label: 'Edit',
              icon: Edit,
              href: (item: any) => `/departments/${item.id}/edit`,
              variant: 'outline',
            },
            {
              label: 'Delete',
              icon: Trash2,
              onClick: (item: any) => {
                if (confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
                  router.delete(`/departments/${item.id}`, {
                    onSuccess: () => {
                      // Optionally show success message
                    },
                    onError: (errors) => {
                      console.error('Delete failed:', errors);
                      alert('Failed to delete department. Please try again.');
                    }
                  });
                }
              },
              variant: 'destructive',
            },
          ]}
          primaryAction={{
            label: 'Add Department',
            href: '/departments/create',
            icon: Plus,
          }}
          emptyState={{
            icon: Building2,
            title: 'No departments found',
            description: 'Get started by creating your first department.',
            action: {
              label: 'Create Department',
              href: '/departments/create',
            },
          }}
          pagination={departments.meta ? {
            currentPage: departments.meta.current_page,
            lastPage: departments.meta.last_page,
            total: departments.meta.total,
            perPage: departments.meta.per_page,
            links: departments.links,
          } : undefined}
          onPageChange={handlePageChange}
        />
      </div>
    </MainLayout>
  );
};

export default DepartmentsIndex;
