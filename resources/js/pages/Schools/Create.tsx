import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import FormSection from '../../components/ui/FormSection';
import FormField from '../../components/ui/FormField';
import FormActions from '../../components/ui/FormActions';
import PageHeader from '../../components/ui/PageHeader';
import { School, Building2, Mail, Phone, MapPin, Hash, Users, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/translate';

const CreateSchool: React.FC = () => {
  const { t } = useTranslation();
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
      <Head title={t('schools.create')} />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title={t('schools.create')}
          description={t('schools.create_description')}
          backHref="/schools"
          backLabel={t('schools.back_to_schools')}
          primaryAction={{
            label: t('schools.view_all'),
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
                  title={t('schools.information')}
                  description={t('schools.information_description')}
                  icon={School}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label={t('schools.name')}
                      name="name"
                      type="text"
                      value={data.name}
                      onChange={(value) => setData('name', value)}
                      placeholder={t('schools.name_placeholder')}
                      required
                      error={errors.name}
                      icon={Building2}
                      helpText={t('schools.name_help')}
                    />

                    <FormField
                      label={t('schools.code')}
                      name="code"
                      type="text"
                      value={data.code}
                      onChange={(value) => setData('code', value)}
                      placeholder={t('schools.code_placeholder')}
                      required
                      error={errors.code}
                      icon={Hash}
                      helpText={t('schools.code_help')}
                    />

                    <FormField
                      label={t('schools.email')}
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={(value) => setData('email', value)}
                      placeholder={t('schools.email_placeholder')}
                      required
                      error={errors.email}
                      icon={Mail}
                      helpText={t('schools.email_help')}
                    />

                    <FormField
                      label={t('schools.phone')}
                      name="phone_number"
                      type="tel"
                      value={data.phone_number}
                      onChange={(value) => setData('phone_number', value)}
                      placeholder={t('schools.phone_placeholder')}
                      required
                      error={errors.phone_number}
                      icon={Phone}
                      helpText={t('schools.phone_help')}
                    />
                  </div>

                  <FormField
                    label={t('schools.address')}
                    name="address"
                    type="textarea"
                    value={data.address}
                    onChange={(value) => setData('address', value)}
                    placeholder={t('schools.address_placeholder')}
                    required
                    error={errors.address}
                    icon={MapPin}
                    helpText={t('schools.address_help')}
                    rows={4}
                  />
                </FormSection>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <FormSection
                  title={t('schools.quick_actions')}
                  description={t('schools.quick_actions_description')}
                  className="sticky top-6"
                >
                  <div className="space-y-4">
                    <div className="p-4 bg-accent rounded-lg">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {t('schools.next_steps')}
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• {t('schools.add_branches')}</li>
                        <li>• {t('schools.setup_users')}</li>
                        <li>• {t('schools.configure_settings')}</li>
                        <li>• {t('schools.upload_logo')}</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">{t('schools.tips')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('schools.tips_description')}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">{t('schools.best_practices')}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• {t('schools.use_clear_names')}</li>
                        <li>• {t('schools.keep_codes_short')}</li>
                        <li>• {t('schools.verify_contact')}</li>
                        <li>• {t('schools.include_addresses')}</li>
                      </ul>
                    </div>
                  </div>
                </FormSection>
              </div>
            </div>

            {/* Form Actions */}
            <FormActions
              cancelHref="/schools"
              cancelLabel={t('common.cancel')}
              submitLabel={t('schools.create')}
              isLoading={processing}
              loadingLabel={t('schools.creating')}
              disabled={processing}
            />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateSchool;
