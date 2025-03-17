<?php

namespace Database\Seeders;

use Domain\Roles\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create([
            'name' => 'admin',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);

        $employee = Role::create([
            'name' => 'employee',
            'display_name' => 'Empleado',
            'description' => 'Empleado de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);

        $student = Role::create([
            'name' => 'student',
            'display_name' => 'Estudiante',
            'description' => 'Estudiante de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);

        $view = Role::create([
            'name' => 'view',
            'display_name' => 'Solo vista',
            'description' => 'Solo vista de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ]);
        $admin->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',
            'reports.export',
            'reports.print',
            'settings.access',
            'settings.modify'
        ]);
        $employee->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',
            'reports.export',
            'reports.print',
            'settings.access'
        ]);
        $student->givePermissionTo([
            'users.view',
            'products.view',
            'products.create',
            'products.edit',
            'reports.view',
            'settings.access'
        ]);
        $view->givePermissionTo([
            'users.view',
            'products.view',
            'reports.view',
            'settings.access'
        ]);
    }
}
