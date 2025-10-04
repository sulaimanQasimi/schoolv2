<?php

namespace App\Policies;

use App\Models\Department;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DepartmentPolicy
{
    /**
     * Determine whether the user can view any departments.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view-department');
    }

    /**
     * Determine whether the user can view the department.
     */
    public function view(User $user, Department $department): bool
    {
        return $user->can('view-department');
    }

    /**
     * Determine whether the user can create departments.
     */
    public function create(User $user): bool
    {
        return $user->can('create-department');
    }

    /**
     * Determine whether the user can update the department.
     */
    public function update(User $user, Department $department): bool
    {
        return $user->can('edit-department');
    }

    /**
     * Determine whether the user can delete the department.
     */
    public function delete(User $user, Department $department): bool
    {
        return $user->can('delete-department');
    }

    /**
     * Determine whether the user can restore the department.
     */
    public function restore(User $user, Department $department): bool
    {
        return $user->can('delete-department');
    }

    /**
     * Determine whether the user can permanently delete the department.
     */
    public function forceDelete(User $user, Department $department): bool
    {
        return $user->can('delete-department');
    }
}