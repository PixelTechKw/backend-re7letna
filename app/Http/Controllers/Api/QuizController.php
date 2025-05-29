<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Models\Child;
use App\Models\Questionnaire;
use App\Models\Quiz;
use App\Rules\ValidAnswerStructure;
use Illuminate\Database\QueryException;

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
        try {
            $questions = Questionnaire::find(request()->questionnaire_id)->questions()->get();
            if (collect($request->answers)->pluck('question_id')->sort()->values() != $questions->pluck('id')->sort()->values()) {
                return response()->json([
                    'message' => 'question ids are not valid. check these questions are related to questionnaire.',
                ], 403);
            }
            $answersRequest = collect($request->answers);
            $totalScore = $answersRequest->pluck('value')->sum();
            $percentageScore = $totalScore / ($questions->count() * 100) * 100;
            $request->request->add(['score' => $percentageScore]);
            $validator = validator($request->all(), [
                'child_id' => 'required|exists:children,id',
                'questionnaire_id' => 'required|exists:questionnaires,id',
                'answers' => ['required', 'array', new ValidAnswerStructure(),  "size:{$questions->count()}",],
            ]);
            if ($validator->fails()) {
                return response()->json(["message" => $validator->errors()->all()], 403);
            }
            $element = Quiz::create([
                'child_id' => $request->child_id,
                'questionnaire_id' => $request->questionnaire_id,
                'score' => $request->score,
            ]);
            $element->answers()->createMany($request->answers);
            return $element->load('answers.question', 'questionnaire');
        } catch (QueryException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        $child = request()->user()->children()
            ->where('id', request()->child_id)
            ->first();
        if (!$child || $child->id != $quiz->child_id) {
            return response()->json([
                'message' => 'Child or Quize not found',
            ], 404);
        }
        return $quiz->load(['answers.question.categories' => fn($q) => $q->with('videos', 'tools'), 'questionnaire', 'child']);
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
