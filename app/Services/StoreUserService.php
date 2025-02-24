<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class StoreUserService
{
    public function execute(array $data)
    {
        $email = User::firstWhere("email", $data["email"]);
        $phoneNumber = User::firstWhere("phone_number", $data["phone_number"]);

        if (!is_null($email)) {
            throw new AppError("O e-mail já existe.", 400);
        }

        if (!is_null($phoneNumber)) {
            throw new AppError("O número de telefone já existe.", 400);
        }

        return User::create($data);
    }
}
