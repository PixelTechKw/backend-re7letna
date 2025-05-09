<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuizAnswer>
 */
class QuizAnswerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quiz_id' => Quiz::all()->random()->id,
            'question_id' => Question::all()->random()->id,
            'name' => fn($array) => collect(Question::whereId($array['question_id'])->first()->answers)->random()['name'],
            'value' => fn($array) => collect(Question::whereId($array['question_id'])->first()->answers)->where('name', $array['name'])->first()['value'],
        ];
    }
}
