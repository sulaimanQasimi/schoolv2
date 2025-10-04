<?php

namespace App\Providers;

use App\Models\Branch;
use App\Models\Department;
use App\Models\School;
use App\Policies\BranchPolicy;
use App\Policies\DepartmentPolicy;
use App\Policies\SchoolPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Branch::class => BranchPolicy::class,
        School::class => SchoolPolicy::class,
        Department::class => DepartmentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
