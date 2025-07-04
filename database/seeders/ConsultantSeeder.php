<?php

namespace Database\Seeders;

use App\Models\Consultant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConsultantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Consultant::factory(app()->environment('production') ? 2 : 30)->create();
    }
}
