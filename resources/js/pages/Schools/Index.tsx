import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import SearchFilters from '../../components/ui/SearchFilters';
import StatsCard from '../../components/ui/StatsCard';
import DataTable from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import { Plus, School, Building2, Users, Mail, Phone, MapPin, Eye, Edit, Trash2 } from 'lucide-react';

interface School {
  id: number;
  name: string;
  code: string;
  address: string;
  email: string;
  phone_number: string;
  branches_count: number;
  created_at: string;
}

interface SchoolsIndexProps {
  schools: {
    data: School[];
    links: any[];
    meta: any;
  };
  filters: {
    search?: string;
    date_from?: string;
    date_to?: string;
    sort_by?: string;
    sort_order?: string;
  };
}

const SchoolsIndex: React.FC<SchoolsIndexProps> = ({ schools, filters }) => {
  const handleSearch = (searchFilters: any) => {
    router.get('/schools', searchFilters, {
      preserveState: true,
      replace: true,
    });
  };

  const clearFilters = () => {
    router.get('/schools', {}, {
      preserveState: true,
      replace: true,
    });
  };

  const handlePageChange = (page: number) => {
    router.get('/schools', { ...filters, page }, {
      preserveState: true,
      replace: true,
    });
  };

  const columns = [
    {
      key: 'name',
      label: 'School',
      render: (value: string, school: School) => (
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <School className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{school.name}</h3>
            <p className="text-sm text-muted-foreground">{school.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Contact',
      render: (value: string, school: School) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm text-foreground">{school.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{school.phone_number}</span>
          </div>
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
      key: 'branches_count',
      label: 'Branches',
      render: (value: number) => (
        <div className="text-center">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <p className="text-xs text-muted-foreground">branches</p>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <Head title="Schools" />
      
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Schools"
          description="Manage your school institutions"
          primaryAction={{
            label: 'Add School',
            href: '/schools/create',
            icon: Plus,
          }}
        />

        {/* Search and Filters */}
        <SearchFilters
          searchPlaceholder="Search schools by name, code, email, address, or phone..."
          filters={filters}
          onSearch={handleSearch}
          onClear={clearFilters}
          sortOptions={[
            { value: 'created_at', label: 'Created Date' },
            { value: 'name', label: 'Name' },
            { value: 'code', label: 'Code' },
            { value: 'email', label: 'Email' },
            { value: 'branches_count', label: 'Branches Count' },
          ]}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Schools"
            value={schools.data.length}
            description="+2 from last month"
            icon={School}
            trend={{ value: "2", isPositive: true }}
          />
          
          <StatsCard
            title="Total Branches"
            value={schools.data.reduce((acc, school) => acc + school.branches_count, 0)}
            description="Across all schools"
            icon={Building2}
          />
          
          <StatsCard
            title="Active Users"
            value="1,234"
            description="+12% from last month"
            icon={Users}
            trend={{ value: "12%", isPositive: true }}
          />
        </div>

        {/* Schools Table */}
        <DataTable
          title="School Directory"
          description="A list of all schools in your system"
          data={schools.data}
          columns={columns}
          actions={[
            {
              label: 'View',
              icon: Eye,
              href: (item: any) => `/schools/${item.id}`,
              variant: 'outline',
            },
            {
              label: 'Edit',
              icon: Edit,
              href: (item: any) => `/schools/${item.id}/edit`,
              variant: 'outline',
            },
            {
              label: 'Delete',
              icon: Trash2,
              onClick: (item: any) => {
                if (confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
                  router.delete(`/schools/${item.id}`, {
                    onSuccess: () => {
                      // Optionally show success message
                    },
                    onError: (errors) => {
                      console.error('Delete failed:', errors);
                      alert('Failed to delete school. Please try again.');
                    }
                  });
                }
              },
              variant: 'destructive',
            },
          ]}
          primaryAction={{
            label: 'Add School',
            href: '/schools/create',
            icon: Plus,
          }}
          emptyState={{
            icon: School,
            title: 'No schools found',
            description: 'Get started by creating your first school.',
            action: {
              label: 'Create School',
              href: '/schools/create',
            },
          }}
          pagination={schools.meta ? {
            currentPage: schools.meta.current_page,
            lastPage: schools.meta.last_page,
            total: schools.meta.total,
            perPage: schools.meta.per_page,
            links: schools.links,
          } : undefined}
          onPageChange={handlePageChange}
        />
      </div>
    </MainLayout>
  );
};

export default SchoolsIndex;
