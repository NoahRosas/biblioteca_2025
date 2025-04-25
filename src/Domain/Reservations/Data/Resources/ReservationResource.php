<?php

namespace Domain\Reservations\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Reservations\Models\Reservation;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class ReservationResource extends Data {
   
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $user_email,
        public readonly string $book_id,
        public readonly string $book_name,
        public readonly string $book_ISBN,
        public readonly string $created_at,
    ){

    }
    public static function fromModel(Reservation $reservation): self{
        $book = Book::withTrashed()->where('id', $reservation->book_id)->first();
        $user = User::withTrashed()->where('id', $reservation->user_id)->first();
        
        return new self (
            id: $reservation->id,
            user_id: $reservation->user_id,
            user_email:$user->email,
            book_id: $reservation->book_id,
            book_name: $book->name,
            book_ISBN: $book->ISBN,
            created_at: $reservation->created_at->format('d-m-Y'),
        );
    }
}
