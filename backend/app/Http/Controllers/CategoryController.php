<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    protected CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function store(CategoryRequest $request): JsonResponse
    {
        return response()->json($this->categoryService->store($request->all()), 201);
    }

    public function get(): JsonResponse
    {
        return response()->json($this->categoryService->get(), 200);
    }

    public function retrieve(int $id): JsonResponse
    {
        return response()->json($this->categoryService->retrieve($id), 200);
    }

    public function update(CategoryRequest $request, int $id): JsonResponse
    {
        return response()->json($this->categoryService->update($request->all(), $id), 200);
    }

    public function destroy(int $id): Response
    {
        return response($this->categoryService->destroy($id), 204);
    }

    public function getCategoriesPaginate(): AnonymousResourceCollection
    {
        return $this->categoryService->getCategoriesPaginate();
    }
}
