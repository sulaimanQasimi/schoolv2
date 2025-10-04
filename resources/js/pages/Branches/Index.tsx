import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import SearchFilters from '../../components/ui/SearchFilters';
import StatsCard from '../../components/ui/StatsCard';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Plus, Building2, School, MapPin, Phone, Users, Eye, Edit, Trash2 } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  phone_number: string;
  school: {
    id: number;
    name: string;
  };
  created_at: string;
}

interface School {
  id: number;
  name: string;
}

interface BranchesIndexProps {
  branches: {
    data: Branch[];
    links: any[];
    meta: any;
  };
  schools: School[];
  filters: {
    search?: string;
    school_id?: string;
    date_from?: string;
    date_to?: string;
    sort_by?: string;
    sort_order?: string;
  };
}

const BranchesIndex: React.FC<BranchesIndexProps> = ({ branches, schools, filters }) => {
  const handleSearch = (searchFilters: any) => {
    router.get('/branches', searchFilters, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    router.get('/branches', {}, {
      preserveState: true,
      replace: true,
    });
  };

  const handlePageChange = (page: number) => {
    router.get('/branches', { ...filters, page }, {
      preserveState: true,
      replace: true,
    });
  };

  const columns = [
    {
      key: 'name',
      label: 'Branch',
      render: (value: string, branch: Branch) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-chart-2 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{branch.name}</h3>
            <p className="text-sm text-muted-foreground">{branch.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'school',
      label: 'School',
      render: (value: any) => (
        <div className="flex items-center space-x-2">
          <School className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">{value.name}</span>
        </div>
      ),
    },
    {
      key: 'address',
      label: 'Location',
      render: (value: string) => (
        <div className="flex items-start space-x-2">
          <MapPin className="h-3 w-3 text-muted-foreground mt-1" />
          <span className="text-sm text-foreground">{value}</span>
        </div>
      ),
    },
    {
      key: 'phone_number',
      label: 'Contact',
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm text-foreground">{value}</span>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <Head title="Branches" />
      
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Branches"
          description="Manage school branch locations"
          primaryAction={{
            label: 'Add Branch',
            href: '/branches/create',
            icon: Plus,
          }}
        />

        {/* Search and Filters */}
        <SearchFilters
          searchPlaceholder="Search branches by name, code, address, phone, or school..."
          filters={filters}
          onSearch={handleSearch}
          onClear={clearFilters}
          additionalFilters={[
            {
              label: 'School',
              key: 'school_id',
              type: 'select',
              options: schools.map(school => ({
                value: school.id.toString(),
                label: school.name,
              })),
            },
          ]}
          sortOptions={[
            { value: 'created_at', label: 'Created Date' },
            { value: 'name', label: 'Name' },
            { value: 'code', label: 'Code' },
            { value: 'school_name', label: 'School Name' },
          ]}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Branches"
            value={branches.data.length}
            description="+5 from last month"
            icon={Building2}
            trend={{ value: "5", isPositive: true }}
          />
          
          <StatsCard
            title="Active Schools"
            value={new Set(branches.data.map(branch => branch.school.id)).size}
            description="With active branches"
            icon={School}
          />
          
          <StatsCard
            title="Locations"
            value={new Set(branches.data.map(branch => branch.address.split(',')[0])).size}
            description="Different cities"
            icon={MapPin}
          />
        </div>

        {/* Branches Table */}
        <DataTable
          title="Branch Directory"
          description="A list of all branches across your schools"
          data={branches.data}
          columns={columns}
          actions={[
            {
              label: 'View',
              icon: Eye,
              href: (item: any) => `/branches/${item.id}`,
              variant: 'outline',
            },
            {
              label: 'Edit',
              icon: Edit,
              href: (item: any) => `/branches/${item.id}/edit`,
              variant: 'outline',
            },
            {
              label: 'Delete',
              icon: Trash2,
              onClick: (item: any) => {
                if (confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
                  router.delete(`/branches/${item.id}`, {
                    onSuccess: () => {
                      // Optionally show success message
                    },
                    onError: (errors) => {
                      console.error('Delete failed:', errors);
                      alert('Failed to delete branch. Please try again.');
                    }
                  });
                }
              },
              variant: 'destructive',
            },
          ]}
          primaryAction={{
            label: 'Add Branch',
            href: '/branches/create',
            icon: Plus,
          }}
          emptyState={{
            icon: Building2,
            title: 'No branches found',
            description: 'Get started by creating your first branch.',
            action: {
              label: 'Create Branch',
              href: '/branches/create',
            },
          }}
          pagination={branches.meta ? {
            currentPage: branches.meta.current_page,
            lastPage: branches.meta.last_page,
            total: branches.meta.total,
            perPage: branches.meta.per_page,
            links: branches.links,
          } : undefined}
          onPageChange={handlePageChange}
        />
      </div>
    </MainLayout>
  );
};

export default BranchesIndex;
