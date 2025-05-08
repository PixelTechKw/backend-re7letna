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
            'description' => fake()->realText(),
            'url' => fake()->url(),
            'level' => fake()->randomElement(LevelEnum::cases()),
        ];
    }
}
