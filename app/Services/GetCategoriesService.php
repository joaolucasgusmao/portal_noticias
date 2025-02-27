<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class GetCategoriesService
{
    public function execute(): Collection
    {
        return Category::orderBy("id", "asc")->get();
    }
}
