<?php

namespace App\Models;

trait ModelHelpers
{
    /**
     * @param $q
     * @return \Illuminate\Database\Eloquent\Builder
     * QueryFilters used within the search
     */
    public function scopeActive($q): void
    {
        $q->where("active", true);
    }
}
