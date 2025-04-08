<?php

namespace Domain\Loans\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $user_email,
        public readonly string $book_id,
        public readonly string $book_name,
        public readonly string $book_ISBN,
        public readonly string $end_loan,
        public readonly bool $borrowed,
        public readonly bool $is_overdue,
        public readonly string $created_at,
    ){

    }
    public static function fromModel(Loan $loan): self{
        $book = Book::find($loan->book_id);
        $user = User::find($loan->user_id);
        return new self (
            id: $loan->id,
            user_id: $loan->user_id,
            user_email:$user->email,
            book_id: $loan->book_id,
            book_name: $book->name,
            book_ISBN: $book->ISBN,
            end_loan: $loan->end_loan,
            borrowed: $loan->borrowed,
            is_overdue: $loan->is_overdue ,
            created_at: $loan->created_at
        );
    }
}
