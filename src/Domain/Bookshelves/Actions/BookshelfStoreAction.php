<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookshelfStoreAction
{
    public function __invoke(array $data):BookshelfResource
    {
        $bookshelf = Bookshelf::create([
            'number' => $data['number'],
            'zone_id' => $data['zone_id'],
            'max_books' => $data['max_books'],
        ]);

        return BookshelfResource::fromModel($bookshelf);
    }
}
