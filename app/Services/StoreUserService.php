<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class StoreUserService
{
    public function execute(array $data): User
    {
        $userEmail = User::firstWhere("email", $data["email"]);
        $userPhoneNumber = User::firstWhere("phone_number", $data["phone_number"]);

        if (!is_null($userEmail)) {
            throw new AppError("O e-mail já existe.", 409);
        }

        if (!is_null($userPhoneNumber)) {
            throw new AppError("O número de telefone já existe.", 409);
        }

        return User::create($data);
    }
}
