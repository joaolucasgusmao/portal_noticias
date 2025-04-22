<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsRequest extends FormRequest
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
            "hat" => "nullable|string|min:3|max:30",
            "title" => "required|string|min:5|max:255",
            "slug" => "required|string|min:5|max:255",
            "summary" => "nullable|string|min:5|max:255",
            "image" => ["required", "url", "regex:/\\.(jpg|jpeg|png|webp)$/i"],
            "content" => "required|string|min:5",
            "caption" => "nullable|string|min:5|max:255",
            "topics" => "nullable|array",
            "topics.*" => "string|min:3|max:50",
            "is_fixed" => "sometimes|boolean",
            "is_draft" => "sometimes|boolean",
            "is_active" => "sometimes|boolean",
            "categories" => "required|array",
            "categories.*" => "required|integer|exists:categories,id",
        ];

        if ($this->isMethod("patch")) {
            $rules["title"] = "sometimes|string|min:5|max:255";
            $rules["slug"] = "sometimes|string|min:5|max:255";
            $rules["summary"] = "sometimes|nullable|string|min:5|max:255";
            $rules["image"] = ["sometimes", "url", "regex:/\\.(jpg|jpeg|png|webp)$/i"];
            $rules["content"] = "sometimes|string|min:5";
            $rules["caption"] = "sometimes|nullable|string|min:5|max:255";
            $rules["topics"] = "sometimes|nullable|array";
            $rules["topics.*"] = "sometimes|string|min:3|max:50";
            $rules["categories"] = "sometimes|array|min:1";
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            "hat.string" => "The hat field must be a text.",
            "hat.min" => "The hat field must have at least :min characters.",
            "hat.max" => "The hat field must have at most :max characters.",

            "title.required" => "The title field is required.",
            "title.string" => "The title must be a text.",
            "title.min" => "The title must have at least :min characters.",
            "title.max" => "The title must have at most :max characters.",

            "slug.required" => "The slug field is required.",
            "slug.string" => "The slug must be a text.",
            "slug.min" => "The slug must have at least :min characters.",
            "slug.max" => "The slug must have at most :max characters.",

            "summary.string" => "The summary must be a text.",
            "summary.min" => "The summary must have at least :min characters.",
            "summary.max" => "The summary must have at most :max characters.",

            "image.required" => "The image field is required.",
            "image.url" => "The image field must be a valid URL.",
            "image.regex" => "The image URL must end with .jpg, .jpeg, .png, or .webp.",

            "content.required" => "The content field is required.",
            "content.string" => "The content must be a text.",
            "content.min" => "The content must have at least :min characters.",

            "caption.string" => "The caption must be a text.",
            "caption.min" => "The caption must have at least :min characters.",
            "caption.max" => "The caption must have at most :max characters.",

            "topics.array" => "The topics field must be an array.",
            "topics.*.string" => "Each topic must be a text.",
            "topics.*.min" => "Each topic must have at least :min characters.",
            "topics.*.max" => "Each topic must have at most :max characters.",

            "is_fixed.boolean" => "The 'is_fixed' field must be true or false.",
            "is_draft.boolean" => "The 'is_draft' field must be true or false.",
            "is_active.boolean" => "The 'is_active' field must be true or false.",

            "categories.required" => "The categories field is required.",
            "categories.array" => "The categories field must be an array.",
            "categories.min" => "The categories field must have at least one item.",
            "categories.*.required" => "Each category is required.",
            "categories.*.integer" => "Each category must be an integer.",
            "categories.*.exists" => "One or more selected categories are invalid.",
        ];
    }
}
