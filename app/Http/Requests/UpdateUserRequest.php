<?php

namespace App\Http\Requests;

use App\Enums\UserGenderEnum;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Spatie\Permission\Models\Role;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return request()->user()->can('user_index');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['string', 'required', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore(request()->user_id)],
            'role' => ['required', Rule::in(Role::all()->pluck('name'))],
            'mobile' => ['nullable', 'min:6', 'max:16', 'regex:/[0-9]/', Rule::unique(User::class)->ignore(request()->user_id)],
            'dob' => 'nullable|date',
            'gender' => ['required', Rule::in(UserGenderEnum::cases())],
            'image' => 'nullable|image',
        ];
    }
}
