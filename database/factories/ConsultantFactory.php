<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Consultant>
 */
class ConsultantFactory extends Factory
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
            'mobile' => fake()->numberBetween(11111111, 999999999),
            'email' => fake()->unique()->safeEmail(),
            'description' => fake()->sentence,
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
