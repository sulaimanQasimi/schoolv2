import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import FormSection from '../../components/ui/FormSection';
import FormField from '../../components/ui/FormField';
import FormActions from '../../components/ui/FormActions';
import PageHeader from '../../components/ui/PageHeader';
import { School, Building2, Mail, Phone, MapPin, Hash, Users, CheckCircle } from 'lucide-react';

const CreateSchool: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    code: '',
    address: '',
    email: '',
    phone_number: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/schools');
  };

  return (
    <MainLayout>
      <Head title="Create School" />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Create New School"
          description="Add a new school to your system"
          backHref="/schools"
          backLabel="Back to Schools"
          primaryAction={{
            label: 'View All Schools',
            href: '/schools',
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
                  description="Enter the basic details for the new school"
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
                  description="Common tasks after creating a school"
                  className="sticky top-6"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Next Steps
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Add school branches</li>
                        <li>• Set up user accounts</li>
                        <li>• Configure settings</li>
                        <li>• Upload school logo</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Make sure the school code is unique and easy to remember. 
                        You can always edit these details later.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use clear, descriptive names</li>
                        <li>• Keep codes short and memorable</li>
                        <li>• Verify contact information</li>
                        <li>• Include complete addresses</li>
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
              submitLabel="Create School"
              isLoading={processing}
              loadingLabel="Creating School..."
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateSchool;
