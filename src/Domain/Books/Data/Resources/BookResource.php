<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $author,
        public readonly string $publisher,
        public readonly int $num_pages,
        public readonly string $genres,
        public readonly string $bookshelf_number,
        public readonly string $zone_name,
        public readonly string $floor_name,
        public readonly string $image_path,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        $bookshelf = Bookshelf::find($book->bookshelf_id);
        $zone = Zone::find($bookshelf->zone_id);
        $floor = Floor::find($zone->floor_id);

        return new self(
            id: $book->id,
            name: $book->name,
            author:$book->author,
            publisher: $book->publisher,
            num_pages: $book->num_pages,
            genres: $book->genres,
            bookshelf_number: $bookshelf->number,
            zone_name:$zone->name,
            floor_name:$floor->name,
            image_path: $book->image_path,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
