<?php

namespace Database\Factories;

use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Genre>
 */
class GenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return string
     * 
     */
    protected $model = Genre::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement($array = array('Fantasy', 'Romantic', 'Manga', 'Maths', 'Biology', 'Computer Science', 'Programming', 'Algebra', 'Sports', 'Mistery', 'Horror', 'Thriller', 'Philosophy', 'Robotics'))
        ];
    }
}
