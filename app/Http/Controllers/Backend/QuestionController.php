<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Category;
use App\Models\Question;
use App\Models\Questionnaire;
use App\Models\Quiz;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $validator = validator(request()->all(), [
            'questionnaire_id' => 'required|exists:questionnaires,id',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->all());
        }
        $element = Questionnaire::find(request('questionnaire_id'));
        $elements = Question::where('questionnaire_id', request('questionnaire_id'))->orderBy('order', 'asc')->with('categories')->get();
        return inertia('Backend/Question/QuestionIndex', compact('elements', 'element'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $validator = validator(request()->all(), [
            'questionnaire_id' => 'required|exists:questionnaires,id',
        ]);
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator->errors()->all());
        }
        $categories = Category::active()->orderBy('order', 'asc')->get(['name', 'id']);
        return inertia('Backend/Question/QuestionCreate', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request)
    {
        try {
            $element = Question::create($request->except('categories'));
            $request->has("categories") ? $element->categories()->sync($request->categories) : null;
            return redirect()->route('backend.question.index', ['questionnaire_id' => $element->questionnaire_id])->with('success', 'Question created successfully');
        } catch (QueryException $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        $categories = Category::active()->orderBy('order', 'asc')->get(['name', 'id']);
        return inertia('Backend/Question/QuestionEdit', ['element' => $question->load('categories'), 'categories' => $categories]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuestionRequest $request, Question $question)
    {
        $question->update($request->validated());
        $request->has("categories") ? $question->categories()->sync($request->categories) : null;
        return redirect()->route('backend.question.index', ['questionnaire_id' => $question->questionnaire_id])->with('success', 'Question updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $quizzes = Quiz::where('questionnaire_id', $question->questionnaire_id)->get();
        if ($quizzes->isEmpty()) {
            $question->delete();
            return redirect()->back()->with('success', 'Question deleted successfully');
        }
        return redirect()->back()->with('success', 'Question can not be deleted, some quizzes are using this question. Please delete those quizzes first.');
    }
}
