<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Http\Controllers\UserController::class);
});

Route::get('/prueba', function(){
    $permisos = Permission::all();
    $prueba=[];

    foreach ($permisos as $value) {
        $category = explode('.', $value->name)[0];
        $action = explode('.', $value->name)[1];
        array_push($prueba, [$category, $action]);
    }
    dd($prueba);
    

});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
