<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Casts\DateCast;
use App\Casts\isAdminCast;
use App\Casts\UserAgeCast;
use App\Enums\UserGenderEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens, ModelHelpers;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'dob',
        'gender',
        'password',
        'active'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at',
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
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'dob' => DateCast::class,
            'gender' => UserGenderEnum::class,
            'active' => 'boolean',
            'is_admin' => isAdminCast::class,
            'age' => UserAgeCast::class,
        ];
    }

    public function children()
    {
        return $this->hasMany(Child::class, 'user_id');
    }

    public function quizes(): HasMany
    {
        return $this->hasMany(Quiz::class, 'user_id');
    }

    public function scopeAdmin($query)
    {
        return $query->where('id', '=', 1);
    }

    public function scopeNotAdmin($query)
    {
        return $query->where('id', '!=', 1);
    }

    /**
     * Get all of the cateogries for the user.
     */
    public function categories(): MorphToMany
    {
        return $this->morphToMany(Category::class, 'categoryables');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
