<?php

namespace App\Observers;

use App\Models\School;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class SchoolObserver
{
    /**
     * Handle the School "created" event.
     */
    public function created(School $school): void
    {
        $this->createNotification(
            'success',
            'New School Registered',
            "A new school '{$school->name}' has been registered in the system.",
            'school',
            "/schools/{$school->id}"
        );
    }

    /**
     * Handle the School "updated" event.
     */
    public function updated(School $school): void
    {
        // Only notify if name or code changed
        if ($school->wasChanged(['name', 'code'])) {
            $this->createNotification(
                'info',
                'School Information Updated',
                "School '{$school->name}' information has been updated.",
                'school',
                "/schools/{$school->id}"
            );
        }
    }

    /**
     * Handle the School "deleted" event.
     */
    public function deleted(School $school): void
    {
        $this->createNotification(
            'warning',
            'School Deleted',
            "School '{$school->name}' has been deleted from the system.",
            'school'
        );
    }

    /**
     * Handle the School "restored" event.
     */
    public function restored(School $school): void
    {
        $this->createNotification(
            'info',
            'School Restored',
            "School '{$school->name}' has been restored.",
            'school',
            "/schools/{$school->id}"
        );
    }

    /**
     * Handle the School "force deleted" event.
     */
    public function forceDeleted(School $school): void
    {
        $this->createNotification(
            'error',
            'School Permanently Deleted',
            "School '{$school->name}' has been permanently deleted from the system.",
            'school'
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
