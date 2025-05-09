<?php

namespace App\Models;

use App\Casts\ImageThumbCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultant extends Model
{
    /** @use HasFactory<\Database\Factories\ConsultantFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $table = 'consultants';
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    protected $appends = [
        'thumb',
    ];
    protected function casts(): array
    {
        return [
            'thumb' => ImageThumbCast::class,
            'active' => 'boolean'
        ];
    }
}
