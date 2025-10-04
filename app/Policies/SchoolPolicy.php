<?php

namespace App\Policies;

use App\Models\School;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SchoolPolicy
{
    /**
     * Determine whether the user can view any schools.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view-school');
    }

    /**
     * Determine whether the user can view the school.
     */
    public function view(User $user, School $school): bool
    {
        return $user->can('view-school');
    }

    /**
     * Determine whether the user can create schools.
     */
    public function create(User $user): bool
    {
        return $user->can('create-school');
    }

    /**
     * Determine whether the user can update the school.
     */
    public function update(User $user, School $school): bool
    {
        return $user->can('edit-school');
    }

    /**
     * Determine whether the user can delete the school.
     */
    public function delete(User $user, School $school): bool
    {
        return $user->can('delete-school');
    }

    /**
     * Determine whether the user can restore the school.
     */
    public function restore(User $user, School $school): bool
    {
        return $user->can('delete-school');
    }

    /**
     * Determine whether the user can permanently delete the school.
     */
    public function forceDelete(User $user, School $school): bool
    {
        return $user->can('delete-school');
    }
}
