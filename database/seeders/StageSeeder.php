<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Question;
use App\Models\Questionnaire;
use App\Models\Stage;
use App\Models\Tool;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stages = collect([
            [
                'from' => 0,
                'to' => 4,
            ],
            [
                'from' => 5,
                'to' => 8,
            ],
            [
                'from' => 9,
                'to' => 12,
            ],
            [
                'from' => 13,
                'to' => 18,
            ],
        ]);
        $stages->each(fn($g) => Stage::factory()->create([
            'name' => fake()->name(),
            'description' => fake()->sentence,
            'from' => $g['from'],
            'to' => $g['to'],
        ])->each(function ($s) {
            $s->questionnaires()->saveMany(Questionnaire::factory(app()->environment('production') ? 1 : 5)->create()->each(function ($q) use ($s) {
                $q->questions()->saveMany(Question::factory(app()->environment('production') ? 1 : 2)->create())->each(function ($q) use ($s) {
                    $q->categories()->saveMany(Category::factory(1)->create()->each(function ($c) use ($s) {
                        $c->tools()->saveMany(Tool::factory(app()->environment('production') ? 1 : 22)->make());
                        Video::factory(app()->environment('production') ? 1 : 2)->create()->each(function ($v) use ($c, $s) {
                            $v->stages()->attach($s->id);
                            $v->categories()->save($c);
                        });
                    }));
                });
            }));
        }));
    }
}
