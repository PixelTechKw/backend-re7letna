<?php

namespace App\Http\Controllers\Backend;

use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Throwable;

class SettingController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $element = SettingResource::make(Setting::first());
        return inertia('Backend/Setting/SettingIndex', compact('element'));
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Setting $setting)
    {
        $element = SettingResource::make($setting);
        return inertia('Backend/Setting/SettingEdit', compact('element'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        try {
            $setting = Setting::first();
            DB::beginTransaction();
            $element = $setting->update($request->except(
                'image',
            ));
            DB::commit();
            if ($element) {
                $request->file("image") ? $this->saveMimes(
                    $setting,
                    $request,
                    ["image"],
                    ['800', 800],
                    true,
                    false
                ) : null;
            }
            return redirect()->back()->with('success', trans('general.process_success'));
        } catch (Throwable $e) {
            DB::rollback();
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
