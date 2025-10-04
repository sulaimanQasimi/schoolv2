import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { DetailCard, DetailItem } from '../../components/ui/DetailCard';
import ActionCard from '../../components/ui/ActionCard';
import StatsCard from '../../components/ui/StatsCard';
import PageHeader from '../../components/ui/PageHeader';
import { School, Building2, Mail, Phone, MapPin, Edit, Trash2, Plus, Users, Calendar, Hash } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/translate';

interface Branch {
  id: number;
  name: string;
  code: string;
  address: string;
  phone_number: string;
  created_at: string;
}

interface School {
  id: number;
  name: string;
  code: string;
  address: string;
  email: string;
  phone_number: string;
  branches: Branch[];
  created_at: string;
}

interface ShowSchoolProps {
  school: School;
}

const ShowSchool: React.FC<ShowSchoolProps> = ({ school }) => {
  const { t } = useTranslation();
  const handleDelete = () => {
    if (confirm(t('schools.delete_confirm_detailed', { name: school.name }))) {
      router.delete(`/schools/${school.id}`, {
        onSuccess: () => {
          // Optionally show success message
        },
        onError: (errors) => {
          console.error('Delete failed:', errors);
          alert(t('schools.delete_failed'));
        }
      });
    }
  };

  return (
    <MainLayout>
      <Head title={school.name} />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title={school.name}
          description={t('schools.details')}
          backHref="/schools"
          backLabel={t('schools.back_to_schools')}
          primaryAction={{
            label: t('schools.edit'),
            href: `/schools/${school.id}/edit`,
            icon: Edit,
          }}
          secondaryActions={[
            {
              label: t('common.delete'),
              href: '#',
              icon: Trash2,
              variant: 'destructive',
              onClick: handleDelete,
            },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* School Information */}
          <div className="lg:col-span-2">
            <DetailCard
              title={t('schools.information')}
              description={t('schools.basic_details', { name: school.name })}
              icon={School}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  label={t('schools.name')}
                  value={school.name}
                  icon={Building2}
                />
                <DetailItem
                  label={t('schools.code')}
                  value={school.code}
                  icon={Hash}
                />
                <DetailItem
                  label={t('schools.email')}
                  value={school.email}
                  icon={Mail}
                />
                <DetailItem
                  label={t('schools.phone')}
                  value={school.phone_number}
                  icon={Phone}
                />
              </div>
              
              <DetailItem
                label={t('schools.address')}
                value={school.address}
                icon={MapPin}
              />
            </DetailCard>
          </div>

          {/* Stats and Actions */}
          <div className="space-y-6">
            <StatsCard
              title={t('schools.statistics')}
              icon={Users}
              stats={[
                {
                  label: t('schools.total_branches'),
                  value: school.branches.length,
                  icon: Building2,
                  description: t('schools.active_branches'),
                },
                {
                  label: t('schools.created'),
                  value: new Date(school.created_at).toLocaleDateString(),
                  icon: Calendar,
                  description: t('schools.date_added'),
                },
              ]}
            />

            <ActionCard
              title={t('schools.quick_actions')}
              description={t('schools.quick_actions_school_description')}
              icon={Users}
              actions={[
                {
                  label: t('schools.add_branch'),
                  href: `/branches/create?school_id=${school.id}`,
                  icon: Plus,
                },
                {
                  label: t('schools.edit'),
                  href: `/schools/${school.id}/edit`,
                  icon: Edit,
                  variant: 'outline',
                },
                {
                  label: t('schools.delete_school'),
                  onClick: handleDelete,
                  icon: Trash2,
                  variant: 'destructive',
                },
              ]}
            />
          </div>
        </div>

        {/* Branches Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>{t('schools.branches')} ({school.branches.length})</span>
                </CardTitle>
                <CardDescription>
                  {t('schools.branches_description', { name: school.name })}
                </CardDescription>
              </div>
              <Link href={`/branches/create?school_id=${school.id}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t('schools.add_branch')}
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {school.branches.length > 0 ? (
              <div className="space-y-4">
                {school.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-chart-2 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{branch.name}</h3>
                        <p className="text-sm text-muted-foreground">{branch.code}</p>
                        <p className="text-sm text-muted-foreground">{branch.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/branches/${branch.id}`}>
                        <Button variant="outline" size="sm">
                          {t('common.view')}
                        </Button>
                      </Link>
                      <Link href={`/branches/${branch.id}/edit`}>
                        <Button variant="outline" size="sm">
                          {t('common.edit')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t('schools.no_branches_yet')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('schools.no_branches_description')}
                </p>
                <Link href={`/branches/create?school_id=${school.id}`}>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('schools.add_first_branch')}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ShowSchool;
