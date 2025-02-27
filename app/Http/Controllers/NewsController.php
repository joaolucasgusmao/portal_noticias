<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Services\DestroyNewsService;
use App\Services\GetNewsService;
use App\Services\RetrieveNewsService;
use App\Services\StoreNewsService;
use App\Services\UpdateNewsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NewsController extends Controller
{

    public function storeNews(StoreNewsRequest $request): JsonResponse
    {
        $storeNewsService = new StoreNewsService();
        return response()->json($storeNewsService->execute($request->all(), $request), 201);
    }

    public function getNews(): JsonResponse
    {
        $getNewsService = new GetNewsService();
        return response()->json($getNewsService->execute(), 200);
    }

    public function retrieveNews(int $id): JsonResponse
    {
        $retrieveNewsService = new RetrieveNewsService();
        return response()->json($retrieveNewsService->execute($id), 200);
    }

    public function updateNews(int $id, UpdateNewsRequest $request): JsonResponse
    {
        $updateNewsService = new UpdateNewsService();
        return response()->json($updateNewsService->execute($id, $request->all()), 200);
    }

    public function destroyNews(int $id): Response
    {
        $destroyNewsService = new DestroyNewsService();
        $destroyNewsService->execute($id);

        return response(null, 204);
    }
}
