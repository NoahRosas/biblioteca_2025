<?php

namespace Domain\Users\Actions;

use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;

class UserIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $username = $search[0];
        $email = $search[1];
        $created_at = $search[2];
        $users = User::query()
            ->when($username !== 'null', function ($query) use ($username) {
                $query->where('name', 'ILIKE', "%{$username}%");
            })->when($email !== 'null', function ($query) use ($email) {
                $query->where('email', 'ILIKE', "%{$email}%");
            })->when($created_at !== 'null', function ($query) use ($created_at) {
                $query->whereDate('created_at', '=', $created_at);
            })
            ->latest()
            ->paginate($perPage);

        return $users->through(fn ($user) => UserResource::fromModel($user));
    }
}
