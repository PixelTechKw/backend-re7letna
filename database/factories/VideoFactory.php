<?php

namespace Database\Factories;

use App\Enums\LevelEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Monolog\Level;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->sentence,
            'url' => fake()->randomElement(['https://www.youtube.com/watch?v=t45FopmV_y0', 'https://www.youtube.com/watch?v=AyKvvHFx0bU']),
            'level' => fake()->randomElement(LevelEnum::cases()),
            'order' => fake()->numberBetween(1, 50),
        ];
    }
}
