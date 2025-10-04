import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import NotificationTest from '../components/NotificationTest';
import { 
  School, 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  Bell,
  Settings,
  ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <Head title="Dashboard" />
      
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground">Here's what's happening with your schools today.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">
                +5 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from your schools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-chart-1 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New school registration</p>
                    <p className="text-xs text-muted-foreground">Springfield Elementary School</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-chart-2 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Branch update completed</p>
                    <p className="text-xs text-muted-foreground">Downtown Campus - Lincoln High</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-chart-3 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">User profile updated</p>
                    <p className="text-xs text-muted-foreground">John Doe - Administrator</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <School className="h-6 w-6" />
                  <span>Add School</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Building2 className="h-6 w-6" />
                  <span>Add Branch</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Settings className="h-6 w-6" />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Test */}
        <NotificationTest />

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Important updates and alerts
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-chart-1 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">System Maintenance</h4>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance will occur on Sunday, 2:00 AM - 4:00 AM
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-chart-2 flex items-center justify-center">
                  <School className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">New School Registration</h4>
                  <p className="text-sm text-muted-foreground">
                    Springfield Elementary School has been successfully registered
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
