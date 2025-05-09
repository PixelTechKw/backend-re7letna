<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Models\Child;
use App\Models\Quiz;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        request()->validate([
            'child_id' => 'sometimes|exists:children,id',
        ]);
        $child = request()->user()->children()
            ->where('id', request('child_id'))
            ->first();
        if (!$child) {
            return response()->json([
                'message' => 'Child not found',
            ], 404);
        }
        $elements = Quiz::with('answers.question', 'questionnaire')
            ->when(request('child_id'), function ($query) {
                return $query->where('child_id', request('child_id'));
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
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
    public function store(StoreQuizRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        $child = request()->user()->children()
            ->where('id', $quiz->child_id)
            ->first();
        if (!$child) {
            return response()->json([
                'message' => 'Child not found',
            ], 404);
        }
        return $quiz->load('answers.question', 'questionnaire');
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
    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        //
    }
}
