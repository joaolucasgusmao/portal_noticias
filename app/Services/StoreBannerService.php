<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Banner;

class StoreBannerService
{
    public function execute(array $data): Banner
    {
        if (empty($data['side']) && empty($data['top']) && empty($data['home'])) {
            throw new AppError("Você deve informar ao menos uma posição para o banner.", 409);
        }

        if (!empty($data['side']) && (!empty($data['top']) || !empty($data['home']))) {
            throw new AppError("Você não pode posicionar o banner lateral junto com os outros.", 409);
        }

        return Banner::create($data);
    }
}
