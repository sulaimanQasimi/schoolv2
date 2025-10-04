import React from 'react';
import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Plus, School, Building2, Users } from 'lucide-react';

const NotificationTest: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Notification System</CardTitle>
        <CardDescription>
          Create, update, or delete resources to see notifications in action
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/schools/create">
            <Button variant="outline" className="w-full justify-start">
              <School className="mr-2 h-4 w-4" />
              Create School
            </Button>
          </Link>
          <Link href="/branches/create">
            <Button variant="outline" className="w-full justify-start">
              <Building2 className="mr-2 h-4 w-4" />
              Create Branch
            </Button>
          </Link>
          <Link href="/departments/create">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Create Department
            </Button>
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>• Creating a school will fire a "New School Registered" notification</p>
          <p>• Creating a branch will fire a "New Branch Created" notification</p>
          <p>• Creating a department will fire a "New Department Created" notification</p>
          <p>• Updating or deleting resources will also trigger notifications</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationTest;
