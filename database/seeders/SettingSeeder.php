<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            ['key' => 'app_name', 'value' => 'School Management System', 'type' => 'string', 'description' => 'Application name', 'group' => 'general', 'is_public' => true],
            ['key' => 'app_description', 'value' => 'A comprehensive school management system', 'type' => 'string', 'description' => 'Application description', 'group' => 'general', 'is_public' => true],
            ['key' => 'app_version', 'value' => '1.0.0', 'type' => 'string', 'description' => 'Application version', 'group' => 'general', 'is_public' => true],
            ['key' => 'app_timezone', 'value' => 'UTC', 'type' => 'string', 'description' => 'Application timezone', 'group' => 'general', 'is_public' => false],
            ['key' => 'app_locale', 'value' => 'en', 'type' => 'string', 'description' => 'Application locale', 'group' => 'general', 'is_public' => false],
            
            // System Settings
            ['key' => 'maintenance_mode', 'value' => 'false', 'type' => 'boolean', 'description' => 'Enable maintenance mode', 'group' => 'system', 'is_public' => false],
            ['key' => 'max_login_attempts', 'value' => '5', 'type' => 'integer', 'description' => 'Maximum login attempts before lockout', 'group' => 'system', 'is_public' => false],
            ['key' => 'session_timeout', 'value' => '120', 'type' => 'integer', 'description' => 'Session timeout in minutes', 'group' => 'system', 'is_public' => false],
            ['key' => 'enable_registration', 'value' => 'true', 'type' => 'boolean', 'description' => 'Enable user registration', 'group' => 'system', 'is_public' => false],
            
            // Backup Settings
            ['key' => 'backup_enabled', 'value' => 'true', 'type' => 'boolean', 'description' => 'Enable automatic backups', 'group' => 'backup', 'is_public' => false],
            ['key' => 'backup_frequency', 'value' => 'daily', 'type' => 'string', 'description' => 'Backup frequency (daily, weekly, monthly)', 'group' => 'backup', 'is_public' => false],
            ['key' => 'backup_retention_days', 'value' => '30', 'type' => 'integer', 'description' => 'Number of days to keep backups', 'group' => 'backup', 'is_public' => false],
            ['key' => 'backup_include_files', 'value' => 'true', 'type' => 'boolean', 'description' => 'Include files in backup', 'group' => 'backup', 'is_public' => false],
            ['key' => 'backup_include_database', 'value' => 'true', 'type' => 'boolean', 'description' => 'Include database in backup', 'group' => 'backup', 'is_public' => false],
            
            // Email Settings
            ['key' => 'mail_from_name', 'value' => 'School Management System', 'type' => 'string', 'description' => 'Email sender name', 'group' => 'email', 'is_public' => false],
            ['key' => 'mail_from_address', 'value' => 'noreply@school.com', 'type' => 'string', 'description' => 'Email sender address', 'group' => 'email', 'is_public' => false],
            ['key' => 'mail_reply_to', 'value' => 'support@school.com', 'type' => 'string', 'description' => 'Email reply-to address', 'group' => 'email', 'is_public' => false],
            
            // Notification Settings
            ['key' => 'notifications_enabled', 'value' => 'true', 'type' => 'boolean', 'description' => 'Enable notifications', 'group' => 'notifications', 'is_public' => false],
            ['key' => 'email_notifications', 'value' => 'true', 'type' => 'boolean', 'description' => 'Enable email notifications', 'group' => 'notifications', 'is_public' => false],
            ['key' => 'sms_notifications', 'value' => 'false', 'type' => 'boolean', 'description' => 'Enable SMS notifications', 'group' => 'notifications', 'is_public' => false],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
