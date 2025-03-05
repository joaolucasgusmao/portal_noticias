<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [];

        if ($this->isMethod("post") && $this->path() === "api/users/login") { 
            return [
                "email" => "required|email",
                "password" => "required|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/",
            ];
        }

        if ($this->isMethod("post")) { 
            $rules = [
                "avatar" => ["nullable", "url", "regex:/\\.(jpg|jpeg|png|webp)$/i"],
                "name" => "required|string|min:2",
                "email" => "required|email",
                "password" => "required|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/",
                "birth_date" => "required|date_format:d/m/Y|before:today",
                "phone_number" => "required|string|min:10|max:11",
                "gender" => "required|string|max:1",
            ];
        }

        if ($this->isMethod("patch")) { 
            $rules = [
                "avatar" => ["nullable", "url", "regex:/\\.(jpg|jpeg|png|webp)$/i"],
                "name" => "sometimes|string|min:2",
                "email" => "sometimes|email",
                "password" => "sometimes|string|min:8|regex:/[A-Z]/|regex:/[a-z]/|regex:/[0-9]/|regex:/[@$!%*#?&]/",
                "birth_date" => "sometimes|date_format:d/m/Y|before:today",
                "phone_number" => "sometimes|string|min:10|max:11",
                "gender" => "sometimes|string|max:1",
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            "avatar.url" => "The avatar field must be a valid URL.",
            "avatar.regex" => "The avatar URL must end with .jpg, .jpeg, .png, or .webp.",

            "name.required" => "The name field is required.",
            "name.string" => "The name must be a valid text.",
            "name.min" => "The name must have at least :min characters.",

            "email.required" => "The email field is required.",
            "email.email" => "The email must be a valid email address.",

            "password.required" => "The password field is required.",
            "password.string" => "The password must be a valid text.",
            "password.min" => "The password must have at least :min characters.",
            "password.regex" => "The password must contain at least 1 uppercase letter, 1 special character, and 1 number.",

            "birth_date.required" => "The birth date field is required.",
            "birth_date.date_format" => "The birth date must be in the format dd/mm/yyyy.",
            "birth_date.before" => "The birth date must be before today.",

            "phone_number.required" => "The phone number field is required.",
            "phone_number.string" => "The phone number must be a valid text.",
            "phone_number.min" => "The phone number must have at least :min characters.",
            "phone_number.max" => "The phone number must have at most :max characters.",

            "gender.required" => "The gender field is required.",
            "gender.string" => "The gender must be a valid text.",
            "gender.max" => "The gender must have at most :max characters.",
        ];
    }

}
