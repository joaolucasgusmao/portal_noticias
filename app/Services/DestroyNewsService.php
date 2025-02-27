<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\News;

class DestroyNewsService
{
    public function execute(int $id): void
    {
        $newsToDestroy = News::find($id);
        if (is_null($newsToDestroy)) {
            throw new AppError("Notícia não encontrada.", 404);
        }

        $newsToDestroy->delete();
    }
}