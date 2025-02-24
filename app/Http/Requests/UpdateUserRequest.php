<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            "avatar" => "nullable|string",
            "name" => "min:2|string",
            "email" => "email",
            "password" => "string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/",
            "birth_date" => "date|required|before:today",
            "phone_number" => "string|required|min:10|max:11",
            "gender" => "string|required|max:1",
        ];
    }

    public function messages(): array
    {
        return [
            "avatar.string" => "A imagem deve ser válida.",
            "name.min" => "O nome deve conter no mínimo 2 caractéres.",
            "name.string" => "O nome não pode conter numeros ou caractéres especiais.",
            "email.email" => "E e-mail deve ser válido.",
            "password.string" => "A senha deve válida.",
            "password.min" => "A senha deve conter no mínimo 8 caractéres.",
            "password.regex" => "A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e 1 número.",
            "birth_date.date" => "A data de nascimento deve ser válida.",
            "birth_date.before" => "A data de nascimento deve ser anterior a data atual.",
            "phone_number.string" => "O número de telefone deve ser válido.",
            "phone_number.min" => "O número de telefone deve conter no mínimo 10 caractéres.",
            "phone_number.max" => "O número de telefone deve conter no máximo 11 caractéres.",
            "gender.string" => "O gênero deve ser válido",
            "gender.max" => "O gênero deve conter no máximo 1 caractére.",
        ];
    }
}
