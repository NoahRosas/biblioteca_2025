<?php

namespace Domain\Reservations\Actions;

use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Illuminate\Support\Facades\DB;

class ReservationStoreAction
{
    public function __invoke(array $data):ReservationResource
    {
        $user_id = DB::table('users')->where('email', $data['user_email'])->first()->id;
        $reservation = Reservation::create([
            'user_id' => $user_id,
            'book_id' => $data['book_id'],
        ]);

        return ReservationResource::fromModel($reservation);
    }
}
