<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    /**
     * Get user notifications
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        // Mock notifications for now - in a real app, these would come from a database
        $notifications = [
            [
                'id' => 1,
                'type' => 'info',
                'title' => 'New school registration',
                'message' => 'A new school has been registered in the system',
                'time' => '2 minutes ago',
                'read' => false,
                'icon' => 'school',
            ],
            [
                'id' => 2,
                'type' => 'success',
                'title' => 'Branch update completed',
                'message' => 'Branch information has been successfully updated',
                'time' => '1 hour ago',
                'read' => false,
                'icon' => 'building',
            ],
            [
                'id' => 3,
                'type' => 'warning',
                'title' => 'System maintenance scheduled',
                'message' => 'System maintenance is scheduled for tonight at 2 AM',
                'time' => '3 hours ago',
                'read' => true,
                'icon' => 'settings',
            ],
            [
                'id' => 4,
                'type' => 'info',
                'title' => 'New department created',
                'message' => 'A new department has been added to your organization',
                'time' => '5 hours ago',
                'read' => true,
                'icon' => 'users',
            ],
        ];

        // Filter unread notifications
        $unreadCount = collect($notifications)->where('read', false)->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount,
        ]);
    }

    /**
     * Mark notification as read
     */
    public function markAsRead(Request $request, $id): JsonResponse
    {
        // In a real app, this would update the database
        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read',
        ]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(Request $request): JsonResponse
    {
        // In a real app, this would update the database
        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read',
        ]);
    }
}
