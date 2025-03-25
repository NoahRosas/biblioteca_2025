<?php

namespace Database\Factories;

use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Floor>
 */
class FloorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return string
     */
    protected $model = Floor::class;

     /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement(array('1st Floor', '2nd Floor', '3rd Floor')),
            'max_zones' => fake()->numberBetween(10, 20)
            
        ];
    }
}
