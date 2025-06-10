<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Tool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class ToolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Tool::orderBy('id', 'desc')->get();
        return inertia('Backend/Tool/ToolIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Backend/Tool/ToolCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $element = Tool::create($request->request->all());
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
                return redirect()->route('backend.tool.index')->with('success', 'Tool created successfully!');
            }
        } catch (Throwable $e) {
            DB::rollback();
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Tool $tool)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tool $tool)
    {
        return inertia('Backend/Tool/ToolEdit', ['element' => $tool]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tool $tool)
    {
        $updated = $tool->update($request->all());
        if ($updated) {
            $request->file("image") ? $this->saveMimes(
                $tool,
                $request,
                ["image"],
                ["1500", "1500"],
                true,
                false
            ) : null;
            return redirect()->route("backend.tool.index")->with("success", trans("general.process_success"));
        }
        return redirect()->route("backend.tool.edit", $tool->id)->with("error", trans("general.process_failure"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tool $tool)
    {
        $tool->delete();
        return redirect()->back()->with('success', 'Tool deleted successfully!');
    }
}
