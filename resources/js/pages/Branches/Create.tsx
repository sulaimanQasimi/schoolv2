import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import FormSection from '../../components/ui/FormSection';
import FormField from '../../components/ui/FormField';
import FormActions from '../../components/ui/FormActions';
import PageHeader from '../../components/ui/PageHeader';
import { Building2, School, Phone, MapPin, Hash, Users, CheckCircle } from 'lucide-react';

interface School {
  id: number;
  name: string;
}

interface CreateBranchProps {
  schools: School[];
}

const CreateBranch: React.FC<CreateBranchProps> = ({ schools }) => {
  const { data, setData, post, processing, errors } = useForm({
    school_id: '',
    name: '',
    code: '',
    address: '',
    phone_number: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/branches');
  };

  return (
    <MainLayout>
      <Head title="Create Branch" />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Create New Branch"
          description="Add a new branch to a school"
          backHref="/branches"
          backLabel="Back to Branches"
          primaryAction={{
            label: 'View All Branches',
            href: '/branches',
            icon: Building2,
          }}
        />

        {/* Form */}
        <div className="max-w-4xl">
          <form onSubmit={submit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Section */}
              <div className="lg:col-span-2">
                <FormSection
                  title="Branch Information"
                  description="Enter the details for the new branch"
                  icon={Building2}
                >
                  <div className="space-y-6">
                    <FormField
                      label="School"
                      name="school_id"
                      type="select"
                      value={data.school_id}
                      onChange={(value) => setData('school_id', value)}
                      placeholder="Select a school"
                      required
                      error={errors.school_id}
                      icon={School}
                      helpText="Choose the school this branch belongs to"
                      options={schools.map(school => ({
                        value: school.id.toString(),
                        label: school.name,
                      }))}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Branch Name"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={(value) => setData('name', value)}
                        placeholder="Enter branch name"
                        required
                        error={errors.name}
                        icon={Building2}
                        helpText="The name of this branch location"
                      />

                      <FormField
                        label="Branch Code"
                        name="code"
                        type="text"
                        value={data.code}
                        onChange={(value) => setData('code', value)}
                        placeholder="Enter unique branch code"
                        required
                        error={errors.code}
                        icon={Hash}
                        helpText="A unique identifier for this branch"
                      />
                    </div>

                    <FormField
                      label="Address"
                      name="address"
                      type="textarea"
                      value={data.address}
                      onChange={(value) => setData('address', value)}
                      placeholder="Enter complete branch address"
                      required
                      error={errors.address}
                      icon={MapPin}
                      helpText="Complete physical address of the branch"
                      rows={4}
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
                      helpText="Primary contact phone number for this branch"
                    />
                  </div>
                </FormSection>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <FormSection
                  title="Quick Actions"
                  description="Common tasks after creating a branch"
                  className="sticky top-6"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Next Steps
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Assign branch manager</li>
                        <li>• Set up classrooms</li>
                        <li>• Configure schedules</li>
                        <li>• Add staff members</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Branch codes should be unique within the school. 
                        Consider using location-based codes like "MAIN", "NORTH", etc.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">School Info</h4>
                      <p className="text-sm text-muted-foreground">
                        This branch will be associated with the selected school and 
                        will inherit some of its settings and configurations.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use descriptive location names</li>
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
              cancelHref="/branches"
              cancelLabel="Cancel"
              submitLabel="Create Branch"
              isLoading={processing}
              loadingLabel="Creating Branch..."
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateBranch;

