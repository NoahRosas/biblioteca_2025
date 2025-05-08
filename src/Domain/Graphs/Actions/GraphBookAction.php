<?php

namespace Domain\Graphs\Actions;

use Domain\Books\Models\Book;

class GraphBookAction
{
    public function __invoke(): array
    {
        $books = Book::withTrashed()
            ->with(['loans', 'reservations' => function ($query) {
                $query->withTrashed();
            }])
            ->get()
            ->groupBy('ISBN')
            ->map(function ($books) {
                $totalLoans = $books->sum(function ($book) {
                    return $book->loans->count();
                });
                $totalReservations = $books->sum(function ($book) {
                    return $book->reservations->count();
                });
                $representativeBook = $books->first();
                $result = clone $representativeBook;
                $result->loans_count = $totalLoans;
                $result->reservations_count = $totalReservations;
                $result->total = $totalLoans + $totalReservations;
                return $result;
            })
            ->sortByDesc('total')
            ->take(10)
            ->values();


        $books = $books->map(function ($book, $index) {
            $book->index = 'Top ' . $index + 1;
            return $book;
        })->toArray();

        return $books;
    }
}
