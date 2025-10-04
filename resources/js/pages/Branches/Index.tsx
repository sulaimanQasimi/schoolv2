import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Building2, School, MapPin, Phone } from 'lucide-react';

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

interface BranchesIndexProps {
  branches: {
    data: Branch[];
    links: any[];
    meta: any;
  };
}

const BranchesIndex: React.FC<BranchesIndexProps> = ({ branches }) => {
  return (
    <MainLayout>
      <Head title="Branches" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Branches</h1>
            <p className="text-muted-foreground">Manage school branch locations</p>
          </div>
          <Link href="/branches/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branches.data.length}</div>
              <p className="text-xs text-muted-foreground">
                +5 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(branches.data.map(branch => branch.school.id)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                With active branches
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(branches.data.map(branch => branch.address.split(',')[0])).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Different cities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Branches Table */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Directory</CardTitle>
            <CardDescription>
              A list of all branches across your schools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branches.data.map((branch) => (
                <div
                  key={branch.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-chart-2 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{branch.name}</h3>
                      <p className="text-sm text-muted-foreground">{branch.code}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <School className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{branch.school.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{branch.address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{branch.phone_number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/branches/${branch.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/branches/${branch.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BranchesIndex;
