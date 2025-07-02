<?php

namespace App\Http\Controllers\Backend;

use App\Enums\LevelEnum;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Video::when(request()->category_id, fn($q) => $q->categories()->where('id', request()->category_id))
            ->orderBy('id', 'desc')->with('categories')->get();
        return inertia('Backend/Video/VideoIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $levels = collect(LevelEnum::cases())->pluck('value');
        $categories = Category::active()->orderBy('order', 'asc')->get(['name', 'id']);
        return inertia('Backend/Video/VideoCreate', compact('levels', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $element = Video::create($request->request->all());
            DB::commit();
            if ($element) {
                $request->file("image") ? $this->saveMimes(
                    $element,
                    $request,
                    ["image"],
                    ["1500", "1500"],
                    true,
                    false
                ) : null;
                $request->has("categories") ? $element->categories()->sync($request->categories) : null;
                return redirect()->route("backend.video.edit", $element)->with("success", trans("general.process_success"));
            }
        } catch (Throwable $e) {
            DB::rollback();
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        $levels = collect(LevelEnum::cases())->pluck('value');
        $categories = Category::active()->orderBy('order', 'asc')->get(['name', 'id']);
        return inertia('Backend/Video/VideoEdit', ['element' => $video->load('categories'), 'levels' => $levels, 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        $updated = $video->update($request->all());
        if ($updated) {
            $request->file("image") ? $this->saveMimes(
                $video,
                $request,
                ["image"],
                ["1500", "1500"],
                true,
                false
            ) : null;
            $request->has("categories") ? $video->categories()->sync($request->categories) : null;
            return redirect()->route("backend.video.index")->with("success", trans("general.process_success"));
        }
        return redirect()->route("backend.video.edit", $video->id)->with("error", trans("general.process_failure"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        $video->categories()->sync([]);
        $video->delete();
        return redirect()->route("backend.video.index")->with("success", trans("general.process_success"));
    }
}
