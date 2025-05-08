<?php

namespace Database\Factories;

use App\Models\Child;
use App\Models\Questionnaire;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quiz>
 */
class QuizFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'child_id' => Child::all()->random()->id,
            'questionnaire_id' => Questionnaire::all()->random()->id,
            'score' => fake()->numberBetween(20, 100),
        ];
    }
}
