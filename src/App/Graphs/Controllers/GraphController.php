<?php

namespace App\Graphs\Controllers;

use Domain\Books\Models\Book;
use Domain\Floors\Models\Floor;
use Domain\Users\Models\User;
use Domain\Zones\Models\Zone;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraphController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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


        $users = User::withCount(['loans' => function ($query) {
            $query->withTrashed();
        }, 'reservations' => function ($query) {
            $query->withTrashed();
        }])
            ->get()
            ->map(function ($user) {
                $user->all = $user->loans_count + $user->reservations_count;
                return $user;
            })
            ->sortByDesc('all')
            ->take(10)
            ->values();

        $users->map(function ($user, $index) {
            $user->index = 'Top ' . $index + 1;
            return $user;
        })->toArray();


        $zones = Zone::all()->map(function ($zone) {
            $all = 0;
            $book_loans = 0;
            $book_reservations = 0;
            $floor = Floor::find($zone->floor_id)->name;

            foreach ($zone->bookshelves as $bookshelf) {
                foreach ($bookshelf->books as $book) {
                    $book_loans += count($book->loans);
                    $book_reservations += count($book->reservations);
                }
            }
            $all = $book_loans + $book_reservations;
            $zone->floor_name = $floor;
            $zone->all = $all;
            $zone->loans_count = $book_loans;
            $zone->reservations_count = $book_reservations;
            return $zone;
        })->sortByDesc('all')
            ->take(10)
            ->values();

        $zones->map(function ($zone, $index) {
            $zone->index = 'Top ' . $index + 1;
            return $zone;
        })->toArray();

        return Inertia::render('graphs', ['books' => $books, 'users' => $users, 'zones' => $zones]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
