<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class BannerService
{

    public function store(array $data): Banner
    {
        if (empty($data['side']) && empty($data['top']) && empty($data['home'])) {
            throw new AppError("You must specify at least one position for the banner.", 409);
        }

        if (!empty($data['side']) && (!empty($data['top']) || !empty($data['home']))) {
            throw new AppError("You cannot place the side banner together with the others.", 409);
        }

        return Banner::create($data);
    }

    public function get(): Collection
    {
        return Banner::oldest("id")->get();
    }

    public function retrieve(int $id): Banner
    {
        $banner = Banner::find($id);

        if (!$banner) {
            throw new AppError("Banner not found.", 404);
        }

        return $banner;
    }

    public function update(int $id, array $data): Banner
    {
        $banner = Banner::find($id);

        if (!$banner) {
            throw new AppError("Banner not found.", 404);
        }

        if (!empty($data['side']) && (!empty($data['top']) || !empty($data['home']))) {
            throw new AppError("You cannot place the side banner together with the others.", 409);
        }

        $banner->update($data);
        return $banner;
    }

    public function destroy(int $id): void
    {
        $banner = Banner::find($id);

        if (!$banner) {
            throw new AppError("Banner not found.", 404);
        }

        $banner->delete();
    }

    public function getBannersPaginate(): LengthAwarePaginator
    {
        return Banner::paginate(10);
    }
}
