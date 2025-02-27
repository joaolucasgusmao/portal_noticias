<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\DestroyUserService;
use App\Services\GetUsersService;
use App\Services\LoginUserService;
use App\Services\RetrieveUserService;
use App\Services\StoreUserService;
use App\Services\UpdateUserService;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class UsersController extends Controller
{
    public function storeUser(StoreUserRequest $request): JsonResponse
    {
        $storeUserService = new StoreUserService();

        return response()->json($storeUserService->execute($request->all()), 201);
    }

    public function getUsers(): JsonResponse
    {
        $getUsersService = new GetUsersService();
        return response()->json($getUsersService->execute(), 200);
    }

    public function retrieveUser(int $id): JsonResponse
    {
        $retrieveUserService = new RetrieveUserService();

        return response()->json($retrieveUserService->execute($id), 200);
    }

    public function updateUser(UpdateUserRequest $request, int $id): JsonResponse
    {
        $updateUserService = new UpdateUserService();

        return response()->json($updateUserService->execute($request->all(), $id), 200);
    }

    public function destroyUser(int $id): Response
    {
        $destroyUserService = new DestroyUserService();
        $destroyUserService->execute($id);

        return response(null, 204);
    }

    public function login(LoginUserRequest $request): JsonResponse
    {
        $loginUserService = new LoginUserService();

        return response()->json($loginUserService->execute($request->all()), 200);
    }
}
