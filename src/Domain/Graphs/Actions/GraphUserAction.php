<?php

namespace Domain\Graphs\Actions;

use Domain\Users\Models\User;

class GraphUserAction
{
    public function __invoke()
    {
        $users = User::withCount(['loans' => function ($query) {
            $query->withTrashed();
        }, 'reservations' => function ($query) {
            $query->withTrashed();
        }])
            ->get()
            ->map(function ($user) {
                $user->all = $user->loans_count + $user->reservations_count;
                return $user;
            })
            ->sortByDesc('all')
            ->take(10)
            ->values();

        $users->map(function ($user, $index) {
            $user->index = 'Top ' . $index + 1;
            return $user;
        })->toArray();

        return $users;
    }
}
