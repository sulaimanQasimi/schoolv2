import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Building2, School, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';

interface School {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  phone_number: string;
  school: School;
  created_at: string;
}

interface ShowBranchProps {
  branch: Branch;
}

const ShowBranch: React.FC<ShowBranchProps> = ({ branch }) => {
  return (
    <MainLayout>
      <Head title={branch.name} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/branches">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Branches
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{branch.name}</h1>
              <p className="text-muted-foreground">Branch Details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/branches/${branch.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Branch Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Branch Information</span>
                </CardTitle>
                <CardDescription>
                  Details about {branch.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Branch Name</label>
                    <p className="text-foreground font-medium">{branch.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Branch Code</label>
                    <p className="text-foreground font-medium">{branch.code}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-foreground">{branch.phone_number}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">School</label>
                    <div className="flex items-center space-x-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <Link 
                        href={`/schools/${branch.school.id}`}
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        {branch.school.name}
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <p className="text-foreground">{branch.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Actions */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm text-foreground">
                    {new Date(branch.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">School</span>
                  <span className="text-sm text-foreground">{branch.school.name}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/branches/${branch.id}/edit`} className="w-full">
                  <Button className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Branch
                  </Button>
                </Link>
                <Link href={`/schools/${branch.school.id}`} className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <School className="mr-2 h-4 w-4" />
                    View School
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShowBranch;
