<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\DestroyCategoryService;
use App\Services\GetCategoriesService;
use App\Services\RetrieveCategoryService;
use App\Services\StoreCategoryService;
use App\Services\UpdateCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class CategoriesController extends Controller
{
    public function storeCategory(StoreCategoryRequest $request): JsonResponse
    {
        $storeCategoryService = new StoreCategoryService();
        return response()->json($storeCategoryService->execute($request->all()), 201);
    }

    public function getCategories(): JsonResponse
    {
        $getCategoriesService = new GetCategoriesService();
        return response()->json($getCategoriesService->execute(), 200);
    }

    public function retrieveCategory(int $id): JsonResponse
    {
        $retrieveCategoryService = new RetrieveCategoryService();
        return response()->json($retrieveCategoryService->execute($id), 200);
    }

    public function updateCategory(int $id, UpdateCategoryRequest $request): JsonResponse
    {
        $updateCategoryService = new UpdateCategoryService();
        return response()->json($updateCategoryService->execute($id, $request->all()), 200);
    }

    public function destroyCategory(int $id): Response
    {
        $destroyCategoryService = new DestroyCategoryService();
        $destroyCategoryService->execute($id);

        return response(null, 204);
    }
}
