<?php

namespace App\Policies;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BranchPolicy
{
    /**
     * Determine whether the user can view any branches.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('view-branch');
    }

    /**
     * Determine whether the user can view the branch.
     */
    public function view(User $user, Branch $branch): bool
    {
        return $user->can('view-branch');
    }

    /**
     * Determine whether the user can create branches.
     */
    public function create(User $user): bool
    {
        return $user->can('create-branch');
    }

    /**
     * Determine whether the user can update the branch.
     */
    public function update(User $user, Branch $branch): bool
    {
        return $user->can('edit-branch');
    }

    /**
     * Determine whether the user can delete the branch.
     */
    public function delete(User $user, Branch $branch): bool
    {
        return $user->can('delete-branch');
    }

    /**
     * Determine whether the user can restore the branch.
     */
    public function restore(User $user, Branch $branch): bool
    {
        return $user->can('delete-branch');
    }

    /**
     * Determine whether the user can permanently delete the branch.
     */
    public function forceDelete(User $user, Branch $branch): bool
    {
        return $user->can('delete-branch');
    }
}
