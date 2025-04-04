<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Symfony\Component\HttpFoundation\FileBag;

class BookStoreAction
{
    public function __invoke(array $data, FileBag $image):BookResource
    {
        $book = Book::create([
            'name' => $data['name'],
            'author' => $data['author'],
            'publisher' => $data['publisher'],
            'num_pages' => $data['num_pages'],
            'bookshelf_id' => $data['bookshelf_id'],
            'genres' => $data['genres'],
        ]);

        foreach ($image as $img) {
            $book->addMedia($img)->toMediaCollection('images', 'images');
        }
        return BookResource::fromModel($book);
    }
}
