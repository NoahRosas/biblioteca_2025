<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Symfony\Component\HttpFoundation\FileBag;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data, FileBag $img_path): BookResource
    {
        $updateData = [
            'name' => $data['name'],
            'author' => $data['author'],
            'publisher' => $data['publisher'],
            'num_pages' => $data['num_pages'],
            'bookshelf_id' => $data['bookshelf_id'],
            'genres' => $data['genres'],
        ];

        $book->update($updateData);
        
        foreach ($img_path as $img) {
            $book->updateMedia($img)->toMediaCollection('images', 'images');
        }

        return BookResource::fromModel($book->fresh());
    }
}
