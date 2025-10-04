import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  School, 
  Building2, 
  Users, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  User,
  ChevronDown,
  Building
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface PageProps {
  auth: {
    user: User;
  };
  flash: {
    success?: string;
    error?: string;
  };
  [key: string]: any;
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, flash } = usePage<PageProps>().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: false },
    { name: 'Schools', href: '/schools', icon: School, current: false },
    { name: 'Branches', href: '/branches', icon: Building2, current: false },
    { name: 'Departments', href: '/departments', icon: Building, current: false },
    { name: 'Users', href: '/users', icon: Users, current: false },
  ];

  const handleLogout = () => {
    // This would typically be handled by a logout route
    window.location.href = '/logout';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <School className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">SchoolHub</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-4 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 transition-colors ${
                  item.current
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar border-r border-sidebar-border px-4 py-4">
          <div className="flex h-16 items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <School className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">SchoolHub</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-foreground lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                
                {notificationDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-80 rounded-lg bg-popover border border-border shadow-lg">
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-popover-foreground mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent">
                          <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-popover-foreground">New school registration</p>
                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent">
                          <div className="h-2 w-2 bg-chart-2 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-popover-foreground">Branch update completed</p>
                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent">
                          <div className="h-2 w-2 bg-chart-3 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-popover-foreground">System maintenance scheduled</p>
                            <p className="text-xs text-muted-foreground">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-x-2 p-2 text-sm font-semibold leading-6 text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="hidden lg:block">{auth.user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-popover border border-border shadow-lg">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-popover-foreground">{auth.user.name}</p>
                        <p className="text-xs text-muted-foreground">{auth.user.email}</p>
                      </div>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-popover-foreground hover:bg-accent"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Flash messages */}
        {flash?.success && (
          <div className="mx-4 mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-800">{flash.success}</p>
          </div>
        )}
        {flash?.error && (
          <div className="mx-4 mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{flash.error}</p>
          </div>
        )}

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
