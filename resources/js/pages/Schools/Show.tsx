import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, School, Building2, Mail, Phone, MapPin, Edit, Trash2, Plus } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  phone_number: string;
  created_at: string;
}

interface School {
  id: number;
  name: string;
  code: string;
  address: string;
  email: string;
  phone_number: string;
  branches: Branch[];
  created_at: string;
}

interface ShowSchoolProps {
  school: School;
}

const ShowSchool: React.FC<ShowSchoolProps> = ({ school }) => {
  return (
    <MainLayout>
      <Head title={school.name} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/schools">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Schools
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{school.name}</h1>
              <p className="text-muted-foreground">School Details</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/schools/${school.id}/edit`}>
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
          {/* School Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <School className="h-5 w-5" />
                  <span>School Information</span>
                </CardTitle>
                <CardDescription>
                  Basic details about {school.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">School Name</label>
                    <p className="text-foreground font-medium">{school.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">School Code</label>
                    <p className="text-foreground font-medium">{school.code}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-foreground">{school.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-foreground">{school.phone_number}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <p className="text-foreground">{school.address}</p>
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
                  <span className="text-sm text-muted-foreground">Total Branches</span>
                  <span className="text-2xl font-bold text-foreground">{school.branches.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm text-foreground">
                    {new Date(school.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/branches/create?school_id=${school.id}`} className="w-full">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Branch
                  </Button>
                </Link>
                <Link href={`/schools/${school.id}/edit`} className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit School
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Branches Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Branches ({school.branches.length})</span>
                </CardTitle>
                <CardDescription>
                  All branches associated with {school.name}
                </CardDescription>
              </div>
              <Link href={`/branches/create?school_id=${school.id}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Branch
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {school.branches.length > 0 ? (
              <div className="space-y-4">
                {school.branches.map((branch) => (
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
                        <p className="text-sm text-muted-foreground">{branch.address}</p>
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
            ) : (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No branches yet</h3>
                <p className="text-muted-foreground mb-4">
                  This school doesn't have any branches yet.
                </p>
                <Link href={`/branches/create?school_id=${school.id}`}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Branch
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ShowSchool;
