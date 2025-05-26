<?php

namespace App\Models;

use App\Services\Search\QueryFilters;

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

    /**
     * @param $q
     * @param QueryFilters $filters
     * @return \Illuminate\Database\Eloquent\Builder
     * QueryFilters used within the search
     */
    public function scopeFilters($q, QueryFilters $filters)
    {

        return $filters->apply($q);
    }

    public function getPathLinkAttribute()
    {
        return asset(env("FILES") . $this->path);
    }

    public function getFileLinkAttribute()
    {
        return asset(env("FILES") . $this->file);
    }
}
