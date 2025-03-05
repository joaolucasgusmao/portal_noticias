<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RealStateRequest extends FormRequest
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
     */
    public function rules(): array
    {
        $rules = [
            "image" => ["required", "url", "regex:/\\.(jpg|jpeg|png|webp)$/i"],
            "title" => "required|string|min:5|max:255",
            "type" => ["required", Rule::in(["house", "apartment", "studio", "comercial", "terrain"])],
            "payment_method" => ["required", Rule::in(["sale", "financing", "rent"])],
            "price" => "required|numeric|min:0",
            "city" => "required|string|min:2|max:255",
            "address" => "required|string|min:2|max:255",
            "hood" => "required|string|min:2|max:255",
            "rooms" => "required|integer|min:0",
            "bathrooms" => "required|integer|min:0",
            "cep" => "required|string|min:8|max:8",
            "square_m" => "required|numeric|min:0",
            "condominium" => "nullable|string|min:2|max:255",
            "suites" => "nullable|integer|min:0",
            "air_conditioning" => "sometimes|boolean",
            "custom_furniture" => "sometimes|boolean",
            "furnished" => "sometimes|boolean",
        ];

        if ($this->isMethod("patch")) {
            $rules["image"] = ["sometimes", "url", "regex:/\\.(jpg|jpeg|png|webp)$/i"];
            $rules["title"] = "sometimes|string|min:2|max:255";
            $rules["type"] = ["sometimes", Rule::in(["house", "apartment", "studio", "comercial", "terrain"])];
            $rules["payment_method"] = ["sometimes", Rule::in(["sale", "rent"])];
            $rules["price"] = "sometimes|numeric|min:100";
            $rules["city"] = "sometimes|string|min:2|max:255";
            $rules["address"] = "sometimes|string|min:2|max:255";
            $rules["hood"] = "sometimes|string|min:2|max:255";
            $rules["rooms"] = "sometimes|integer|min:0";
            $rules["bathrooms"] = "sometimes|integer|min:0";
            $rules["cep"] = "sometimes|string|min:8|max:8";
            $rules["square_m"] = "sometimes|numeric|min:0";
            $rules["condominium"] = "sometimes|nullable|string|min:2|max:255";
            $rules["suites"] = "sometimes|nullable|integer|min:0";
        }

        return $rules;
    }

    /**
     * Return the custom validation error messages.
     */
    public function messages(): array
    {
        return [
            "image.required" => "The image is required.",
            "image.string" => "The image must be text.",
            "image.url" => "The image must be a valid URL.",
            "image.regex" => "The image must be a file of type: jpg, jpeg, png, or webp.",

            "title.required" => "The title is required.",
            "title.string" => "The title must be text.",
            "title.min" => "The title must be at least :min characters.",
            "title.max" => "The title must not exceed :max characters.",

            "type.required" => "The property type is required.",
            "type.in" => "The type must be 'house', 'apartment', 'studio', 'comercial', or 'terrain'.",

            "payment_method.required" => "The payment method is required.",
            "payment_method.in" => "The payment method must be 'sale', 'financing', or 'rent'.",

            "price.required" => "The price is required.",
            "price.numeric" => "The price must be a number.",
            "price.min" => "The price must be at least :min.",

            "city.required" => "The city is required.",
            "city.string" => "The city must be text.",
            "city.min" => "The city must be at least :min characters.",
            "city.max" => "The city must not exceed :max characters.",

            "address.required" => "The address is required.",
            "address.string" => "The address must be text.",
            "address.min" => "The address must be at least :min characters.",
            "address.max" => "The address must not exceed :max characters.",

            "hood.required" => "The hood is required.",
            "hood.string" => "The hood must be text.",
            "hood.min" => "The hood must be at least :min characters.",
            "hood.max" => "The hood must not exceed :max characters.",

            "rooms.required" => "The number of rooms is required.",
            "rooms.integer" => "The number of rooms must be an integer.",
            "rooms.min" => "The number of rooms must be at least :min.",

            "bathrooms.required" => "The number of bathrooms is required.",
            "bathrooms.integer" => "The number of bathrooms must be an integer.",
            "bathrooms.min" => "The number of bathrooms must be at least :min.",

            "cep.required" => "The ZIP code is required.",

            "square_m.required" => "The square footage is required.",
            "square_m.numeric" => "The square footage must be a number.",
            "square_m.min" => "The square footage must be at least :min.",

            "condominium.string" => "The condominium must be text.",
            "condominium.min" => "The condominium must be at least :min characters.",
            "condominium.max" => "The condominium must not exceed :max characters.",

            "suites.integer" => "The number of suites must be an integer.",
            "suites.min" => "The number of suites must be at least :min.",

            "air_conditioning.boolean" => "The 'air conditioning' field must be true or false.",
            "custom_furniture.boolean" => "The 'custom furniture' field must be true or false.",
            "furnished.boolean" => "The 'furnished' field must be true or false.",

            "user_id.required" => "The user ID is required.",
            "user_id.exists" => "The provided user does not exist.",
        ];
    }
}
