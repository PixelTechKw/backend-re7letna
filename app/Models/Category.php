<?php

namespace App\Models;

use App\Casts\ImageLargeCast;
use App\Casts\ImageThumbCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $appends = ['thumb'];
    protected $hidden = [
        'created_at',
        'updated_at',
        'active',
        'pivot'
    ];
    protected function casts(): array
    {
        return [
            'thumb' => ImageThumbCast::class,
            'large' => ImageLargeCast::class,
            'active' => 'boolean',
            'order' => 'integer',
        ];
    }
    public function videos(): MorphToMany
    {
        return $this->morphedByMany(Video::class, 'categoryable');
    }

    public function questions(): MorphToMany
    {
        return $this->morphedByMany(Question::class, 'categoryable');
    }


    public function tools(): MorphToMany
    {
        return $this->morphedByMany(Tool::class, 'categoryable');
    }

    public function children(): MorphToMany
    {
        return $this->morphedByMany(Child::class, 'categoryable');
    }
}
