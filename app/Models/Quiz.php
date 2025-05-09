<?php

namespace App\Models;

use App\Casts\DateCast;
use App\Casts\TotalScoreCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;
    protected $guarded = ['id'];
    protected $hidden = ['updated_at'];
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'score_percentage' => TotalScoreCast::class,
            'created_at' => DateCast::class
        ];
    }

    public function stage(): HasOneThrough
    {
        return $this->hasOneThrough(Questionnaire::class, Stage::class);
    }

    public function questionnaire(): BelongsTo
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }

    public function user(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Child::class);
    }

    public function answers(): HasMany
    {
        return $this->hasMany(QuizAnswer::class);
    }
}
