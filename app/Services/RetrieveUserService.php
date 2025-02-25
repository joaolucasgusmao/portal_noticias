<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class RetrieveUserService
{
    public function execute(int $id): User
    {
        $user = User::find($id);
        if (is_null($user)) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        return $user;
    }
}