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
            "positions" => ["array"],
            "positions.*" => "in:superTop,top,homeOne,homeTwo,homeThree,homeFour,homeFive,sideHome,side",
            "image" => ["url", "regex:/\\.(jpg|jpeg|png|webp|gif)$/i"],
            "link" => "nullable|url",
            "is_active" => "sometimes|boolean",
            "description" => ["string", "min:5", "max:255"],
        ];

        if ($this->isMethod("post")) {
            $rules["image"][] = "required";
            $rules["description"][] = "required";
            $rules["positions"][] = "required";
            $rules["positions"][] = "min:1";
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

            "description.required" => "The description field is required.",
            "description.string" => "The description field must be a text.",
            "description.min" => "The description must be at least :min characters.",
            "description.max" => "The description must be at most :max characters.",

            "positions.required" => "You must select at least one position.",
            "positions.array" => "Positions must be an array.",
            "positions.min" => "You must select at least one position.",
            "positions.*.in" => "Invalid position selected.",

            "is_active.boolean" => "The is_active field must be true or false.",
        ];
    }
}
