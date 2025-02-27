<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Banner;

class DestroyBannerService
{
    public function execute(int $id): void
    {
        $bannerToDestroy = Banner::find($id);

        if (is_null($bannerToDestroy)) {
            throw new AppError("Banner não encontrado.", 404);
        }

        $bannerToDestroy->delete();
    }
}