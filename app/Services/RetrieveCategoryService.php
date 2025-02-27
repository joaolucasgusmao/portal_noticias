<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Category;

class RetrieveCategoryService
{
    public function execute(int $id): Category
    {
        $category = Category::find($id);

        if (is_null($category)) {
            throw new AppError("Categoria não encontrada.", 404);
        }

        return $category;
    }
}