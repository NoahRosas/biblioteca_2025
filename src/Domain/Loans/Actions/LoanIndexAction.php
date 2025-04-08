<?php

namespace Domain\Loans\Actions;

use Domain\Books\Models\Book;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $user_email = $search[0];
        $book_name = $search[1];
        $book_ISBN = $search[2];

        $user = User::query()->when($user_email !== 'null', function ($query) use ($user_email){
            $query->where('email', 'ILIKE' , "%{$user_email}%");
        })->pluck('id');

        $books = Book::query()->when($book_name !== 'null', function ($query) use ($book_name){
            $query->where('name', 'ILIKE', "%{$book_name}%");
        })->when($book_ISBN !== 'null', function ($query) use ($book_ISBN){
            $query->where('ISBN', 'ILIKE', "%{$book_ISBN}%");
        })->pluck('id');

        $loans = Loan::query()
            ->when($user_email !== 'null', function ($query) use ($user) {
                $query->whereIn('user_id', $user);
            })->when($book_name !== 'null' || $book_ISBN !== 'null' , function ($query) use ($books) {
                $query->whereIn('book_id', $books);
            })
            ->latest()
            ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
