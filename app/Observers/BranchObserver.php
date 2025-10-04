<?php

namespace App\Observers;

use App\Models\Branch;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class BranchObserver
{
    /**
     * Handle the Branch "created" event.
     */
    public function created(Branch $branch): void
    {
        $this->createNotification(
            'success',
            'New Branch Created',
            "A new branch '{$branch->name}' has been created for {$branch->school->name}.",
            'building',
            "/branches/{$branch->id}"
        );
    }

    /**
     * Handle the Branch "updated" event.
     */
    public function updated(Branch $branch): void
    {
        // Only notify if name or code changed
        if ($branch->wasChanged(['name', 'code'])) {
            $this->createNotification(
                'info',
                'Branch Information Updated',
                "Branch '{$branch->name}' information has been updated.",
                'building',
                "/branches/{$branch->id}"
            );
        }
    }

    /**
     * Handle the Branch "deleted" event.
     */
    public function deleted(Branch $branch): void
    {
        $this->createNotification(
            'warning',
            'Branch Deleted',
            "Branch '{$branch->name}' has been deleted from {$branch->school->name}.",
            'building'
        );
    }

    /**
     * Handle the Branch "restored" event.
     */
    public function restored(Branch $branch): void
    {
        $this->createNotification(
            'info',
            'Branch Restored',
            "Branch '{$branch->name}' has been restored.",
            'building',
            "/branches/{$branch->id}"
        );
    }

    /**
     * Handle the Branch "force deleted" event.
     */
    public function forceDeleted(Branch $branch): void
    {
        $this->createNotification(
            'error',
            'Branch Permanently Deleted',
            "Branch '{$branch->name}' has been permanently deleted from the system.",
            'building'
        );
    }

    /**
     * Create a notification for all users
     */
    private function createNotification(string $type, string $title, string $message, string $icon, ?string $actionUrl = null): void
    {
        // Get all users (in a real app, you might want to filter by role or permissions)
        $users = \App\Models\User::all();
        
        foreach ($users as $user) {
            Notification::create([
                'user_id' => $user->id,
                'type' => $type,
                'title' => $title,
                'message' => $message,
                'icon' => $icon,
                'action_url' => $actionUrl,
                'data' => [
                    'created_by' => Auth::id(),
                    'timestamp' => now()->toISOString(),
                ],
            ]);
        }
    }
}
