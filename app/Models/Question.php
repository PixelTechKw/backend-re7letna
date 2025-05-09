<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Question extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    use HasFactory, ModelHelpers;
    protected $guarded = ['id'];
    protected $hidden = [
        'created_at',
        'updated_at',
        'active'
    ];
    protected function casts(): array
    {
        return [
            'answers' => 'array',
            'active' => 'boolean'
        ];
    }


    public function questionnaire(): BelongsTo
    {
        return $this->belongsTo(Questionnaire::class);
    }
    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }
}
