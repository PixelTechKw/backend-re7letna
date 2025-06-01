<?php

namespace App\Models;

use App\Enums\LevelEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Monolog\Level;

class Video extends Model
{
    /** @use HasFactory<\Database\Factories\VideoFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'level' => LevelEnum::class,
            'active' => 'boolean',
        ];
    }

    public function stages(): BelongsToMany
    {
        return $this->belongsToMany(Stage::class, 'video_stage');
    }

    /**
     * Get all of the cateogries for the user.
     */
    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }
}
