<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Banner;

class RetrieveBannerService
{
    public function execute(int $id): Banner
    {
        $banner = Banner::find($id);

        if (is_null($banner)) {
            throw new AppError("Banner não encontrado.", 404);
        }

        return $banner;
    }
}