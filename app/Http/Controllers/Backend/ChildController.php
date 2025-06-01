<?php

namespace App\Http\Controllers\Backend;

use App\Enums\UserGenderEnum;
use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\Stage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $validator = validator(request()->all(), [
            'user_id' => 'required|exists:users,id',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->all());
        }
        $element = User::where('id', request()->user_id)->first();
        $elements = Child::where('user_id', request()->user_id)->with('stage')->orderBy('created_at', 'desc')->get();
        return inertia('Backend/Child/ChildIndex', compact('elements', 'element'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $validator = validator(request()->all(), [
            'user_id' => 'required|exists:users,id',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->all());
        }
        $element = User::where('id', request()->id)->first();
        $genders = collect(UserGenderEnum::cases())->pluck('value');
        return inertia('Backend/Child/ChildCreate', compact('genders', 'element'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = validator(request()->all(), [
                'name' => 'required|string|max:255',
                'user_id' => 'required|exists:users,id',
                'gender' => [Rule::in(UserGenderEnum::cases()), 'required'],
                'dob' => 'required|date',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator->errors()->all());
            }
            $age = Carbon::parse($request->dob)->age;
            $stage = Stage::where('from', '<=', $age)
                ->where('to', '>=', $age)
                ->firstOr(function () {
                    return Stage::orderByDesc('to')->first();
                });
            $request->request->add(['stage_id' => $stage->id]);
            User::whereId(request()->user_id)->first()->children()->create($request->all());
            return redirect()->route('backend.child.index', ['user_id' => request()->user_id])->with(['message' => 'Child created successfully']);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Child $child)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Child $child)
    {
        $element = $child->load('parent', 'stage');
        $genders = collect(UserGenderEnum::cases())->pluck('value');
        return inertia('Backend/Child/ChildEdit', compact('element', 'genders'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Child $child)
    {
        try {
            $validator = validator(request()->all(), [
                'name' => 'required|string|max:255',
                'user_id' => 'required|exists:users,id',
                'gender' => [Rule::in(UserGenderEnum::cases()), 'required'],
                'dob' => 'required|date',
            ]);
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator->errors()->all());
            }
            $age = Carbon::parse($request->dob)->age;
            $stage = Stage::where('from', '<=', $age)
                ->where('to', '>=', $age)
                ->firstOr(function () {
                    return Stage::orderByDesc('to')->first();
                });
            $request->request->add(['stage_id' => $stage->id]);
            $child->update($request->all());
            return redirect()->route('backend.child.index', ['user_id' => request()->user_id])->with(['message' => 'Child created successfully']);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Child $child)
    {
        try {
            $child->quizzes()->delete();
            if ($child->delete()) {
                return redirect()->back()->with(['message' => trans('general.process_success')]);
            }
            return redirect()->back()->withErrors(trans('general.process_failure'));
        } catch (\Throwable $e) {
            return redirect()->back()->withErrors(trans('general.process_failure'));
        }
    }
}
