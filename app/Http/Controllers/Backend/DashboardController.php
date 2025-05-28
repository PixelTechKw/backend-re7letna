<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\Search\UserFilters;


class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(UserFilters $filters)
    {
        return redirect()->route('backend.user.index');
    }
}
