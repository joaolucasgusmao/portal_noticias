<?php

namespace App\Http\Controllers;

use App\Services\DestroyBannerService;
use App\Services\GetBannersService;
use App\Services\RetrieveBannerService;
use App\Services\StoreBannerService;
use App\Services\UpdateBannerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BannersController extends Controller
{
    public function storeBanner(Request $request): JsonResponse
    {
        $storeBannerService = new StoreBannerService();
        return response()->json($storeBannerService->execute($request->all()), 201);
    }

    public function getBanners(): JsonResponse
    {
        $getBannersService = new GetBannersService();
        return response()->json($getBannersService->execute(), 200);
    }

    public function retrieveBanner(int $id): JsonResponse
    {
        $retrieveBannerService = new RetrieveBannerService();
        return response()->json($retrieveBannerService->execute($id), 200);
    }

    public function updateBanner(int $id, Request $request): JsonResponse
    {
        $updateBannerService = new UpdateBannerService();
        return response()->json($updateBannerService->execute($id, $request->all()), 200);
    }

    public function destroyBanner(int $id): Response
    {
        $destroyBannerService = new DestroyBannerService();
        $destroyBannerService->execute($id);

        return response(null, 204);
    }
}
