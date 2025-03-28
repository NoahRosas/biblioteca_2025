<?php

namespace Domain\Bookshelves\Actions;

use Domain\Bookshelves\Data\Resources\BookshelfResource;
use Domain\Bookshelves\Models\Bookshelf;

class BookshelfIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10){
        
    
        $bookshelves = Bookshelf::query()
            ->when($search, function ($query, $search) {
                $query->where('id', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);

        return $bookshelves->through(fn ($bookshelf) => BookshelfResource::fromModel($bookshelf));
    
    }
}