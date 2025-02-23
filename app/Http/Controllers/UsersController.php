<?php

namespace App\Http\Controllers;

use App\Services\GetUsersService;
use App\Services\StoreUserService;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function store(Request $request)
    {
        $storeUserService = new StoreUserService();

        return $storeUserService->execute($request->all());
    }

    public function getUsers()
    {
        $getUsersService = new GetUsersService();
        return $getUsersService->execute();
    }
}
