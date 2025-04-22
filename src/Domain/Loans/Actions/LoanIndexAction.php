<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
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
        $created_at = $search[3];
        $end_loan = $search[4];
        $borrowed = $search[5];
        $is_overdue = $search[6];
        // dd($is_overdue);
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
                $query->whereIn('user_id', $user)->withTrashed();
            })->when($book_name !== 'null' || $book_ISBN !== 'null' , function ($query) use ($books) {
                $query->whereIn('book_id', $books)->withTrashed();
            })->when($created_at !== 'null', function ($query) use ($created_at){
                $query->whereDate('created_at', '=', $created_at);
            })->when($end_loan !== 'null', function ($query) use ($end_loan){
                $query->whereDate('end_loan', '=', $end_loan);
            })->when($borrowed !== 'null', function ($query) use ($borrowed){
                $query->where('borrowed', '=', $borrowed);
            })->when($is_overdue !== 'null', function ($query) use ($is_overdue){
                if ($is_overdue === 'true') {
                    $query->where('end_loan', '<', Carbon::today());
                }else{
                    $query->where('end_loan', '>', Carbon::today());
                }
                
            })
            ->latest()
            ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
