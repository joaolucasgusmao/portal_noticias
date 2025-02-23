<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;

class DestroyUserService
{
    public function execute(int $id)
    {
        $userToDestroy = User::firstWhere("id", $id);

        if (is_null($userToDestroy)) {
            throw new AppError("User not found.", 404);
        }

        $userToDestroy->delete();
    }
}