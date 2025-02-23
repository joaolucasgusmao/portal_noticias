<?php

namespace App\Services;

use App\Models\User;
use ErrorException;

class StoreUserService
{
    public function execute(array $data)
    {
        $email = User::firstWhere("email", $data["email"]);

        if (!is_null($email)) {
            throw new ErrorException("E-mail already exists.", 400);
        }

        return User::create($data);
    }
}