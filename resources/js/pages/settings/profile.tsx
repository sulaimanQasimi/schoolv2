import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import FormSection from '../../components/ui/FormSection';
import FormActions from '../../components/ui/FormActions';
import PageHeader from '../../components/ui/PageHeader';
import { User, Mail, Phone, MapPin, Save, AlertCircle } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface ProfileProps {
  auth: {
    user: User;
  };
  mustVerifyEmail: boolean;
  status?: string;
}

const Profile: React.FC<ProfileProps> = ({ auth, mustVerifyEmail, status }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: auth.user.name,
    email: auth.user.email,
    phone: auth.user.phone || '',
    address: auth.user.address || '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put('/settings/profile');
  };

  return (
    <MainLayout>
      <Head title="Profile Settings" />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Profile Settings"
          description="Manage your personal information and account settings"
        />

        {/* Status Messages */}
        {status && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-800">{status}</p>
          </div>
        )}

        {/* Email Verification Notice */}
        {mustVerifyEmail && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Your email address is unverified. Please check your email for a verification link.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="max-w-2xl">
          <form onSubmit={submit}>
            <FormSection
              title="Personal Information"
              description="Update your personal details"
              icon={User}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={(value) => setData('name', value)}
                  placeholder="Enter your full name"
                  required
                  error={errors.name}
                  icon={User}
                  helpText="Your display name across the platform"
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(value) => setData('email', value)}
                  placeholder="Enter your email"
                  required
                  error={errors.email}
                  icon={Mail}
                  helpText="Used for login and notifications"
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(value) => setData('phone', value)}
                  placeholder="Enter your phone number"
                  error={errors.phone}
                  icon={Phone}
                  helpText="Optional contact number"
                />

                <FormField
                  label="Address"
                  name="address"
                  type="textarea"
                  value={data.address}
                  onChange={(value) => setData('address', value)}
                  placeholder="Enter your address"
                  error={errors.address}
                  icon={MapPin}
                  helpText="Optional physical address"
                  rows={3}
                />
              </div>
            </FormSection>

            {/* Form Actions */}
            <FormActions
              cancelHref="/dashboard"
              cancelLabel="Cancel"
              submitLabel="Update Profile"
              isLoading={processing}
              loadingLabel="Updating Profile..."
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
