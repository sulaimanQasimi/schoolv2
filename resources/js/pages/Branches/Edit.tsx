import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Building2, Save, AlertCircle, School } from 'lucide-react';

interface School {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  school_id: number;
  name: string;
  code: string;
  address: string;
  phone_number: string;
}

interface EditBranchProps {
  branch: Branch;
  schools: School[];
}

const EditBranch: React.FC<EditBranchProps> = ({ branch, schools }) => {
  const { data, setData, put, processing, errors } = useForm({
    school_id: branch.school_id.toString(),
    name: branch.name,
    code: branch.code,
    address: branch.address,
    phone_number: branch.phone_number,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/branches/${branch.id}`);
  };

  return (
    <MainLayout>
      <Head title={`Edit ${branch.name}`} />
      
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
              <h1 className="text-3xl font-bold text-foreground">Edit Branch</h1>
              <p className="text-muted-foreground">Update branch information</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Branch Information</span>
              </CardTitle>
              <CardDescription>
                Update the details for {branch.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-6">
                {/* School Selection */}
                <div className="space-y-2">
                  <label htmlFor="school_id" className="text-sm font-medium text-foreground">
                    School *
                  </label>
                  <select
                    id="school_id"
                    value={data.school_id}
                    onChange={(e) => setData('school_id', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    required
                  >
                    <option value="">Select a school</option>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                  {errors.school_id && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.school_id}</span>
                    </div>
                  )}
                </div>

                {/* Branch Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Branch Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter branch name"
                    required
                  />
                  {errors.name && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Branch Code */}
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium text-foreground">
                    Branch Code *
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter unique branch code"
                    required
                  />
                  {errors.code && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.code}</span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-foreground">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter branch address"
                    required
                  />
                  {errors.address && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.address}</span>
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="phone_number" className="text-sm font-medium text-foreground">
                    Phone Number *
                  </label>
                  <input
                    id="phone_number"
                    type="tel"
                    value={data.phone_number}
                    onChange={(e) => setData('phone_number', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter phone number"
                    required
                  />
                  {errors.phone_number && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.phone_number}</span>
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6">
                  <Link href="/branches">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Updating...' : 'Update Branch'}
                    <Save className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditBranch;
