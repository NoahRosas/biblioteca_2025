<?php

namespace Database\Factories;

use Domain\Books\Models\Book;
use Domain\Bookshelves\Models\Bookshelf;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return string
     */
    protected $model = Book::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       $genres = Genre::all()->pluck('name');
        $bookshelf = Bookshelf::all()->random();
        return [
            'name' => fake()->name(),
            'author' => fake()->name(),
            'publisher' => fake()->company(),
            'num_pages' => fake()->numberBetween(50, 1200),
            'genres'=>implode(', ', fake()->randomElements($array=$genres, $count=fake()->numberBetween(1, 3))),
            'bookshelf_id' => $bookshelf->id,
        ];
    }
}
