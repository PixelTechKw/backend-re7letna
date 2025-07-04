<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'info@rehlatna.net',
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Parent',
            'email' => 'parent@rehlatna.com',
        ]);
        $this->call(UserSeeder::class);
        $this->call(VideoSeeder::class);
        $this->call(ToolSeeder::class);
        $this->call(StageSeeder::class);
        $this->call(ChildSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(QuizSeeder::class);
        $this->call(ConsultantSeeder::class);
        $this->call(CommentSeeder::class);
        $this->call(SettingSeeder::class);
    }
}
