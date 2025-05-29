<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Questionnaire extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionnaireFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $hidden = [
        'created_at',
        'updated_at',
        'active'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
