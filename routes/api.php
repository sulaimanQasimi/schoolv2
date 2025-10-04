<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\BranchController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\LanguageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Schools API Routes
Route::apiResource('schools', SchoolController::class);

// Branches API Routes
Route::apiResource('branches', BranchController::class);

// School-specific branch routes
Route::get('schools/{school}/branches', [BranchController::class, 'index'])->name('schools.branches.index');
Route::post('schools/{school}/branches', [BranchController::class, 'store'])->name('schools.branches.store');

// Notification API Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::patch('notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');
});

// Language API Routes
Route::prefix('languages')->group(function () {
    Route::get('/', [LanguageController::class, 'getLanguages'])->name('languages.index');
    Route::get('/translations', [LanguageController::class, 'getTranslations'])->name('languages.translations');
    Route::get('/all-translations', [LanguageController::class, 'getAllTranslations'])->name('languages.all-translations');
    
    // Protected routes for translation management
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/translations', [LanguageController::class, 'updateTranslations'])->name('languages.update-translations');
        Route::post('/translations/add', [LanguageController::class, 'addTranslation'])->name('languages.add-translation');
        Route::delete('/translations', [LanguageController::class, 'deleteTranslation'])->name('languages.delete-translation');
    });
});
