<?php

namespace Database\Factories;

use Domain\Floors\Models\Floor;
use Domain\Genres\Models\Genre;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Zone>
 */
class ZoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return string
     */
    protected $model = Zone::class;
     /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $floor = Floor::all()->random();
        $genres = Genre::all()->pluck('name')->toArray();
        return [
            'name' => fake()->randomElement($genres),
            'number' => fake()->numberBetween(1, $floor->max_zones),
            'max_bookshelves' => fake()->numberBetween(50, 100),
            'floor_id' => $floor->id
            
        ];
    }
}
