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

interface Department {
  id: number;
  branch_id: number;
  name: string;
  code: string;
  description: string;
  head_user_id: number | null;
}

interface EditDepartmentProps {
  department: Department;
  branches: Branch[];
  users: User[];
}

const EditDepartment: React.FC<EditDepartmentProps> = ({ department, branches, users }) => {
  const { data, setData, put, processing, errors } = useForm({
    branch_id: department.branch_id.toString(),
    name: department.name,
    code: department.code,
    description: department.description || '',
    head_user_id: department.head_user_id?.toString() || '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/departments/${department.id}`);
  };

  return (
    <MainLayout>
      <Head title={`Edit ${department.name}`} />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title={`Edit ${department.name}`}
          description="Update department information"
          backHref="/departments"
          backLabel="Back to Departments"
          primaryAction={{
            label: 'View Department',
            href: `/departments/${department.id}`,
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
                  description={`Update the details for ${department.name}`}
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
                        <li>• Check branch association</li>
                        <li>• Update staff assignments</li>
                        <li>• Notify stakeholders</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Changing the branch will move this department to a different 
                        branch. Make sure this is the intended action.
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Verify all information</li>
                        <li>• Ensure code uniqueness</li>
                        <li>• Update related documents</li>
                        <li>• Communicate changes</li>
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
              submitLabel="Update Department"
              isLoading={processing}
              loadingLabel="Updating Department..."
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditDepartment;
