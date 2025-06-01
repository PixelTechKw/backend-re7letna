<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionnaireRequest;
use App\Http\Requests\StoreQuestionRequest;
use App\Models\Questionnaire;
use App\Models\Stage;
use Illuminate\Http\Request;

class QuestionnaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elements = Questionnaire::when(request()->stage_id, fn($q) => $q->where('state_id', request()->stage_id))
            ->orderBy('order', 'asc')->with('stage')->withCount('questions')->get();
        return inertia('Backend/Questionnaire/QuestionnaireIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $stages = Stage::all();
        return inertia('Backend/Questionnaire/QuestionnaireCreate', compact('stages'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionnaireRequest $request)
    {
        $element = Questionnaire::create($request->validated());
        return redirect()->route('backend.questionnaire.index')->with('message', 'Questionnaire created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Questionnaire $questionnaire)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Questionnaire $questionnaire)
    {
        $stages = Stage::all();
        $element = $questionnaire->load('stage');
        return inertia('Backend/Questionnaire/QuestionnaireEdit', compact('element', 'stages'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Questionnaire $questionnaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Questionnaire $questionnaire)
    {
        $questionnaire->load('quizzes');
        if ($questionnaire->quizzes->isEmpty()) {
            $questionnaire->delete();
            return redirect()->route('backend.questionnaire.index')->with('message', 'Questionnaire deleted successfully');
        }
        return redirect()->route('backend.questionnaire.index')->with('message', 'Questionnaire has quizzes, you can not delete it');
    }
}
