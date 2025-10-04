<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class NotificationController extends Controller
{
    /**
     * Get user notifications
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'time' => $this->formatTime($notification->created_at),
                    'read' => $notification->read,
                    'icon' => $notification->icon,
                    'action_url' => $notification->action_url,
                ];
            });

        $unreadCount = Notification::where('user_id', $user->id)
            ->where('read', false)
            ->count();

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
        $user = $request->user();
        
        $notification = Notification::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification not found',
            ], 404);
        }

        $notification->markAsRead();

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
        $user = $request->user();
        
        Notification::where('user_id', $user->id)
            ->where('read', false)
            ->update([
                'read' => true,
                'read_at' => now(),
            ]);

        return response()->json([
            'success' => true,
            'message' => 'All notifications marked as read',
        ]);
    }

    /**
     * Format time for display
     */
    private function formatTime($timestamp): string
    {
        $now = Carbon::now();
        $time = Carbon::parse($timestamp);
        
        $diffInMinutes = $now->diffInMinutes($time);
        
        if ($diffInMinutes < 1) {
            return 'Just now';
        } elseif ($diffInMinutes < 60) {
            return $diffInMinutes . ' minute' . ($diffInMinutes > 1 ? 's' : '') . ' ago';
        } elseif ($diffInMinutes < 1440) { // Less than 24 hours
            $diffInHours = $now->diffInHours($time);
            return $diffInHours . ' hour' . ($diffInHours > 1 ? 's' : '') . ' ago';
        } else {
            $diffInDays = $now->diffInDays($time);
            return $diffInDays . ' day' . ($diffInDays > 1 ? 's' : '') . ' ago';
        }
    }
}
