<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $validator = validator(request()->all(), [
            'user_id' => 'required|exists:users,id',
            'child_id' => 'required|exists:children,id',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->all());
        }
        $element = Child::whereId(request()->child_id)->with('parent')->first();
        $elements = Quiz::with('questionnaire')->orderby('id', 'desc')->get();
        return inertia('Backend/Quiz/QuizIndex', compact('elements', 'element'));
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
    public function show(Quiz $quiz)
    {
        $element = $quiz->load([
            'child' => fn($q) => $q->with('parent', 'categories'),
            'questionnaire',
            'answers.question'
        ]);
        return inertia('Backend/Quiz/QuizShow', compact('element'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return redirect()->back();
    }
}
