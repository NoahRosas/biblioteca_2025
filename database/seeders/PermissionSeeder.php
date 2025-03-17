<?php

namespace Database\Seeders;

use Domain\Permissions\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $user_permission = Permission::create(attributes: [
            'name' => 'users.view',
            'display_name' => 'Ver Usuarios',
            'description' => 'Ver lista de usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'users.create',
            'display_name' => 'Crear Usuarios',
            'description' => 'Crear usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'users.edit',
            'display_name' => 'Editar Usuarios',
            'description' => 'Editar usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'users.delete',
            'display_name' => 'Eliminar Usuarios',
            'description' => 'Eliminar usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        $products_permission = Permission::create(attributes: [
            'name' => 'products.view',
            'display_name' => 'Ver Productos',
            'description' => 'Ver lista de productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'products.create',
            'display_name' => 'Crear Productos',
            'description' => 'Crear productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $products_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'products.edit',
            'display_name' => 'Edit Productos',
            'description' => 'Editar productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $products_permission->id,
        ]);

        Permission::create(attributes: [
            'name' => 'products.delete',
            'display_name' => 'Eliminar Productos',
            'description' => 'Eliminar productos de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $products_permission->id,
        ]);

        $report_permissions = Permission::create(attributes: [
            'name' => 'reports.view',
            'display_name' => 'Ver Reportes',
            'description' => 'Ver lista de reportes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'reports.export',
            'display_name' => 'Exportar Reportes',
            'description' => 'Exportar reportes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $report_permissions->id,
        ]);

        Permission::create(attributes: [
            'name' => 'reports.print',
            'display_name' => 'Imprimir Reportes',
            'description' => 'Imprimir reportes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $report_permissions->id,
        ]);

        $settings_permissions = Permission::create(attributes: [
            'name' => 'settings.access',
            'display_name' => 'Acceder Ajustes',
            'description' => 'Acceder a ajustes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'settings.modify',
            'display_name' => 'Modificar Ajustes',
            'description' => 'Modificar ajustes de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $settings_permissions->id,
        ]);

        Cache::forever(key: 'permissions', value: Permission::whereNull('parent_id')->with('children')->get());
    }
}
