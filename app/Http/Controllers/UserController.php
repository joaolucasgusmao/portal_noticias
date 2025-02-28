<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
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

    public function store(UserRequest $request): JsonResponse
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

    public function update(UserRequest $request, int $id): JsonResponse
    {
        return response()->json($this->userService->update($request->all(), $id), 200);
    }

    public function destroy(int $id): Response
    {
        return response($this->userService->destroy($id), 204);
    }

    public function login(UserRequest $request): JsonResponse
    {
        return response()->json($this->userService->login($request->all()), 200);
    }
}
