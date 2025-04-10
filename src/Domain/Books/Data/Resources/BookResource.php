<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Floors\Models\Floor;
use Domain\Loans\Models\Loan;
use Domain\Zones\Models\Zone;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $ISBN,
        public readonly string $name,
        public readonly string $author,
        public readonly string $publisher,
        public readonly int $num_pages,
        public readonly string $genres,
        public readonly bool $available,
        public readonly int $ISBN_count,
        public readonly int $ISBN_loan_count,
        public readonly int $bookshelf_id,
        public readonly int $zone_id,
        public readonly string $zone_name,
        public readonly string $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        $bookshelf = Bookshelf::find($book->bookshelf_id);
        $ISBN_books = Book::where('ISBN', $book->ISBN)->pluck('id');
        $loans = Loan::where('borrowed', true)->whereIn('book_id', $ISBN_books);
        $zone = Zone::find($bookshelf->zone_id);
        $floor = Floor::find($zone->floor_id);
        return new self(
            id: $book->id,
            ISBN:$book->ISBN,
            name: $book->name,
            author:$book->author,
            publisher: $book->publisher,
            num_pages: $book->num_pages,
            genres: $book->genres,
            available: $book->activeLoan()->first() === null,
            ISBN_count: $ISBN_books->count(),
            ISBN_loan_count: $loans->count(),
            bookshelf_id: $bookshelf->number,
            zone_id:$zone->number,
            zone_name:$zone->name,
            floor_id:$floor->name,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
