import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, ArrowLeft, Building2 } from 'lucide-react';
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
    created_at: string;
    updated_at: string;
}

interface Branch {
    id: number;
    school_id: number;
    name: string;
    code?: string;
    address?: string;
    phone_number?: string;
    created_at: string;
    updated_at: string;
}

interface BranchesResponse {
    data: Branch[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface SchoolShowProps {
    school: School;
}

export default function SchoolShow({ school }: SchoolShowProps) {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
    });

    const fetchBranches = async (page = 1, searchTerm = '') => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                per_page: '15',
                school_id: school.id.toString(),
                ...(searchTerm && { search: searchTerm }),
            });

            const response = await fetch(`/api/branches?${params}`);
            const data: BranchesResponse = await response.json();
            
            setBranches(data.data);
            setPagination({
                current_page: data.current_page,
                last_page: data.last_page,
                per_page: data.per_page,
                total: data.total,
            });
        } catch (error) {
            console.error('Error fetching branches:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, [school.id]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchBranches(1, search);
    };

    const handlePageChange = (page: number) => {
        fetchBranches(page, search);
    };

    const handleDeleteBranch = async (id: number) => {
        if (!confirm('Are you sure you want to delete this branch?')) return;
        
        try {
            const response = await fetch(`/api/branches/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                fetchBranches(pagination.current_page, search);
            }
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    };

    const currentBreadcrumbs = [
        ...breadcrumbs,
        {
            title: school.name,
            href: `/schools/${school.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={currentBreadcrumbs}>
            <Head title={`${school.name} - Branches`} />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/schools">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Schools
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{school.name}</h1>
                            <p className="text-muted-foreground">
                                Manage branches for {school.name}
                            </p>
                        </div>
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Branch
                    </Button>
                </div>

                {/* School Information Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            School Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <p className="text-sm">{school.name}</p>
                            </div>
                            {school.code && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Code</p>
                                    <Badge variant="secondary">{school.code}</Badge>
                                </div>
                            )}
                            {school.email && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm">{school.email}</p>
                                </div>
                            )}
                            {school.phone_number && (
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p className="text-sm">{school.phone_number}</p>
                                </div>
                            )}
                            {school.address && (
                                <div className="md:col-span-2">
                                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                                    <p className="text-sm">{school.address}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Branches Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Branches</CardTitle>
                        <CardDescription>
                            A list of all branches for {school.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Search branches..."
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
                        ) : branches.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No branches found
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {branches.map((branch) => (
                                    <div
                                        key={branch.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{branch.name}</h3>
                                                {branch.code && (
                                                    <Badge variant="secondary">{branch.code}</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {branch.phone_number && `${branch.phone_number} • `}
                                                Created {new Date(branch.created_at).toLocaleDateString()}
                                            </p>
                                            {branch.address && (
                                                <p className="text-sm text-muted-foreground">
                                                    {branch.address}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteBranch(branch.id)}
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
