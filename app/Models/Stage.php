<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stage extends Model
{
    /** @use HasFactory<\Database\Factories\StageFactory> */
    use HasFactory;
    protected $guarded = ['id'];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    protected function casts(): array
    {
        return [
            'to' => 'integer',
            'from' => 'integer',
        ];
    }

    public function children(): HasMany
    {
        return $this->hasMany(Child::class);
    }
    public function questionnaires(): HasMany
    {
        return $this->hasMany(Questionnaire::class);
    }

    public function videos(): BelongsToMany
    {
        return $this->belongsToMany(Video::class, 'video_stage');
    }
}
