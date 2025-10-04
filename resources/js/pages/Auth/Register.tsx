import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { School, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight, Shield, Zap, Building2 } from 'lucide-react';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/register');
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: data.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(data.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(data.password) },
    { text: 'Contains number', met: /\d/.test(data.password) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Head title="Create Account" />
      
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
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
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
                  Join
                  <span className="text-primary"> SchoolHub</span>
                  <br />
                  Today
                </h1>
                <p className="text-xl text-muted-foreground">
                  Start managing your schools with our comprehensive platform
                </p>
              </div>

              {/* Registration Form */}
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={submit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          id="name"
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

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
                          placeholder="Create a strong password"
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
                      
                      {/* Password Requirements */}
                      {data.password && (
                        <div className="space-y-1">
                          {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                              {req.met ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                              )}
                              <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {errors.password && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.password}</span>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="password_confirmation" className="text-sm font-medium text-foreground">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          id="password_confirmation"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={data.password_confirmation}
                          onChange={(e) => setData('password_confirmation', e.target.value)}
                          className="w-full pl-10 pr-10 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {data.password_confirmation && data.password !== data.password_confirmation && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>Passwords do not match</span>
                        </div>
                      )}
                      {errors.password_confirmation && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.password_confirmation}</span>
                        </div>
                      )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={data.terms}
                          onChange={(e) => setData('terms', e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary border-input rounded mt-1"
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-foreground">
                          I agree to the{' '}
                          <Link href="#" className="text-primary hover:text-primary/80">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="#" className="text-primary hover:text-primary/80">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                      {errors.terms && (
                        <div className="flex items-center space-x-2 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          <span>You must agree to the terms and conditions</span>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={processing || !data.terms || data.password !== data.password_confirmation}
                      className="w-full"
                      size="lg"
                    >
                      {processing ? 'Creating account...' : 'Create Account'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {/* General Errors */}
                    {errors && Object.keys(errors).length > 0 && !errors.name && !errors.email && !errors.password && !errors.password_confirmation && !errors.terms && (
                      <div className="flex items-center space-x-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>Please check your information and try again.</span>
                      </div>
                    )}
                  </form>

                  {/* Sign In Link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Link
                        href="/login"
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        Sign in here
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
                    Get Started Today
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Join thousands of schools already using SchoolHub
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                      <School className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">School Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive tools to manage multiple schools efficiently
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-chart-2 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Branch Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Organize and manage multiple branches for each school
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-chart-3 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Secure Platform</h3>
                      <p className="text-sm text-muted-foreground">
                        Enterprise-grade security to protect your school data
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="h-10 w-10 rounded-lg bg-chart-4 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Real-time Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay connected with instant notifications and live sync
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
              By creating an account, you agree to our{' '}
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

export default Register;
