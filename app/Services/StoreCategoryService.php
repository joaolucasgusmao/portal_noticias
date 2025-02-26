<?php

namespace App\Services;

use App\Models\Category;

class StoreCategoryService
{
    public function execute(array $data): Category
    {
        return Category::create($data);
    }
}
