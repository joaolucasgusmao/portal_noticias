<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBannerRequest extends FormRequest
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
            "image" => ["url", "regex:/\\.(jpg|jpeg|png|webp)$/i"],
            "top" => "sometimes|boolean",
            "side" => "sometimes|boolean",
            "home" => "sometimes|boolean",
            "description" => "nullable|string|min:5|max:255",
        ];
    }

    public function messages(): array
    {
        return [
            "image.url" => "O campo imagem deve ser uma URL válida.",
            "image.regex" => "A URL da imagem deve terminar em .jpg, .jpeg, .png ou .webp.",
            "description.string" => "O campo descrição deve ser um texto.",
            "description.min" => "O campo descrição deve ter no mínimo :min caracteres.",
            "description.max" => "O campo descrição deve ter no máximo :max caracteres.",
            "side.boolean" => "O campo lateral deve ser um booleano.",
            "top.boolean" => "O campo topo deve ser um booleano.",
            "home.boolean" => "O campo home deve ser um booleano.",
        ];
    }
}
