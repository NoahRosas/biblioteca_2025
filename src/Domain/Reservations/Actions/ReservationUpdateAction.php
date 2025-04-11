<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Illuminate\Support\Facades\DB;

class ReservationUpdateAction
{
    public function __invoke(Reservation $reservation, array $data): ReservationResource
    {
        $user_id = DB::table('users')->where('email', $data['user_email'])->first()->id;
        $updateData = [
            'user_id' => $user_id,
        ];

        $reservation->update($updateData);
     

        return ReservationResource::fromModel($reservation->fresh());
    }
}
