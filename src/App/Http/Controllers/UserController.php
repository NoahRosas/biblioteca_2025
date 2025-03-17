<?php

namespace App\Http\Controllers;

use Domain\Users\Actions\UserDestroyAction;
use Domain\Users\Actions\UserIndexAction;
use Domain\Users\Actions\UserStoreAction;
use Domain\Users\Actions\UserUpdateAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('users/Index');
    }

    public function create()
    {
        $permisos = [];
        $roles = [];

        foreach (Permission::all() as $value) {
            $category = explode('.', $value->name)[0];
            $action = explode('.', $value->name)[1];
            array_push($permisos, [$category, $action]);
        }

        foreach (Role::all() as $value) {
            array_push($roles, $value->name);
        }

        return Inertia::render('users/Create', [
            'permisos' => $permisos,
            'roles' => $roles
        ]);
    }

    public function store(Request $request, UserStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('users.index')
            ->with('success', __('messages.users.created'));
    }

    public function edit(Request $request, User $user)
    {
        $permisos = [];
        $roles = [];

        foreach (Permission::all() as $value) {
            $category = explode('.', $value->name)[0];
            $action = explode('.', $value->name)[1];
            array_push($permisos, [$category, $action]);
        }

        foreach (Role::all() as $value) {
            array_push($permisos, $value->name);
        }

        $userPermits = [];

        foreach($user->permissions as $permit){
            $category = explode('.', $permit->name)[0];
            $action = explode('.', $permit->name)[1];
            if (!isset($userPermits[$category])) {
                $userPermits[$category] = [];
            }
            $userPermits[$category][$action] = true;
        }
        return Inertia::render('users/Edit', [
            'user' => $user,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
            'permisos' => $permisos,
            'roles' => $roles,
            'userPermits' => $userPermits
        ]);
    }

    public function update(Request $request, User $user, UserUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($user, $validator->validated());

        $redirectUrl = route('users.index');
        
        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.users.updated'));
    }

    public function destroy(User $user, UserDestroyAction $action)
    {
        $action($user);

        return redirect()->route('users.index')
            ->with('success', __('messages.users.deleted'));
    }
}
