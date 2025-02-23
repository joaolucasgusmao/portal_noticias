<?php

namespace App\Services;

use App\Models\User;

class GetUsersService
{
    public function execute()
    {
        return User::orderBy("id", "asc")->get();
    }
}