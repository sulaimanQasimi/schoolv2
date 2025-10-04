<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            // School permissions
            ['name' => 'view schools', 'label' => 'View Schools'],
            ['name' => 'create schools', 'label' => 'Create Schools'],
            ['name' => 'edit schools', 'label' => 'Edit Schools'],
            ['name' => 'delete schools', 'label' => 'Delete Schools'],
            
            // Branch permissions
            ['name' => 'view branches', 'label' => 'View Branches'],
            ['name' => 'create branches', 'label' => 'Create Branches'],
            ['name' => 'edit branches', 'label' => 'Edit Branches'],
            ['name' => 'delete branches', 'label' => 'Delete Branches'],
            
            // Department permissions
            ['name' => 'view departments', 'label' => 'View Departments'],
            ['name' => 'create departments', 'label' => 'Create Departments'],
            ['name' => 'edit departments', 'label' => 'Edit Departments'],
            ['name' => 'delete departments', 'label' => 'Delete Departments'],
            
            // User permissions
            ['name' => 'view users', 'label' => 'View Users'],
            ['name' => 'create users', 'label' => 'Create Users'],
            ['name' => 'edit users', 'label' => 'Edit Users'],
            ['name' => 'delete users', 'label' => 'Delete Users'],
            
            // Role & Permission permissions
            ['name' => 'view roles', 'label' => 'View Roles'],
            ['name' => 'create roles', 'label' => 'Create Roles'],
            ['name' => 'edit roles', 'label' => 'Edit Roles'],
            ['name' => 'delete roles', 'label' => 'Delete Roles'],
            ['name' => 'assign roles', 'label' => 'Assign Roles'],
            
            // Settings permissions
            ['name' => 'view settings', 'label' => 'View Settings'],
            ['name' => 'edit settings', 'label' => 'Edit Settings'],
            
            // Backup permissions
            ['name' => 'view backups', 'label' => 'View Backups'],
            ['name' => 'create backups', 'label' => 'Create Backups'],
            ['name' => 'restore backups', 'label' => 'Restore Backups'],
            ['name' => 'delete backups', 'label' => 'Delete Backups'],
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission['name'],
                'label' => $permission['label'],
                'guard_name' => 'web'
            ]);
        }

        // Create roles
        $superAdmin = Role::create(['name' => 'super-admin', 'guard_name' => 'web']);
        $admin = Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $manager = Role::create(['name' => 'manager', 'guard_name' => 'web']);
        $teacher = Role::create(['name' => 'teacher', 'guard_name' => 'web']);
        $student = Role::create(['name' => 'student', 'guard_name' => 'web']);

        // Assign permissions to roles
        $superAdmin->givePermissionTo(Permission::all());
        
        $admin->givePermissionTo([
            'view schools', 'create schools', 'edit schools', 'delete schools',
            'view branches', 'create branches', 'edit branches', 'delete branches',
            'view departments', 'create departments', 'edit departments', 'delete departments',
            'view users', 'create users', 'edit users', 'delete users',
            'view roles', 'create roles', 'edit roles', 'delete roles', 'assign roles',
            'view settings', 'edit settings',
            'view backups', 'create backups', 'restore backups', 'delete backups',
        ]);
        
        $manager->givePermissionTo([
            'view schools', 'view branches', 'view departments',
            'view users', 'create users', 'edit users',
            'view settings',
            'view backups', 'create backups',
        ]);
        
        $teacher->givePermissionTo([
            'view schools', 'view branches', 'view departments',
            'view users',
        ]);
        
        $student->givePermissionTo([
            'view schools', 'view branches', 'view departments',
        ]);

        // Create a super admin user if none exists
        if (!User::where('email', 'admin@school.com')->exists()) {
            $user = User::create([
                'name' => 'Super Admin',
                'email' => 'admin@school.com',
                'password' => bcrypt('password'),
            ]);
            $user->assignRole('super-admin');
        }
    }
}
