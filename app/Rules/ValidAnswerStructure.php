<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidAnswerStructure implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            $fail('The answers must be an array');
        }
        foreach ($value as $item) {
            if (
                !is_array($item) ||
                !isset($item['question_id']) ||
                !isset($item['name']) ||
                !isset($item['value'])
            ) {
                $fail('The answers array must contain items with question_id, name, and value (50, 100, or 9)');
            }

            if (!in_array($item['value'], [50, 100, 0])) {
                $fail('The value must be one of the following: 50, 100, or 0');
            }
            if (!in_array($item['name'], ['نعم', 'أحيانا', 'لا'])) {
                $fail('The value must be one of the following: نعم, احيانا, or لا');
            }
        }
    }

    public function message()
    {
        return 'The answers array must contain items with question_id, name, and value (50, 100, or 9)';
    }
}
