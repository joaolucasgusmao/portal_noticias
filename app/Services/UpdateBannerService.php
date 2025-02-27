<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Banner;

class UpdateBannerService
{
    public function execute(int $id, array $data): Banner
    {
        $bannerToUpdate = Banner::find($id);

        if (is_null($bannerToUpdate)) {
            throw new AppError("Banner não encontrado.", 404);
        }

        $bannerToUpdate->update($data);
        return $bannerToUpdate;
    }
}