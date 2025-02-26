<?php

namespace App\Http\Controllers;

use App\Services\StoreNewsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function storeNews(Request $request): JsonResponse
    {
        $storeNwsService = new StoreNewsService();
        return response()->json($storeNwsService->execute($request->all(), $request));
    }
}
