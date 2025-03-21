<?php

namespace Domain\Users\Actions;

use Domain\Permissions\Models\Permission as ModelsPermission;
use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;


class UserUpdateAction
{
    public function __invoke(User $user, array $data, array $permits): UserResource
    {
        $updateData = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = Hash::make($data['password']);
        }

        if($permits){
            $permits = [...$permits];
            $user->revokePermissionTo(ModelsPermission::all());
            $user->givePermissionTo($permits);
        }
        
        $user->update($updateData);

        return UserResource::fromModel($user->fresh());
    }
}
