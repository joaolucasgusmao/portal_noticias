<?php

namespace App\Http\Controllers;

use App\Http\Requests\BannerRequest;
use App\Services\BannerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BannerController extends Controller
{
    protected BannerService $bannerService;

    public function __construct(BannerService $bannerService)
    {
        $this->bannerService = $bannerService;
    }

    public function store(BannerRequest $request): JsonResponse
    {
        return response()->json($this->bannerService->store($request->all()), 201);
    }

    public function get(): JsonResponse
    {
        return response()->json($this->bannerService->get(), 200);
    }

    public function retrieve(int $id): JsonResponse
    {
        return response()->json($this->bannerService->retrieve($id), 200);
    }

    public function update(int $id, BannerRequest $request): JsonResponse
    {
        return response()->json($this->bannerService->update($id, $request->all()), 200);
    }

    public function destroy(int $id): Response
    {
        return response($this->bannerService->destroy($id), 204);
    }
}
