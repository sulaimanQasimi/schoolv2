import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import FormSection from '../../components/ui/FormSection';
import FormField from '../../components/ui/FormField';
import FormActions from '../../components/ui/FormActions';
import PageHeader from '../../components/ui/PageHeader';
import { School, Building2, Mail, Phone, MapPin, Hash, Users, CheckCircle } from 'lucide-react';

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
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title={`Edit ${school.name}`}
          description="Update school information"
          backHref="/schools"
          backLabel="Back to Schools"
          primaryAction={{
            label: 'View School',
            href: `/schools/${school.id}`,
            icon: School,
          }}
        />

        {/* Form */}
        <div className="max-w-4xl">
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Section */}
              <div className="lg:col-span-2">
                <FormSection
                  title="School Information"
                  description={`Update the details for ${school.name}`}
                  icon={School}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="School Name"
                      name="name"
                      type="text"
                      value={data.name}
                      onChange={(value) => setData('name', value)}
                      placeholder="Enter school name"
                      required
                      error={errors.name}
                      icon={Building2}
                      helpText="The official name of the school"
                    />

                    <FormField
                      label="School Code"
                      name="code"
                      type="text"
                      value={data.code}
                      onChange={(value) => setData('code', value)}
                      placeholder="Enter unique school code"
                      required
                      error={errors.code}
                      icon={Hash}
                      helpText="A unique identifier for the school"
                    />

                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={(value) => setData('email', value)}
                      placeholder="Enter school email"
                      required
                      error={errors.email}
                      icon={Mail}
                      helpText="Primary contact email for the school"
                    />

                    <FormField
                      label="Phone Number"
                      name="phone_number"
                      type="tel"
                      value={data.phone_number}
                      onChange={(value) => setData('phone_number', value)}
                      placeholder="Enter phone number"
                      required
                      error={errors.phone_number}
                      icon={Phone}
                      helpText="Primary contact phone number"
                    />
                  </div>

                  <FormField
                    label="Address"
                    name="address"
                    type="textarea"
                    value={data.address}
                    onChange={(value) => setData('address', value)}
                    placeholder="Enter complete school address"
                    required
                    error={errors.address}
                    icon={MapPin}
                    helpText="Complete physical address of the school"
                    rows={4}
                  />
                </FormSection>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <FormSection
                  title="Quick Actions"
                  description="Common tasks after updating"
                  className="sticky top-6"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Next Steps
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Review updated information</li>
                        <li>• Check branch associations</li>
                        <li>• Update user permissions</li>
                        <li>• Notify stakeholders</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Changes to school information will be reflected across all 
                        associated branches and user accounts.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Verify all contact information</li>
                        <li>• Ensure code uniqueness</li>
                        <li>• Update related documents</li>
                        <li>• Communicate changes</li>
                      </ul>
                    </div>
                  </div>
                </FormSection>
              </div>
            </div>

            {/* Form Actions */}
            <FormActions
              cancelHref="/schools"
              cancelLabel="Cancel"
              submitLabel="Update School"
              isLoading={processing}
              loadingLabel="Updating School..."
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditSchool;
