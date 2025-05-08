<?php

namespace Database\Factories;

use App\Models\Questionnaire;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
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
            'order' => fake()->numberBetween(1, 10),
            'questionnaire_id' => Questionnaire::all()->random()->id,
            'answers' => [
                [
                    'value' => 'sometimes',
                    'is_correct' => true,

                ],
                [
                    'value' => 'yes',
                    'is_correct' => true,

                ],
                [
                    'value' => 'no',
                    'is_correct' => false,

                ],
            ]
        ];
    }
}
