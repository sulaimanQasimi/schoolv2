import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Schools',
        href: '/schools',
    },
];

interface School {
    id: number;
    name: string;
    code?: string;
    address?: string;
    email?: string;
    phone_number?: string;
    branches_count?: number;
    created_at: string;
    updated_at: string;
}

interface SchoolsResponse {
    data: School[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function SchoolsIndex() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
    });

    const fetchSchools = async (page = 1, searchTerm = '') => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: '15',
                ...(searchTerm && { search: searchTerm }),
            });

            const response = await fetch(`/api/schools?${params}`);
            const data: SchoolsResponse = await response.json();
            
            setSchools(data.data);
            setPagination({
                current_page: data.current_page,
                last_page: data.last_page,
                per_page: data.per_page,
                total: data.total,
            });
        } catch (error) {
            console.error('Error fetching schools:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchSchools(1, search);
    };

    const handlePageChange = (page: number) => {
        fetchSchools(page, search);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this school?')) return;
        
        try {
            const response = await fetch(`/api/schools/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                fetchSchools(pagination.current_page, search);
            }
        } catch (error) {
            console.error('Error deleting school:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schools" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
                        <p className="text-muted-foreground">
                            Manage your educational institutions
                        </p>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add School
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Schools</CardTitle>
                        <CardDescription>
                            A list of all schools in your system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search schools..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Button type="submit" variant="outline">
                                    Search
                                </Button>
                            </div>
                        </form>

                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
                                ))}
                            </div>
                        ) : schools.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No schools found
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {schools.map((school) => (
                                    <div
                                        key={school.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{school.name}</h3>
                                                {school.code && (
                                                    <Badge variant="secondary">{school.code}</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {school.email && `${school.email} • `}
                                                {school.phone_number && `${school.phone_number} • `}
                                                {school.branches_count || 0} branches
                                            </p>
                                            {school.address && (
                                                <p className="text-sm text-muted-foreground">
                                                    {school.address}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(school.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {pagination.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to{' '}
                                    {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{' '}
                                    {pagination.total} results
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pagination.current_page - 1)}
                                        disabled={pagination.current_page === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pagination.current_page + 1)}
                                        disabled={pagination.current_page === pagination.last_page}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
