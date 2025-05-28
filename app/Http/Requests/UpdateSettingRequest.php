<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'whatsapp' => 'required|min:8|max:11',
            'mobile' => 'required|min:8|max:11',
            'facebook' => 'url|nullable',
            'website' => 'url|nullable',
            'android' => 'url|nullable',
            'apple' => 'url|nullable',
            'youtube' => 'url|nullable',
            'instagram' => 'url|nullable',
            'facebook' => 'url|nullable',
            'twitter' => 'url|nullable',
            'whatsapp' => 'required|min:8|max:11',
            'snapchat' => 'url|nullable',
            'tiktok' => 'url|nullable',
            'telegram' => 'url|nullable',
            // 'code_of_conduct_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'curriculum_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'data_privacy_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'cookie_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'esafty_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'safeguarding_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'language_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'performance_management_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
            // 'complaints_policy_attachment' => 'nullable|string|max:100000|mimes:xlsx,doc,docx,ppt,pptx,pdf,zip',
        ];
    }
}
