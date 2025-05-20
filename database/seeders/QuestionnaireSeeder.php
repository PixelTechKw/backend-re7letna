<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Questionnaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionnaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Questionnaire::factory(app()->environment('production') ? 2 : 50)->create()->each(function ($q) {
            $q->questions()->createMany(Question::factory(2)->create());
        });
    }
}
