<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions for Branch management
        $branchPermissions = [
            'view-branch' => 'View Branch',
            'create-branch' => 'Create Branch',
            'edit-branch' => 'Edit Branch',
            'delete-branch' => 'Delete Branch',
        ];

        // Create permissions for School management
        $schoolPermissions = [
            'view-school' => 'View School',
            'create-school' => 'Create School',
            'edit-school' => 'Edit School',
            'delete-school' => 'Delete School',
        ];

        // Create permissions for Department management
        $departmentPermissions = [
            'view-department' => 'View Department',
            'create-department' => 'Create Department',
            'edit-department' => 'Edit Department',
            'delete-department' => 'Delete Department',
        ];

        // Create all permissions
        $allPermissions = array_merge($branchPermissions, $schoolPermissions, $departmentPermissions);

        foreach ($allPermissions as $name => $label) {
            Permission::updateOrCreate([
                'name' => $name,
                'guard_name' => 'web',
                'label' => $label,
            ]);
        }

        // Create roles
        $adminRole = Role::updateOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $managerRole = Role::updateOrCreate(['name' => 'manager', 'guard_name' => 'web']);
        $viewerRole = Role::updateOrCreate(['name' => 'viewer', 'guard_name' => 'web']);

        // Assign permissions to roles
        $adminRole->givePermissionTo(Permission::all());
        
        $managerRole->givePermissionTo([
            'view-branch', 'create-branch', 'edit-branch',
            'view-school', 'create-school', 'edit-school',
            'view-department', 'create-department', 'edit-department',
        ]);
        
        $viewerRole->givePermissionTo([
            'view-branch', 'view-school', 'view-department',
        ]);

        $this->command->info('Permissions and roles created successfully!');
    }
}
