<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|min:3|max:25"
        ];
    }

    public function messages(): array
    {
        return [
            "name.required" => "The category name is required.",
            "name.string" => "The category name must be a valid string.",
            "name.min" => "The category name must be at least :min characters long.",
            "name.max" => "The category name must be at most :max characters long.",
        ];
    }
}
