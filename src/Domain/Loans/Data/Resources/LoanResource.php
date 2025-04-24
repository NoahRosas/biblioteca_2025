<?php

namespace Domain\Loans\Data\Resources;

use Carbon\Carbon;
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
        public readonly int $days_overdued,
        public readonly int $days_overdued_returned,
        public readonly bool $borrowed,
        public readonly string $return_date,
        public readonly bool $is_overdue,
        public readonly string $created_at,
    ){

    }
    public static function fromModel(Loan $loan): self{
        $book = Book::withTrashed()->where('id', $loan->book_id)->first();
        $user = User::withTrashed()->where('id', $loan->user_id)->first();

        $return_date = $loan->return_date ? date_create($loan->return_date)->format('d-m-Y') : 'null';
        $end_loan = new Carbon($loan->end_loan);
        if ($end_loan < Carbon::now() && $return_date === 'null') {
            $loan->is_overdue = true;
        }
        $diff_inDays = (int)Carbon::now()->diffInDays($loan->end_loan);
        $diff_2 = new Carbon($loan->return_date);
        $diff_2 = (int)$end_loan->diffInDays($diff_2);
        // dd($diff_2);
        return new self (
            id: $loan->id,
            user_id: $loan->user_id,
            user_email:$user->email,
            book_id: $loan->book_id,
            book_name: $book->name,
            book_ISBN: $book->ISBN,
            end_loan: date_create($loan->end_loan)->format('d-m-Y'),
            days_overdued:$diff_inDays,
            days_overdued_returned:$diff_2,
            borrowed: $loan->borrowed,
            return_date: $return_date,
            is_overdue: $loan->is_overdue ,
            created_at: $loan->created_at->format('d-m-Y'),
        );
    }
}
