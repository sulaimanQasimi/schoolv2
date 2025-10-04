<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Redirect authenticated users to dashboard
Route::get('/home', function () {
    return redirect()->route('dashboard');
})->middleware('auth');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // School routes
    Route::resource('schools', App\Http\Controllers\SchoolController::class);
    
    // Branch routes
    Route::resource('branches', App\Http\Controllers\BranchController::class);
    
    // Department routes
    Route::resource('departments', App\Http\Controllers\DepartmentController::class);
    
    // Notification API routes
    Route::prefix('api')->group(function () {
        Route::get('notifications', [App\Http\Controllers\Api\NotificationController::class, 'index'])->name('api.notifications.index');
        Route::patch('notifications/{id}/read', [App\Http\Controllers\Api\NotificationController::class, 'markAsRead'])->name('api.notifications.read');
        Route::patch('notifications/read-all', [App\Http\Controllers\Api\NotificationController::class, 'markAllAsRead'])->name('api.notifications.read-all');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
