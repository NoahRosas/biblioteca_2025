<?php

namespace Domain\Reservations\Actions;

use Domain\Books\Models\Book;
use Domain\Reservations\Data\Resources\ReservationResource;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;

class ReservationIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $user_email = $search[0];
        $book_name = $search[1];
        $book_ISBN = $search[2];
        $created_at = $search[3];

        $user = User::query()->when($user_email !== 'null', function ($query) use ($user_email){
            $query->where('email', 'ILIKE' , "%{$user_email}%");
        })->pluck('id');

        $books = Book::query()->when($book_name !== 'null', function ($query) use ($book_name){
            $query->where('name', 'ILIKE', "%{$book_name}%");
        })->when($book_ISBN !== 'null', function ($query) use ($book_ISBN){
            $query->where('ISBN', 'ILIKE', "%{$book_ISBN}%");
        })->pluck('id');

         $reservations = Reservation::query()
            ->when($user_email !== 'null', function ($query) use ($user) {
                $query->whereIn('user_id', $user);
            })->when($book_name !== 'null' || $book_ISBN !== 'null' , function ($query) use ($books) {
                $query->whereIn('book_id', $books);
            })->when($created_at !== 'null', function ($query) use ($created_at){
                $query->whereDate('created_at', '=', $created_at);
            })
            ->latest()
            ->paginate($perPage);

        return $reservations->through(fn ($reservation) => ReservationResource::fromModel($reservation));
    }
}
