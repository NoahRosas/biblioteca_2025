<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookshelfUpdateAction
{
    public function __invoke(Bookshelf $bookshelf, array $data): BookshelfResource
    {
        $updateData = [
            'number' => $data['number'],
            'zone_id' => $data['zone_id'],
            'max_books' => $data['max_books'],
        ];

        $bookshelf->update($updateData);

        return BookshelfResource::fromModel($bookshelf->fresh());
    }
}