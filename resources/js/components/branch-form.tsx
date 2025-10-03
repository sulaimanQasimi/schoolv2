import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface School {
    id: number;
    name: string;
    code?: string;
}

interface Branch {
    id?: number;
    school_id: number;
    name: string;
    code?: string;
    address?: string;
    phone_number?: string;
}

interface BranchFormProps {
    branch?: Branch;
    schoolId?: number;
    isOpen: boolean;
    onClose: () => void;
    onSave: (branch: Branch) => void;
    loading?: boolean;
}

export default function BranchForm({ branch, schoolId, isOpen, onClose, onSave, loading = false }: BranchFormProps) {
    const [schools, setSchools] = useState<School[]>([]);
    const [formData, setFormData] = useState<Branch>({
        school_id: schoolId || 0,
        name: '',
        code: '',
        address: '',
        phone_number: '',
        ...branch,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            fetchSchools();
        }
    }, [isOpen]);

    const fetchSchools = async () => {
        try {
            const response = await fetch('/api/schools');
            const data = await response.json();
            setSchools(data.data);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const method = branch ? 'PUT' : 'POST';
            const url = branch ? `/api/branches/${branch.id}` : '/api/branches';
            
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
            console.error('Error saving branch:', error);
        }
    };

    const handleChange = (field: keyof Branch) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSchoolChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            school_id: parseInt(value),
        }));
        
        if (errors.school_id) {
            setErrors(prev => ({
                ...prev,
                school_id: '',
            }));
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {branch ? 'Edit Branch' : 'Create New Branch'}
                    </DialogTitle>
                    <DialogDescription>
                        {branch 
                            ? 'Update the branch information below.' 
                            : 'Fill in the details to create a new branch.'
                        }
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="school_id">School *</Label>
                        <Select
                            value={formData.school_id.toString()}
                            onValueChange={handleSchoolChange}
                            disabled={!!schoolId}
                        >
                            <SelectTrigger className={errors.school_id ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select a school" />
                            </SelectTrigger>
                            <SelectContent>
                                {schools.map((school) => (
                                    <SelectItem key={school.id} value={school.id.toString()}>
                                        {school.name} {school.code && `(${school.code})`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.school_id && (
                            <p className="text-sm text-red-500">{errors.school_id}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Branch Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange('name')}
                            placeholder="Enter branch name"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="code">Branch Code</Label>
                        <Input
                            id="code"
                            value={formData.code}
                            onChange={handleChange('code')}
                            placeholder="Enter branch code (optional)"
                            className={errors.code ? 'border-red-500' : ''}
                        />
                        {errors.code && (
                            <p className="text-sm text-red-500">{errors.code}</p>
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
                            placeholder="Enter branch address"
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
                            {loading ? 'Saving...' : (branch ? 'Update Branch' : 'Create Branch')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
