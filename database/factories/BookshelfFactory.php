<?php

namespace Database\Factories;

use Domain\Bookshelves\Models\Bookshelf;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Bookshelves\Models\Bookshelf>
 */
class BookshelfFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return string
     */
    protected $model = Bookshelf::class;
   /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $zone = Zone::all()->random();

        return [
            'number' => fake()->numberBetween(1, $zone->max_bookshelves),
            'max_books' => fake()->numberBetween(20, 40),
            'zone_id' => $zone->id,
            
        ];
    }
}
