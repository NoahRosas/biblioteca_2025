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
            $genres = explode(', ', $book->genres);
            $genreIds = [];
            foreach ($genres as $genre) {
                $genre = Genre::where('name', $genre)->first();
                if ($genre) {
                    $genreIds[] = $genre->id;
                }
                
            }
            $book->genres()->syncWithoutDetaching($genreIds);
        }
    }
}
