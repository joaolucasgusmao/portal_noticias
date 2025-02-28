<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function store(array $data): Category
    {
        if (Category::where("name", $data["name"])->exists()) {
            throw new AppError("The category already exists.", 409);
        }

        return Category::create($data);
    }

    public function get(): Collection
    {
        return Category::oldest("id")->get();
    }

    public function retrieve(int $id): Category
    {
        $category = Category::find($id);

        if (!$category) {
            throw new AppError("Category not found.", 404);
        }

        return $category;
    }

    public function update(array $data, int $id): Category
    {
        $category = Category::find($id);

        if (!$category) {
            throw new AppError("Category not found.", 404);
        }

        $category->update($data);

        return $category;
    }

    public function destroy(int $id): void
    {
        $category = Category::find($id);

        if (!$category) {
            throw new AppError("Category not found.", 404);
        }

        $category->delete();
    }
}
