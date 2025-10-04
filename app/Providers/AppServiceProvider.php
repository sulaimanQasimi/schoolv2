<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\School;
use App\Models\Branch;
use App\Models\Department;
use App\Observers\SchoolObserver;
use App\Observers\BranchObserver;
use App\Observers\DepartmentObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register model observers
        School::observe(SchoolObserver::class);
        Branch::observe(BranchObserver::class);
        Department::observe(DepartmentObserver::class);
    }
}
