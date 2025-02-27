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
            "avatar" => "nullable|string",
            "name" => "min:2|required|string",
            "email" => "email|required",
            "password" => "string|required|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/",
            "birth_date" => "required|date_format:d/m/Y|before:today",
            "phone_number" => "string|required|min:10|max:11",
            "gender" => "string|required|max:1",
        ];
    }

    public function messages(): array
    {
        return [
            "avatar.string" => "A imagem deve ser válida.",
            "name.min" => "O nome deve conter no mínimo 2 caractéres.",
            "name.required" => "É obrigatório preencher o nome.",
            "name.string" => "O nome deve ser válido.",
            "email.email" => "E e-mail deve ser válido.",
            "email.required" => "É obrigatório preencher o email.",
            "password.string" => "A senha deve válida.",
            "password.required" => "É obrigatório preencher a senha.",
            "password.min" => "A senha deve conter no mínimo 8 caractéres.",
            "password.regex" => "A senha deve conter pelo menos 1 letra maiúscula, 1 caractere especial e 1 número.",
            "birth_date.date" => "A data de nascimento deve ser válida.",
            "birth_date.date_format" => "A data de nascimento deve estar no formato dd/mm/yyyy.",
            "birth_date.required" => "É obrigatório preencher a data de nascimento.",
            "birth_date.before" => "A data de nascimento deve ser anterior a data atual.",
            "phone_number.string" => "O número de telefone deve ser válido.",
            "phone_number.required" => "É obrigatório preencher o número de telefone.",
            "phone_number.min" => "O número de telefone deve conter no mínimo 10 caractéres.",
            "phone_number.max" => "O número de telefone deve conter no máximo 11 caractéres.",
            "gender.string" => "O gênero deve ser válido",
            "gender.required" => "É obrigatório preencher o gênero.",
            "gender.max" => "O gênero deve conter no máximo 1 caractére.",
        ];
    }
}
