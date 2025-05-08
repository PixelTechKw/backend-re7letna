<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Questionnaire extends Model
{
    /** @use HasFactory<\Database\Factories\QuestionnaireFactory> */
    use HasFactory, ModelHelpers;

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categorable');
    }
}
