<?php

namespace App\Http\Controllers;

use App\Services\StoreCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function storeCategory(Request $request): JsonResponse
    {
        $storeCategoryService = new StoreCategoryService();
        return response()->json($storeCategoryService->execute($request->all()));
    }
}
