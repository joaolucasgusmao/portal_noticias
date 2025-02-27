<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class CategoryService
{
    public function store(array $data): Category
    {
        $categoryName = Category::firstWhere("name", $data["name"]);

        if (!is_null($categoryName)) {
            throw new AppError("A categoria já existe.", 409);
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
        if (is_null($category)) {
            throw new AppError("Categoria não encontrada.", 404);
        }

        return $category;
    }

    public function update(array $data, int $id): Category
    {
        $categoryToUpdate = Category::find($id);

        if (is_null($categoryToUpdate)) {
            throw new AppError("Categoria não encontrada.", 404);
        }

        $categoryToUpdate->update($data);

        return $categoryToUpdate;
    }

    public function destroy(int $id): void
    {
        $categoryToDestroy = Category::find($id);

        if (is_null($categoryToDestroy)) {
            throw new AppError("Categoria não encontrada.", 404);
        }

        $categoryToDestroy->delete();
    }
}
