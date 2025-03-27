<?php

namespace Domain\Bookshelves\Data\Resources;

use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookshelfResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $number,
        public readonly int $max_books,
        public readonly string $floor_name,
        public readonly string $zone_name,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Bookshelf $bookshelf): self
    {
        $zone = Zone::find($bookshelf->zone_id);
        $floor = Floor::find($zone->floor_id);

        return new self(
            id: $bookshelf->id,
            number: $bookshelf->number,
            max_books: $bookshelf->max_books,
            floor_name:$floor->name,
            zone_name:$zone->name,
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
