<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    protected $guarded = ['id'];
    protected $hidden = [
        'created_at',
        'updated_at',
        'active',
        'pivot'
    ];
    protected function casts(): array
    {
        return [
            'active' => 'boolean'
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
}
