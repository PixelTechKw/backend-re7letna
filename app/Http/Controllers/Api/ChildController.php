<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserGenderEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChildRequest;
use App\Http\Requests\UpdateChildRequest;
use App\Models\Child;
use App\Models\Stage;
use Carbon\Carbon;
use Exception;
use Illuminate\Validation\Rule;
use Throwable;

class ChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Child::where('user_id', request()->user()->id)->orderBy('id', 'desc')
            ->with('stage')
            ->paginate(SELF::TAKE_LESS)
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
    public function store(StoreChildRequest $request)
    {
        try {
            $validator = validator(request()->all(), [
                'name' => 'required|string|max:255',
                'gender' => [Rule::in(UserGenderEnum::cases()), 'required'],
                'dob' => 'required|date',
            ]);
            if ($validator->fails()) {
                return response()->json(["message" => $validator->errors()->all()], 403);
            }
            $age = Carbon::parse($request->dob)->age;
            $stage = Stage::where('from', '<=', $age)
                ->where('to', '>=', $age)
                ->firstOr(function () {
                    return Stage::orderByDesc('to')->first();
                });
            $request->request->add(['stage_id' => $stage->id]);
            $element = request()->user()->children()->create($request->all());
            return response()->json($element, 200);
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Child $child)
    {
        if ($child->user_id === request()->user()->id) {
            return response()->json($child->load('stage'), 200);
        }
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Child $child)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChildRequest $request, Child $child)
    {
        try {
            if ($child->user_id !== request()->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            $validator = validator(request()->all(), [
                'name' => 'string|min:3|max:255',
                'gender' => [Rule::in(UserGenderEnum::cases())],
                'dob' => 'date',
            ]);
            if ($validator->fails()) {
                return response()->json(["message" => $validator->errors()->all()], 403);
            }
            $age = Carbon::parse($request->dob)->age;
            $stage = Stage::where('from', '<=', $age)
                ->where('to', '>=', $age)
                ->firstOr(function () {
                    return Stage::orderByDesc('to')->first();
                });
            $request->request->add(['stage_id' => $stage->id]);
            $child->update($request->all());
            return response()->json($child, 200);
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Child $child)
    {
        try {
            if ($child->user_id === request()->user()->id) {
                $child->quizzes()->delete();
                if ($child->delete()) {
                    return response()->json(['message' => trans('general.process_success')], 200);
                }
            }
            return response()->json(['message' => trans('general.process_failure')], 403);
        } catch (\Throwable $e) {
            return response()->json(['message' => trans('general.process_failure')], 403);
        }
    }
}
