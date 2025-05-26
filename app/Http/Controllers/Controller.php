<?php

namespace App\Http\Controllers;

use App\Http\Resources\SettingResource;
use App\Models\Setting;
use App\Services\AppMeta;
use App\Services\Traits\DashboardTrait;
use App\Services\Traits\ImageHelpers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
abstract class Controller
{
    use DashboardTrait, ImageHelpers, AuthorizesRequests, ValidatesRequests;
    const TAKE_MAX = 100;
    const TAKE_LARGE = 50;
    const TAKE_MID = 24;
    const TAKE_LESS = 12;
    const TAKE_MIN = 6;
    public function __construct()
    {
        $this->setting = SettingResource::make(Setting::first());
        AppMeta::addProperty('og:image', asset($this->setting->thumb));
        AppMeta::addMeta('description', asset($this->setting->description ?? $this->setting->caption));
        AppMeta::addMeta('image', asset($this->setting->thumb));
        AppMeta::addMeta('phone', $this->setting->phone);
        AppMeta::addMeta('whatsapp', $this->setting->whatsapp);
        AppMeta::addMeta('address', $this->setting->address);
        AppMeta::addMeta('keywords', $this->setting->keywords);
        AppMeta::addMeta('url', $this->setting->website);
        AppMeta::addMeta('site_name', ucfirst($this->setting->name));
        AppMeta::addMeta('linkedin', $this->setting->linked);
        AppMeta::addMeta('instagram', $this->setting->instagram);
    }
}
