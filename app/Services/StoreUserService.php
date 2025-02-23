<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class StoreUserService
{
    public function execute(array $data)
    {
        $email = User::firstWhere("email", $data["email"]);

        if (!is_null($email)) {
            throw new AppError("O e-mail já existe.", 400);
        }

        return User::create($data);
    }
}