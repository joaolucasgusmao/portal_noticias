<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class LoginUserService
{
    public function  execute(array $data): array
    {
        $user = User::firstWhere("email", $data["email"]);

        if (is_null($user)) {
            throw new AppError("E-mail incorreto!", 401);
        }

        if (!password_verify($data["password"], $user->password)) {
            throw new AppError("Senha incorreta!", 401);
        }

        $token = $user->createToken('auth_token', ['*'], now()->addDay())->plainTextToken;

        return [
            "access_token" => $token,
            "user" => $user
        ];
    }
}
