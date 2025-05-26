<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Setting>
 */
class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => 'Re7letna',
            'caption' => 'rehletana',
            'description' => 'rehletana',
            'address' => 'Kuwait City',
            'mobile' => '02039299770',
            'whatsapp' => '02039299770',
            'country' => 'Kuwait',
            'zipcode' => 'Kuwait',
            'image' => 'logo.png',
            'email' => 'contact@mail.re7letna.com',
            'website' => 'https://re7letna.com',
            'android' => '',
            'tiktok' => '',
            'telegram' => '',
            'apple' => '',
            'youtube' => '',
            'instagram' => 'https://google.com/',
            'twitter' => '',
            'snapchat' => '',
            'linked' => 'https://www.linkedin.com/company/re7letna/',
            'facebook' => '',
            'map_url' => 'https://www.google.co.uk/maps/place/77+Farriers+walk/@51.4896397,-0.2228233,19.32z/data=!4m7!3m6!1s0x48760fb9f99e5555:0x3191f17b9e8f81ac!4b1!8m2!3d51.4895537!4d-0.2226892!16s%2Fg%2F11fsmd60z4?hl=en&entry=ttu&g_ep=EgoyMDI1MDIwOS4wIKXMDSoASAFQAw%3D%3D',
            'keywords' => 'Triple-A standard software development by world experts for Kuwait and the GCC region, Industry leading design & architecture using the latest software development standards to provide snappy, responsive applications.',
            'aboutus' => 'aboutus',
            'policy' => 'policy',
            'terms_and_conditions' => 'terms'

        ];
    }
}
