<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\News;

class RetrieveNewsService
{
    public function execute(int $id): News
    {
        $news = News::find($id);

        if (is_null($news)) {
            throw new AppError("Notícia não encontrada.", 404);
        }

        return $news;
    }
}