<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Models\Course;
use App\Models\Page;
use App\Models\User;
use App\Services\Search\CourseFilters;
use App\Services\Search\UserFilters;
use Illuminate\Support\Facades\DB;
use Throwable;

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
