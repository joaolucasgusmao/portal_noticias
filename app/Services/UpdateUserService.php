<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class UpdateUserService
{
    public function execute(array $data, int $id)
    {
        $userToUpdate = User::firstWhere("id", $id);

        if (is_null($userToUpdate)) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        $userToUpdate->update($data);

        return $userToUpdate;
    }
}