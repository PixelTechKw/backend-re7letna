<?php

namespace App\Models;

use App\Casts\ImageLargeCast;
use App\Casts\ImageThumbCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $appends = ['thumb', 'large'];
    protected $casts = [
        'thumb' => ImageThumbCast::class,
        'large' => ImageLargeCast::class,
    ];
}
