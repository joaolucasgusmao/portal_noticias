<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\DestroyUserService;
use App\Services\GetUsersService;
use App\Services\RetrieveUserService;
use App\Services\StoreUserService;
use App\Services\UpdateUserService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UsersController extends Controller
{
    public function storeUser(StoreUserRequest $request)
    {
        $storeUserService = new StoreUserService();

        return $storeUserService->execute($request->all());
    }

    public function getUsers()
    {
        $getUsersService = new GetUsersService();
        return $getUsersService->execute();
    }

    public function retrieveUser(int $id)
    {
        $retrieveUserService = new RetrieveUserService();
        return $retrieveUserService->execute($id);
    }

    public function updateUser(UpdateUserRequest $request, $id)
    {
        $updateUserService = new UpdateUserService();

        return $updateUserService->execute($request->all(), $id);
    }

    public function destroyUser(int $id)
    {
        $destroyUserService = new DestroyUserService();
        $destroyUserService->execute($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
