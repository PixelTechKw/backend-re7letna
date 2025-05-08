<?php

namespace Database\Factories;

use App\Enums\UserGenderEnum;
use App\Models\Stage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Child>
 */
class ChildFactory extends Factory
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
            'dob' => fake()->dateTimeBetween('-18 years', '- 2 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(UserGenderEnum::cases()),
            'stage_id' => fn($array) => Stage::where('to', '>=', Carbon::parse($array['dob'])->age)->first()->id,
            'user_id' => User::notAdmin()->get()->random()->id,
        ];
    }
}
