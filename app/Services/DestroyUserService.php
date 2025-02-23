<?php

namespace App\Services;

use App\Models\User;
use ErrorException;

class DestroyUserService
{
    public function execute(int $id)
    {
        $userToDestroy = User::firstWhere("id", $id);

        if (is_null($userToDestroy)) {
            throw new ErrorException("User not found.", 404);
        }

        $userToDestroy->delete();
    }
}