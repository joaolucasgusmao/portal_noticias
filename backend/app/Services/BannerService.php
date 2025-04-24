<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerService
{

    public function store(array $data): Banner
    {
        if (empty($data["positions"])) {
            throw new AppError("You must specify at least one position for the banner.", 409);
        }

        if (in_array("side", $data["positions"]) && count($data["positions"]) > 1 || in_array("sideHome", $data["positions"]) && count($data["positions"]) > 1) {
            throw new AppError("You cannot place the side banner together with the others.", 409);
        }

        return Banner::create($data);
    }

    public function get(): AnonymousResourceCollection
    {
        return BannerResource::collection(
            Banner::orderBy('is_active')
                ->orderByDesc('id')
                ->get()
        );
    }

    public function retrieve(int $id): JsonResource
    {
        $banner = Banner::find($id);

        if (!$banner) {
            throw new AppError("Banner not found.", 404);
        }

        return new BannerResource($banner);
    }

    public function update(int $id, array $data): JsonResource
    {
        $banner = Banner::find($id);

        if (!$banner) {
            throw new AppError("Banner not found.", 404);
        }

        if (!empty($data["positions"])) {
            if (in_array("side", $data["positions"]) && count($data["positions"]) > 1 || in_array("sideHome", $data["positions"]) && count($data["positions"]) > 1) {
                throw new AppError("You cannot place the side banner together with the others.", 409);
            }
        }

        $banner->update($data);
        return new BannerResource($banner);
    }

    public function destroy(int $id): void
    {
        $banner = Banner::find($id);

        if (!$banner) {
            throw new AppError("Banner not found.", 404);
        }

        $banner->delete();
    }

    public function getBannersPaginate(): AnonymousResourceCollection
    {
        $banners = Banner::orderByDesc("id")->paginate(10);
        return BannerResource::collection($banners);
    }
}
