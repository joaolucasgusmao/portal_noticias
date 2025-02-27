<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Category;

class UpdateCategoryService
{
    public function execute(int $id, array $data): Category
    {
        $categoryToUpdate = Category::find($id);

        if (is_null($categoryToUpdate)) {
            throw new AppError("Categoria não encontrada.", 404);
        }

        $categoryToUpdate->update($data);
        return $categoryToUpdate;
    }
}