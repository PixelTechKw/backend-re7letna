<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\QuizAnswer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Quiz::factory(app()->environment('production') ? 2 : 50)->create()->each(function ($quiz) {
            $quiz->questionnaire()->first()->questions()->each(function ($question) use ($quiz) {
                $quiz->answers()->save(QuizAnswer::factory()->create());
            });
        });
    }
}
