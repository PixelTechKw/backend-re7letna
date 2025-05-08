<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Child;
use App\Models\Quiz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Child::factory(app()->environment('production') ? 2 : 100)->create()->each(function ($q) {
            
        });
    }
}
