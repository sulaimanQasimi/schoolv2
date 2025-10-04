import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { DetailCard, DetailItem } from '../../components/ui/DetailCard';
import ActionCard from '../../components/ui/ActionCard';
import StatsCard from '../../components/ui/StatsCard';
import PageHeader from '../../components/ui/PageHeader';
import { Building2, Users, Hash, FileText, User, Edit, Trash2, Calendar, School } from 'lucide-react';

interface School {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
  school: School;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  branch: Branch;
  head: User | null;
  created_at: string;
}

interface ShowDepartmentProps {
  department: Department;
}

const ShowDepartment: React.FC<ShowDepartmentProps> = ({ department }) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${department.name}"? This action cannot be undone.`)) {
      router.delete(`/departments/${department.id}`, {
        onSuccess: () => {
          // Optionally show success message
        },
        onError: (errors) => {
          console.error('Delete failed:', errors);
          alert('Failed to delete department. Please try again.');
        }
      });
    }
  };

  return (
    <MainLayout>
      <Head title={department.name} />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title={department.name}
          description="Department Details"
          backHref="/departments"
          backLabel="Back to Departments"
          primaryAction={{
            label: 'Edit Department',
            href: `/departments/${department.id}/edit`,
            icon: Edit,
          }}
          secondaryActions={[
            {
              label: 'Delete',
              href: '#',
              icon: Trash2,
              variant: 'destructive',
              onClick: handleDelete,
            },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Department Information */}
          <div className="lg:col-span-2">
            <DetailCard
              title="Department Information"
              description={`Details about ${department.name}`}
              icon={Building2}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  label="Department Name"
                  value={department.name}
                  icon={Building2}
                />
                <DetailItem
                  label="Department Code"
                  value={department.code}
                  icon={Hash}
                />
                <DetailItem
                  label="Branch"
                  value={
                    <Link 
                      href={`/branches/${department.branch.id}`}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {department.branch.name}
                    </Link>
                  }
                  icon={Users}
                />
                <DetailItem
                  label="School"
                  value={
                    <Link 
                      href={`/schools/${department.branch.school.id}`}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {department.branch.school.name}
                    </Link>
                  }
                  icon={School}
                />
                <DetailItem
                  label="Department Head"
                  value={department.head ? department.head.name : 'Not assigned'}
                  icon={User}
                />
              </div>
              
              {department.description && (
                <DetailItem
                  label="Description"
                  value={department.description}
                  icon={FileText}
                />
              )}
            </DetailCard>
          </div>

          {/* Stats and Actions */}
          <div className="space-y-6">
            <StatsCard
              title="Statistics"
              icon={Building2}
              stats={[
                {
                  label: 'Created',
                  value: new Date(department.created_at).toLocaleDateString(),
                  icon: Calendar,
                  description: 'Date added',
                },
                {
                  label: 'Branch',
                  value: department.branch.name,
                  icon: Users,
                  description: 'Parent branch',
                },
                {
                  label: 'School',
                  value: department.branch.school.name,
                  icon: School,
                  description: 'Parent school',
                },
              ]}
            />

            <ActionCard
              title="Quick Actions"
              description="Common tasks for this department"
              icon={Building2}
              actions={[
                {
                  label: 'Edit Department',
                  href: `/departments/${department.id}/edit`,
                  icon: Edit,
                },
                {
                  label: 'View Branch',
                  href: `/branches/${department.branch.id}`,
                  icon: Users,
                  variant: 'outline',
                },
                {
                  label: 'View School',
                  href: `/schools/${department.branch.school.id}`,
                  icon: School,
                  variant: 'outline',
                },
                {
                  label: 'Delete Department',
                  onClick: handleDelete,
                  icon: Trash2,
                  variant: 'destructive',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShowDepartment;
