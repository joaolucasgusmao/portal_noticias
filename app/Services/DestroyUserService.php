<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class DestroyUserService
{
    public function execute(int $id)
    {
        $userToDestroy = User::find($id);

        if (is_null($userToDestroy)) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        $userToDestroy->delete();
    }
}