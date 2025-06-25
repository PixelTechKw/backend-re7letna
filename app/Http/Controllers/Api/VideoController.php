<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Category;
use App\Models\Video;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Video::active()
            ->when(request()->category_id, function ($q) {
                $q->whereHas('categories', function ($q) {
                    $q->where('category_id', request()->category_id);
                });
            })
            ->when(request()->stage_id, function ($q) {
                $q->whereHas('stages', function ($q) {
                    $q->where('stage_id', request()->stage_id);
                });
            })
            ->when(request()->level, function ($q) {
                $q->where('level', request()->level);
            })
            ->with('categories', 'stages')
            ->orderBy('order', 'asc')
            ->paginate(SELF::TAKE_MIN)
            ->setPath('?')
            ->withQueryString();
        return $elements;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        return $video->load('categories');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVideoRequest $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        //
    }
}
