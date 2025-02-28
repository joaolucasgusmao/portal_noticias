<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BannerRequest extends FormRequest
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
        $rules = [
            "image" => ["url", "regex:/\\.(jpg|jpeg|png|webp|gif)$/i"],
            "link" => "sometimes|url",
            "top" => "sometimes|boolean",
            "side" => "sometimes|boolean",
            "home" => "sometimes|boolean",
            "is_active" => "sometimes|boolean",
            "description" => "nullable|string|min:5|max:255",
        ];

        if ($this->isMethod("post")) {
            $rules["image"][] = "required";
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            "image.required" => "The image field is required.",
            "image.url" => "The image field must be a valid URL.",
            "image.regex" => "The image URL must end in .jpg, .jpeg, .png, .webp or .gif",

            "link.url" => "The link field must be a valid URL.",

            "description.string" => "The description field must be a text.",
            "description.min" => "The description must be at least :min characters.",
            "description.max" => "The description must be at most :max characters.",

            "side.boolean" => "The side field must be true or false.",
            "top.boolean" => "The top field must be true or false.",
            "home.boolean" => "The home field must be true or false.",
            "is_active.boolean" => "The is_active field must be true or false.",
        ];
    }
}
