<?php

namespace App\Observers;

use App\Models\Department;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class DepartmentObserver
{
    /**
     * Handle the Department "created" event.
     */
    public function created(Department $department): void
    {
        $this->createNotification(
            'success',
            'New Department Created',
            "A new department '{$department->name}' has been created in {$department->branch->name}.",
            'users',
            "/departments/{$department->id}"
        );
    }

    /**
     * Handle the Department "updated" event.
     */
    public function updated(Department $department): void
    {
        // Only notify if name or code changed
        if ($department->wasChanged(['name', 'code'])) {
            $this->createNotification(
                'info',
                'Department Information Updated',
                "Department '{$department->name}' information has been updated.",
                'users',
                "/departments/{$department->id}"
            );
        }
    }

    /**
     * Handle the Department "deleted" event.
     */
    public function deleted(Department $department): void
    {
        $this->createNotification(
            'warning',
            'Department Deleted',
            "Department '{$department->name}' has been deleted from {$department->branch->name}.",
            'users'
        );
    }

    /**
     * Handle the Department "restored" event.
     */
    public function restored(Department $department): void
    {
        $this->createNotification(
            'info',
            'Department Restored',
            "Department '{$department->name}' has been restored.",
            'users',
            "/departments/{$department->id}"
        );
    }

    /**
     * Handle the Department "force deleted" event.
     */
    public function forceDeleted(Department $department): void
    {
        $this->createNotification(
            'error',
            'Department Permanently Deleted',
            "Department '{$department->name}' has been permanently deleted from the system.",
            'users'
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
