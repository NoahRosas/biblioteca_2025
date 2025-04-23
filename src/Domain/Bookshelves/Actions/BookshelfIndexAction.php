<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;

class BookshelfIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $number = $search[0];
        $max_books = $search[1];
        $zone = $search[2];
        $zone_name = $search[3];
        $floor = $search[4];
        $created_at = $search [5];

        $floor_id = Floor::query()->when($floor !== 'null', function ($query) use ($floor) {
            $query->where('name', 'like', $floor);
        })->first()->id;


        $zones = Zone::query()->when($floor !== 'null', function ($query) use ($floor_id){

            $query->where('floor_id', 'like', $floor_id);

        })->when($zone_name !== 'null', function ($query) use ($zone_name) {

            $query->where('name', 'ILIKE', '%' . $zone_name . '%');

        })->when($zone !== 'null', function ($query) use ($zone) {

            $query->where('number', '=',  $zone );

        })->pluck('id');

        
        $bookshelves = Bookshelf::query()
            ->when($number !== "null", function ($query) use ($number) {

                $query->where('number', '=', $number);
            })
            ->when($max_books !== "null", function ($query) use ($max_books) {

                $query->where('max_books', '=', $max_books);
            })
            ->when($zones !== "null", function ($query) use ($zones) {

                $query->whereIn('zone_id', $zones);
            })->when($created_at !== 'null', function ($query) use ($created_at) {

                $query->whereDate('created_at', '=', $created_at);
                
            })
            ->latest()
            ->paginate($perPage);

        return $bookshelves->through(fn($bookshelf) => BookshelfResource::fromModel($bookshelf));
    }
}
