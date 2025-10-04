import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { useTranslation } from '@/lib/i18n/translate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LanguageTest() {
  const { t, currentLanguage, direction, isRtl } = useTranslation();

  return (
    <MainLayout>
      <Head title="Language Test" />

      <div className="container py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">{t('languages.title')}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('languages.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p><strong>{t('languages.name')}:</strong> {currentLanguage.name}</p>
              <p><strong>{t('languages.code')}:</strong> {currentLanguage.code}</p>
              <p><strong>{t('languages.direction')}:</strong> {direction} (isRtl: {isRtl ? 'true' : 'false'})</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">{t('common.actions')}</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">{t('common.save')}</Button>
                <Button size="sm" variant="outline">{t('common.cancel')}</Button>
                <Button size="sm" variant="destructive">{t('common.delete')}</Button>
                <Button size="sm" variant="secondary">{t('common.edit')}</Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">{t('schools.title')}</h3>
              <p>{t('schools.create_success')}</p>
              <p>{t('schools.update_success')}</p>
              <p>{t('schools.delete_success')}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">{t('users.title')}</h3>
              <p>{t('users.create_success')}</p>
              <p>{t('users.update_success')}</p>
              <p>{t('users.delete_success')}</p>
            </div>

            <div className="border-t pt-4 text-center">
              <p className={`text-lg ${isRtl ? 'font-bold' : ''}`}>
                {t('app.switch_language')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
