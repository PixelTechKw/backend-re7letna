<?php

namespace App\Models;

use App\Casts\ImageThumbCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tool extends Model
{
    /** @use HasFactory<\Database\Factories\ToolFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $hidden = [
        'created_at',
        'updated_at',
        'active',
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

    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }
}
