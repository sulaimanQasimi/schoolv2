import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, School, Save, AlertCircle } from 'lucide-react';

interface School {
  id: number;
  name: string;
  code: string;
  address: string;
  email: string;
  phone_number: string;
}

interface EditSchoolProps {
  school: School;
}

const EditSchool: React.FC<EditSchoolProps> = ({ school }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: school.name,
    code: school.code,
    address: school.address,
    email: school.email,
    phone_number: school.phone_number,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/schools/${school.id}`);
  };

  return (
    <MainLayout>
      <Head title={`Edit ${school.name}`} />
      
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
              <h1 className="text-3xl font-bold text-foreground">Edit School</h1>
              <p className="text-muted-foreground">Update school information</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5" />
                <span>School Information</span>
              </CardTitle>
              <CardDescription>
                Update the details for {school.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-6">
                {/* School Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    School Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter school name"
                    required
                  />
                  {errors.name && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* School Code */}
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium text-foreground">
                    School Code *
                  </label>
                  <input
                    id="code"
                    type="text"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter unique school code"
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
                    placeholder="Enter school address"
                    required
                  />
                  {errors.address && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.address}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter school email"
                    required
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.email}</span>
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
                  <Link href="/schools">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={processing}>
                    {processing ? 'Updating...' : 'Update School'}
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

export default EditSchool;
