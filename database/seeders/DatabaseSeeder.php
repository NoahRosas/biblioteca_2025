<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            GenreSeeder::class,
            FloorSeeder::class,
            ZoneSeeder::class,
            BookshelfSeeder::class,
            BookSeeder::class
        ]);

        //migrar pulse database

    }
}
