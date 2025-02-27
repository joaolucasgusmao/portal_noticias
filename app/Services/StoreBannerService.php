<?php

namespace App\Services;

use App\Models\Banner;

class StoreBannerService
{
    public function execute(array $data): Banner
    {
        return Banner::create($data);
    }
}