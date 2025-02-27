<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Category;

class StoreCategoryService
{
    public function execute(array $data): Category
    {

        $categoryName = Category::firstWhere('name', $data['name']);

        if ($categoryName) {
            throw new AppError('A categoria já existe.', 409);
        }

        return Category::create($data);
    }
}
