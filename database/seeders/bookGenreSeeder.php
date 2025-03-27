<?php

namespace Database\Seeders;

use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Seeder;

class bookGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $books = Book::all();
        foreach ($books as $book) {
            $genres = $book->explode(', ', $book->genres);
            foreach ($genres as $genre) {
                $genreToSync = Genre::where($genre);
                
            }
        }
    }
}
