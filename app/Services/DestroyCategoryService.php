<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Category;

class DestroyCategoryService
{
    public function execute(int $id): void
    {
        $categoryToDestroy = Category::find($id);

        if (is_null($categoryToDestroy)) {
            throw new AppError("Categoria não encontrada.", 404);
        }

        $categoryToDestroy->delete();
    }
}