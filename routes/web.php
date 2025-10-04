<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // School routes
    Route::resource('schools', App\Http\Controllers\SchoolController::class);
    
    // Branch routes
    Route::resource('branches', App\Http\Controllers\BranchController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
