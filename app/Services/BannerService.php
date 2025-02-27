<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;

class BannerService
{

    public function store(array $data): Banner
    {
        if (empty($data['side']) && empty($data['top']) && empty($data['home'])) {
            throw new AppError("Você deve informar ao menos uma posição para o banner.", 409);
        }

        if (!empty($data['side']) && (!empty($data['top']) || !empty($data['home']))) {
            throw new AppError("Você não pode posicionar o banner lateral junto com os outros.", 409);
        }

        return Banner::create($data);
    }

    public function get(): Collection
    {
        return Banner::orderBy("id", "asc")->get();
    }

    public function retrieve(int $id): Banner
    {
        $banner = Banner::find($id);

        if (is_null($banner)) {
            throw new AppError("Banner não encontrado.", 404);
        }

        return $banner;
    }

    public function update(int $id, array $data): Banner
    {
        $bannerToUpdate = Banner::find($id);

        if (is_null($bannerToUpdate)) {
            throw new AppError("Banner não encontrado.", 404);
        }

        $bannerToUpdate->update($data);
        return $bannerToUpdate;
    }

    public function destroy(int $id): void
    {
        $bannerToDestroy = Banner::find($id);

        if (is_null($bannerToDestroy)) {
            throw new AppError("Banner não encontrado.", 404);
        }

        $bannerToDestroy->delete();
    }
}
