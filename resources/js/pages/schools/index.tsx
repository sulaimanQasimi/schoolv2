import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import SearchFilters from '@/components/ui/SearchFilters';
import StatsCard from '@/components/ui/StatsCard';
import DataTable from '@/components/ui/DataTable';
import PageHeader from '@/components/ui/PageHeader';
import { Plus, Building2, School, MapPin, Phone, Users, Eye, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/translate';

interface School {
    id: number;
    name: string;
    code: string;
    address: string;
    email: string;
    phone_number: string;
    branches_count?: number;
    created_at: string;
    updated_at: string;
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
    const { t } = useTranslation();

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
                    <div className="h-10 w-10 rounded-lg bg-chart-1 flex items-center justify-center">
                        <School className="h-5 w-5 text-white" />
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
            render: (value: string) => (
                <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-foreground">{value}</span>
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
                <div className="flex items-center space-x-2">
                    <Building2 className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-foreground">{value || 0}</span>
                </div>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title={t('schools.title')} />
            
            <div className="space-y-6">
                {/* Header */}
                <PageHeader
                    title={t('schools.title')}
                    description={t('schools.description')}
                    primaryAction={{
                        label: t('schools.create'),
                        href: '/schools/create',
                        icon: Plus,
                    }}
                />

                {/* Search and Filters */}
                <SearchFilters
                    searchPlaceholder={t('schools.search_placeholder')}
                    filters={filters}
                    onSearch={handleSearch}
                    onClear={clearFilters}
                    sortOptions={[
                        { value: 'created_at', label: 'Created Date' },
                        { value: 'name', label: 'Name' },
                        { value: 'code', label: 'Code' },
                    ]}
                />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard
                        title={t('schools.total_schools')}
                        value={schools.data.length}
                        description={t('schools.total_schools_description')}
                        icon={School}
                    />
                    
                    <StatsCard
                        title={t('schools.total_branches')}
                        value={schools.data.reduce((sum, school) => sum + (school.branches_count || 0), 0)}
                        description={t('schools.total_branches_description')}
                        icon={Building2}
                    />
                    
                    <StatsCard
                        title={t('schools.locations')}
                        value={new Set(schools.data.map(school => school.address.split(',')[0])).size}
                        description={t('schools.locations_description')}
                        icon={MapPin}
                    />
                                </div>

                {/* Schools Table */}
                <DataTable
                    title={t('schools.all_schools')}
                    description={t('schools.all_schools_description')}
                    data={schools.data}
                    columns={columns}
                    actions={[
                        {
                            label: t('common.view'),
                            icon: Eye,
                            href: (item: any) => `/schools/${item.id}`,
                            variant: 'outline',
                        },
                        {
                            label: t('common.edit'),
                            icon: Edit,
                            href: (item: any) => `/schools/${item.id}/edit`,
                            variant: 'outline',
                        },
                        {
                            label: t('common.delete'),
                            icon: Trash2,
                            onClick: (item: any) => {
                                if (confirm(t('schools.delete_confirm_detailed', { name: item.name }))) {
                                    router.delete(`/schools/${item.id}`, {
                                        onSuccess: () => {
                                            // Optionally show success message
                                        },
                                        onError: (errors) => {
                                            console.error('Delete failed:', errors);
                                            alert(t('schools.delete_failed'));
                                        }
                                    });
                                }
                            },
                            variant: 'destructive',
                        },
                    ]}
                    primaryAction={{
                        label: t('schools.create'),
                        href: '/schools/create',
                        icon: Plus,
                    }}
                    emptyState={{
                        icon: School,
                        title: t('schools.no_schools'),
                        description: t('schools.no_schools_description'),
                        action: {
                            label: t('schools.create'),
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
