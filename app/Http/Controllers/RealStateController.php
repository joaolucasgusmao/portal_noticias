<?php

namespace App\Http\Controllers;

use App\Models\RealState;
use App\Services\RealStateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RealStateController extends Controller
{
    protected RealStateService $realStateService;

    public function __construct(RealStateService $realStateService)
    {
        $this->realStateService = $realStateService;
    }

    public function store(Request $request): JsonResponse
    {
        return response()->json($this->realStateService->store($request->all(), $request), 201);
    }
    
    public function get(): JsonResponse
    {
        return response()->json($this->realStateService->get(), 200);
    }

    public function retrieve(int $id): JsonResponse
    {
        return response()->json($this->realStateService->retrieve($id), 200);
    }

    public function update(int $id, Request $request): JsonResponse
    {
        return response()->json($this->realStateService->update($id, $request->all()), 200);
    }

    public function destroy(int $id): Response
    {
        return response($this->realStateService->destroy($id), 204);
    }

    // public function getNewsByCategory(int $categoryId): JsonResponse
    // {
    //     return response()->json($this->realStateService->getNewsByCategory($categoryId), 200);
    // }

    public function getRealStateByUser(Request $request, int $userId): JsonResponse
    {
        return response()->json($this->realStateService->getRealStateByUser($request, $userId), 200);
    }

    public function getRealStatePaginate(): JsonResponse
    {
        return response()->json($this->realStateService->getRealStatePaginate(), 200);
    }
}
