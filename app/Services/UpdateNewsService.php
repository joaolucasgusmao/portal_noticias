<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\News;

class UpdateNewsService
{
    public function execute(int $id, array $data): News
    {
        $newsToUpdate = News::find($id);

        if (is_null($newsToUpdate)) {
            throw new AppError("Notícia não encontrada.", 404);
        }

        if (isset($data["categories"])) {
            $categories = $data["categories"];
            unset($data["categories"]);

            $newsToUpdate->categories()->sync($categories);
        }

        $newsToUpdate->update($data);
        return $newsToUpdate;
    }
}
