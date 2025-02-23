<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            "name" => "min:2|required|string",
            "email" => "email|required",
            "password" => "string|required|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/"
        ];
    }

    public function messages(): array
    {
        return [
            "name.min" => "O nome deve conter no mínimo 2 caractéres.",
            "name.required" => "É obrigatório preencher o nome.",
            "name.string" => "O nome deve ser válido.",
            "email.email" => "E e-mail deve ser válido.",
            "email.required" => "É obrigatório preencher o email.",
            "password.string" => "A senha deve válida.",
            "password.required" => "É obrigatório preencher a senha.",
            "password.min" => "A senha deve conter no mínimo 8 caractéres.",
            "password.regex" => "A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e 1 número.",
        ];
    }
}
