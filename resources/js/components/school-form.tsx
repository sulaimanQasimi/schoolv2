import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface School {
    id?: number;
    name: string;
    code?: string;
    address?: string;
    email?: string;
    phone_number?: string;
}

interface SchoolFormProps {
    school?: School;
    isOpen: boolean;
    onClose: () => void;
    onSave: (school: School) => void;
    loading?: boolean;
}

export default function SchoolForm({ school, isOpen, onClose, onSave, loading = false }: SchoolFormProps) {
    const [formData, setFormData] = useState<School>({
        name: '',
        code: '',
        address: '',
        email: '',
        phone_number: '',
        ...school,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const method = school ? 'PUT' : 'POST';
            const url = school ? `/api/schools/${school.id}` : '/api/schools';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                onSave(result.data);
                onClose();
            } else {
                const errorData = await response.json();
                if (errorData.errors) {
                    setErrors(errorData.errors);
                }
            }
        } catch (error) {
            console.error('Error saving school:', error);
        }
    };

    const handleChange = (field: keyof School) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {school ? 'Edit School' : 'Create New School'}
                    </DialogTitle>
                    <DialogDescription>
                        {school 
                            ? 'Update the school information below.' 
                            : 'Fill in the details to create a new school.'
                        }
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">School Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange('name')}
                            placeholder="Enter school name"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="code">School Code</Label>
                        <Input
                            id="code"
                            value={formData.code}
                            onChange={handleChange('code')}
                            placeholder="Enter school code (optional)"
                            className={errors.code ? 'border-red-500' : ''}
                        />
                        {errors.code && (
                            <p className="text-sm text-red-500">{errors.code}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange('email')}
                            placeholder="Enter email address"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                            id="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange('phone_number')}
                            placeholder="Enter phone number"
                            className={errors.phone_number ? 'border-red-500' : ''}
                        />
                        {errors.phone_number && (
                            <p className="text-sm text-red-500">{errors.phone_number}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={handleChange('address')}
                            placeholder="Enter school address"
                            className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500">{errors.address}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : (school ? 'Update School' : 'Create School')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
