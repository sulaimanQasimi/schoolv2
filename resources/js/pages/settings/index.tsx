import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { User, Shield, Bell, Palette, Database, Key } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsSections = [
    {
      title: 'Profile',
      description: 'Manage your personal information and account details',
      icon: User,
      href: '/settings/profile',
      color: 'bg-blue-500',
    },
    {
      title: 'Security',
      description: 'Password, two-factor authentication, and security settings',
      icon: Shield,
      href: '/settings/security',
      color: 'bg-green-500',
    },
    {
      title: 'Notifications',
      description: 'Email notifications, alerts, and communication preferences',
      icon: Bell,
      href: '/settings/notifications',
      color: 'bg-yellow-500',
    },
    {
      title: 'Appearance',
      description: 'Theme, language, and display preferences',
      icon: Palette,
      href: '/settings/appearance',
      color: 'bg-purple-500',
    },
    {
      title: 'Data & Privacy',
      description: 'Data export, privacy settings, and account deletion',
      icon: Database,
      href: '/settings/privacy',
      color: 'bg-red-500',
    },
    {
      title: 'API Keys',
      description: 'Manage API keys and integrations',
      icon: Key,
      href: '/settings/api',
      color: 'bg-gray-500',
    },
  ];

  return (
    <MainLayout>
      <Head title="Settings" />
      
      <div className="space-y-8">
        {/* Header */}
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
        />

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <Link key={index} href={section.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${section.color}`}>
                        <SectionIcon className="h-5 w-5 text-white" />
                      </div>
                      <span>{section.title}</span>
                    </CardTitle>
                    <CardDescription>
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common settings tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/settings/profile">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
              <Link href="/settings/security">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </Link>
              <Link href="/settings/notifications">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
