<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;

use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::factory(30)->create();

        $books = Book::all();

        foreach ($books as $book) {
            $book->addMediaFromUrl('https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg')->toMediaCollection('images');
        }
    }
}
