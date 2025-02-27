<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{

    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        return response()->json($this->userService->store($request->all()), 201);
    }

    public function get(): JsonResponse
    {
        return response()->json($this->userService->get(), 200);
    }

    public function retrieve(int $id): JsonResponse
    {
        return response()->json($this->userService->retrieve($id), 200);
    }

    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        return response()->json($this->userService->update($request->all(), $id), 200);
    }

    public function destroy(int $id): Response
    {
        return response($this->userService->destroy($id), 204);
    }

    public function login(LoginUserRequest $request): JsonResponse
    {
        return response()->json($this->userService->login($request->all()), 200);
    }
}
