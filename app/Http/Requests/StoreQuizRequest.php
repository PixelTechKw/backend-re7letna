<?php

namespace App\Http\Requests;

use App\Rules\ValidAnswerStructure;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuizRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && request()->user()->children()->pluck('id')->contains($this->child_id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questionnaire_id' => 'required|exists:questionnaires,id',
            'answers' => ['required', 'array', new ValidAnswerStructure()],
            'order' => 'required|integer',
        ];
    }
}
