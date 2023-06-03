<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Todo extends Model
{
    protected $fillable = [
        'user_id',
        'item_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    protected function isComplete(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => (bool)($value),
        );
    }

    public function user(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
