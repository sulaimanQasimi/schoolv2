import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { DetailCard, DetailItem } from '../../components/ui/DetailCard';
import ActionCard from '../../components/ui/ActionCard';
import StatsCard from '../../components/ui/StatsCard';
import PageHeader from '../../components/ui/PageHeader';
import { Building2, School, Phone, MapPin, Edit, Trash2, Hash, Calendar } from 'lucide-react';

interface School {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  phone_number: string;
  school: School;
  created_at: string;
}

interface ShowBranchProps {
  branch: Branch;
}

const ShowBranch: React.FC<ShowBranchProps> = ({ branch }) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${branch.name}"? This action cannot be undone.`)) {
      router.delete(`/branches/${branch.id}`, {
        onSuccess: () => {
          // Optionally show success message
        },
        onError: (errors) => {
          console.error('Delete failed:', errors);
          alert('Failed to delete branch. Please try again.');
        }
      });
    }
  };

  return (
    <MainLayout>
      <Head title={branch.name} />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title={branch.name}
          description="Branch Details"
          backHref="/branches"
          backLabel="Back to Branches"
          primaryAction={{
            label: 'Edit Branch',
            href: `/branches/${branch.id}/edit`,
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
          {/* Branch Information */}
          <div className="lg:col-span-2">
            <DetailCard
              title="Branch Information"
              description={`Details about ${branch.name}`}
              icon={Building2}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  label="Branch Name"
                  value={branch.name}
                  icon={Building2}
                />
                <DetailItem
                  label="Branch Code"
                  value={branch.code}
                  icon={Hash}
                />
                <DetailItem
                  label="Phone Number"
                  value={branch.phone_number}
                  icon={Phone}
                />
                <DetailItem
                  label="School"
                  value={
                    <Link 
                      href={`/schools/${branch.school.id}`}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {branch.school.name}
                    </Link>
                  }
                  icon={School}
                />
              </div>
              
              <DetailItem
                label="Address"
                value={branch.address}
                icon={MapPin}
              />
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
                  value: new Date(branch.created_at).toLocaleDateString(),
                  icon: Calendar,
                  description: 'Date added',
                },
                {
                  label: 'School',
                  value: branch.school.name,
                  icon: School,
                  description: 'Parent school',
                },
              ]}
            />

            <ActionCard
              title="Quick Actions"
              description="Common tasks for this branch"
              icon={Building2}
              actions={[
                {
                  label: 'Edit Branch',
                  href: `/branches/${branch.id}/edit`,
                  icon: Edit,
                },
                {
                  label: 'View School',
                  href: `/schools/${branch.school.id}`,
                  icon: School,
                  variant: 'outline',
                },
                {
                  label: 'Delete Branch',
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

export default ShowBranch;
