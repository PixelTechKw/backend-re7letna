<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Stage;
use Illuminate\Http\Request;

class StageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Stage::orderBy('id', 'desc')->get();
        return inertia('Backend/Stage/StageIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Backend/Stage/StageCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $element = Stage::create($request->all());
        return redirect()->route('backend.stage.index')->with('success', 'Stage created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Stage $stage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stage $stage)
    {
        return inertia('Backend/Stage/StageEdit', ['element' => $stage]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stage $stage)
    {
        $element = $stage->update($request->all());
        return redirect()->route('backend.stage.index')->with('success', 'Stage updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stage $stage)
    {
        if ($stage->children()->get()->isEmpty()) {
            $stage->questionnaires()->delete();
            $stage->videos()->sync([]);
            $stage->delete();
            return redirect()->route('backend.stage.index')->with('success', 'Stage deleted successfully');
        }
        return redirect()->route('backend.stage.index')->withError(['message' => 'you can not delete this stage, it has children']);
    }
}
