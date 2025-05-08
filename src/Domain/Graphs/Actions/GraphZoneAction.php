<?php

namespace Domain\Graphs\Actions;

use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;

class GraphZoneAction
{
    public function __invoke()
    {
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
        // dd($zones);
        return $zones;
    }
}
