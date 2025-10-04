import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import FormSection from '../../components/ui/FormSection';
import FormField from '../../components/ui/FormField';
import FormActions from '../../components/ui/FormActions';
import PageHeader from '../../components/ui/PageHeader';
import { Building2, Users, Hash, FileText, User, CheckCircle } from 'lucide-react';

interface Branch {
  id: number;
  name: string;
  school: {
    id: number;
    name: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateDepartmentProps {
  branches: Branch[];
  users: User[];
}

const CreateDepartment: React.FC<CreateDepartmentProps> = ({ branches, users }) => {
  const { data, setData, post, processing, errors } = useForm({
    branch_id: '',
    name: '',
    code: '',
    description: '',
    head_user_id: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/departments');
  };

  return (
    <MainLayout>
      <Head title="Create Department" />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Create New Department"
          description="Add a new department to a branch"
          backHref="/departments"
          backLabel="Back to Departments"
          primaryAction={{
            label: 'View All Departments',
            href: '/departments',
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
                  title="Department Information"
                  description="Enter the details for the new department"
                  icon={Building2}
                >
                  <div className="space-y-6">
                    <FormField
                      label="Branch"
                      name="branch_id"
                      type="select"
                      value={data.branch_id}
                      onChange={(value) => setData('branch_id', value)}
                      placeholder="Select a branch"
                      required
                      error={errors.branch_id}
                      icon={Users}
                      helpText="Choose the branch this department belongs to"
                      options={branches.map(branch => ({
                        value: branch.id.toString(),
                        label: `${branch.name} (${branch.school.name})`,
                      }))}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Department Name"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={(value) => setData('name', value)}
                        placeholder="Enter department name"
                        required
                        error={errors.name}
                        icon={Building2}
                        helpText="The name of this department"
                      />

                      <FormField
                        label="Department Code"
                        name="code"
                        type="text"
                        value={data.code}
                        onChange={(value) => setData('code', value)}
                        placeholder="Enter unique department code"
                        required
                        error={errors.code}
                        icon={Hash}
                        helpText="A unique identifier for this department"
                      />
                    </div>

                    <FormField
                      label="Description"
                      name="description"
                      type="textarea"
                      value={data.description}
                      onChange={(value) => setData('description', value)}
                      placeholder="Enter department description"
                      error={errors.description}
                      icon={FileText}
                      helpText="Optional description of the department's purpose and responsibilities"
                      rows={4}
                    />

                    <FormField
                      label="Department Head"
                      name="head_user_id"
                      type="select"
                      value={data.head_user_id}
                      onChange={(value) => setData('head_user_id', value)}
                      placeholder="Select department head (optional)"
                      error={errors.head_user_id}
                      icon={User}
                      helpText="Choose a user to be the head of this department"
                      options={[
                        { value: '', label: 'No head assigned' },
                        ...users.map(user => ({
                          value: user.id.toString(),
                          label: `${user.name} (${user.email})`,
                        }))
                      ]}
                    />
                  </div>
                </FormSection>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <FormSection
                  title="Quick Actions"
                  description="Common tasks after creating a department"
                  className="sticky top-6"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Next Steps
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Assign department staff</li>
                        <li>• Set up department goals</li>
                        <li>• Configure permissions</li>
                        <li>• Create department policies</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Department codes should be unique across the organization. 
                        Consider using descriptive codes like "HR", "IT", "FIN", etc.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use clear, descriptive names</li>
                        <li>• Keep codes short and memorable</li>
                        <li>• Assign appropriate department head</li>
                        <li>• Include detailed descriptions</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Branch Info</h4>
                      <p className="text-sm text-muted-foreground">
                        This department will be associated with the selected branch and 
                        will inherit some of its settings and configurations.
                      </p>
                    </div>
                  </div>
                </FormSection>
              </div>
            </div>

            {/* Form Actions */}
            <FormActions
              cancelHref="/departments"
              cancelLabel="Cancel"
              submitLabel="Create Department"
              isLoading={processing}
              loadingLabel="Creating Department..."
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateDepartment;
