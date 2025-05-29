<?php

namespace App\Models;

use App\Casts\UserAgeCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Child extends Model
{
    /** @use HasFactory<\Database\Factories\ChildFactory> */
    use HasFactory;
    protected $guarded = ['id'];
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'children';
    protected $appends = ['age'];
    protected $hidden = [
        'created_at',
        'deleted_at',
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
            'age' => UserAgeCast::class,
        ];
    }

    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }
    public function parent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class, 'child_id');
    }

    public function latestQuiz()
    {
        return $this->hasOne(Quiz::class)->latestOfMany();
    }

    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categoryable');
    }
}
