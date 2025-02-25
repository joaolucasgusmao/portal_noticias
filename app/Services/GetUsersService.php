<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class GetUsersService
{
    public function execute(): Collection
    {
        return User::orderBy("id", "asc")->get();
    }
}