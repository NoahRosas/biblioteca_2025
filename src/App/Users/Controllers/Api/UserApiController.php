<?php

namespace App\Users\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Users\Actions\UserDestroyAction;
use Domain\Users\Actions\UserIndexAction;
use Domain\Users\Actions\UserStoreAction;
use Domain\Users\Actions\UserUpdateAction;
use Domain\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class UserApiController extends Controller
{
    public function index(Request $request, UserIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(User $user)
    {
        return response()->json(['user' => $user]);
    }

    public function store(Request $request, UserStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = $action($validator->validated());



        return response()->json([
            'message' => __('messages.users.created'),
            'user' => $user
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
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedUser = $action($user, $validator->validated());

        return response()->json([
            'message' => __('messages.users.updated'),
            'user' => $updatedUser
        ]);
    }

    public function destroy(User $user, UserDestroyAction $action)
    {
        $action($user);

        return response()->json([
            'message' => __('messages.users.deleted')
        ]);
    }

    public function user_search(Request $request)
    {
        $id = $request['id'];
        $username = $request['name'];
        $email = $request['email'];
        $created_at = $request['created_at'];
        $users = User::query()
            ->when($username !== null, function ($query) use ($username) {
                $query->where('name', 'ILIKE', "%{$username}%");
            })->when($id !== null, function ($query) use ($id) {
                $query->where('id', 'ILIKE', "%{$id}%");
            })->when($email !== null, function ($query) use ($email) {
                $query->where('email', 'ILIKE', "%{$email}%");
            })->when($created_at !== null, function ($query) use ($created_at) {
                $query->whereDate('created_at', '=', $created_at);
            });

        return response()->json([
            'users' => $users->get()
        ]);
    }
}
