<?php

namespace Domain\Users\Actions;

use Carbon\Carbon;
use Domain\Loans\Models\Loan;
use Domain\Reservations\Models\Reservation;

class ActivityShowAction
{

    public function __invoke(string $user_id): array
    {
        $user_loans = Loan::where('user_id', $user_id)
            ->withTrashed()
            ->with('book')
            ->get();

        $user_reservations = Reservation::where('user_id', $user_id)
            ->withTrashed()
            ->with('book')
            ->get();

        $user_loans->each->setAttribute('type', 'loan');
        $user_reservations->each->setAttribute('type', 'reservation');

        $all = $user_loans->merge($user_reservations)->sortByDesc('created_at')->values();

        $activities = $all->map(function ($activity) {
            $activity->expedit = $activity->created_at ? Carbon::parse($activity->created_at)->format('d-m-Y') : null;
            $activity->return = $activity->return_date ? Carbon::parse($activity->return_date)->format('d-m-Y') : null;
            $activity->end = $activity->end_loan ? Carbon::parse($activity->end_loan)->format('d-m-Y') : null;
            $activity->overdue = (Carbon::now() > $activity->end_loan && $activity->return_date === null || $activity->return_date > $activity->end_loan) || false;
            if ($activity->overdue) {
                if ($activity->return_date === null) {
                    $activity->days_overdue = (int) Carbon::now()->diffInDays($activity->end_loan);
                } else {
                    $activity->end_loan = new Carbon($activity->end_loan);
                    $activity->days_overdue = (int) $activity->end_loan->diffInDays($activity->return_date);
                }
            } else {
                $activity->days_overdue = null;
            }
            return $activity;
        })->toArray();
        return $activities;
    }
}
