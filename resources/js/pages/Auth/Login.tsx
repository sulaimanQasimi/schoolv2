import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { School, Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, Shield, Zap } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Head title="Sign In" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <School className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">SchoolHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Form */}
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  Welcome back to
                  <span className="text-primary"> SchoolHub</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Sign in to continue managing your schools
                </p>
              </div>

                {/* Login Form */}
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={submit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          id="email"
                          type="email"
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={data.password}
                          onChange={(e) => setData('password', e.target.value)}
                          className="w-full pl-10 pr-10 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.password}</span>
                        </div>
                      )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember"
                          type="checkbox"
                          checked={data.remember}
                          onChange={(e) => setData('remember', e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-foreground">
                          Remember me
                        </label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:text-primary/80"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full"
                      size="lg"
                    >
                      {processing ? 'Signing in...' : 'Sign In'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* General Errors */}
                    {errors && Object.keys(errors).length > 0 && !errors.email && !errors.password && (
                      <div className="flex items-center space-x-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>Invalid credentials. Please try again.</span>
                      </div>
                    )}
                  </form>

                  {/* Sign Up Link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link
                        href="/register"
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        Sign up for free
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Features */}
            <div className="hidden lg:block">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Why Choose SchoolHub?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Join thousands of schools already using our platform
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Enterprise Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Your data is protected with enterprise-grade security measures
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-chart-2 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Real-time Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay connected with instant notifications and live data sync
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-chart-3 flex items-center justify-center">
                      <School className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Comprehensive Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage schools, branches, and users from one central platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our{' '}
              <Link href="#" className="text-primary hover:text-primary/80">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
