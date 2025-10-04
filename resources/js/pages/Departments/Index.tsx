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

const DepartmentsIndex: React.FC<DepartmentsIndexProps> = ({ departments, branches = [], filters = {} }) => {
  // Debug logging
  console.log('Departments data:', departments);
  console.log('Departments data array:', departments?.data);
  
  const handleSearch = (searchFilters: any) => {
    router.get('/departments', searchFilters, { preserveState: true });
  };

  const handlePageChange = (page: number) => {
    router.get('/departments', { page }, { preserveState: true });
  };

  const clearFilters = () => {
    router.get('/departments', {}, { preserveState: true });
  };

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
          <div className="font-medium text-foreground">
            {item && item.branch && item.branch.name ? item.branch.name : 'Unknown Branch'}
          </div>
          <div className="text-sm text-muted-foreground">
            {item && item.branch && item.branch.school && item.branch.school.name 
              ? item.branch.school.name 
              : 'Unknown School'}
          </div>
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
            {item && item.head && item.head.name ? item.head.name : 'Not assigned'}
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
      value: departments?.meta?.total || 0,
      description: 'Across all branches',
      icon: Building2,
    },
    {
      title: 'Active Branches',
      value: branches?.length || 0,
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
          searchPlaceholder="Search departments by name, code, description, branch, school, or head..."
          filters={filters}
          onSearch={handleSearch}
          onClear={clearFilters}
          additionalFilters={[
            {
              label: 'Branch',
              key: 'branch_id',
              type: 'select',
              options: branches.map(branch => ({
                value: branch.id.toString(),
                label: `${branch.name} (${branch.school.name})`,
              })),
            },
          ]}
          sortOptions={[
            { value: 'created_at', label: 'Created Date' },
            { value: 'name', label: 'Name' },
            { value: 'code', label: 'Code' },
            { value: 'branch_name', label: 'Branch Name' },
            { value: 'school_name', label: 'School Name' },
          ]}
        />

        {/* Data Table */}
                <DataTable
                  title="Department Directory"
                  description="A list of all departments across your organization"
                  data={Array.isArray(departments?.data) ? departments.data : []}
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
          pagination={departments?.meta ? {
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
