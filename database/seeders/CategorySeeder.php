<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tool;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory(app()->environment('production') ? 2 : 10)->create()->each(function ($q) {
            $q->tools()->saveMany(Tool::factory(2)->make());
        });
    }
}
