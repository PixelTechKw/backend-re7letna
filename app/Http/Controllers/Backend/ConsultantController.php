<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Consultant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class ConsultantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Consultant::orderBy('id', 'desc')->get();
        return inertia('Backend/Consultant/ConsultantIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Backend/Consultant/ConsultantCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $element = consultant::create($request->request->all());
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
                return redirect()->route('backend.consultant.index')->with('success', 'consultant created successfully!');
            }
        } catch (Throwable $e) {
            DB::rollback();
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Consultant $consultant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Consultant $consultant)
    {
        return inertia('Backend/Consultant/ConsultantEdit', ['element' => $consultant]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Consultant $consultant)
    {
        $updated = $consultant->update($request->all());
        if ($updated) {
            $request->file("image") ? $this->saveMimes(
                $consultant,
                $request,
                ["image"],
                ["1500", "1500"],
                true,
                false
            ) : null;
            return redirect()->route("backend.consultant.index")->with("success", trans("general.process_success"));
        }
        return redirect()->route("backend.consultant.edit", $consultant->id)->with("error", trans("general.process_failure"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consultant $consultant)
    {
        $consultant->delete();
        return redirect()->route("backend.consultant.index")->with("success", trans("general.process_success"));
    }
}
