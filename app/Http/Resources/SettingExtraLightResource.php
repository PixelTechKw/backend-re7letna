<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingExtraLightResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'caption' => $this->caption,
            'description' => $this->description,
            'country' => $this->country,
            'address' => $this->address,
            'mobile' => $this->mobile,
            'website' => $this->website,
            'facebook' => $this->facebook,
            'twitter' => $this->twitter,
            'youtube' => $this->youtube,
            'instagram' => $this->instagram,
            'linked' => $this->linked,
            'whatsapp' => $this->whatsapp,
            'map_url' => $this->map_url,
            'thumb' => $this->thumb,
            'image_1' => $this->image_1,
            'image_2' => $this->image_2,
            'image_3' => $this->image_3,
        ];
    }
}
