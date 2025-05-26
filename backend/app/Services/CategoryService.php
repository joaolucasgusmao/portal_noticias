<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CategoryService
{
    public function store(array $data): Category
    {
        if (Category::where("name", $data["name"])->exists()) {
            throw new AppError("The category already exists.", 409);
        }

        $data['slug'] = Str::slug($data['slug']);

        return Category::create($data);
    }

    public function get(): AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::orderByDesc("id")->get());
    }

    public function retrieve(string $slug): JsonResource
    {
        $category = Category::where("slug", $slug)->first();

        if (!$category) {
            throw new AppError("Category not found.", 404);
        }

        return new CategoryResource($category);
    }

    public function update(array $data, int $id): JsonResource
    {
        $category = Category::find($id);

        if (!$category) {
            throw new AppError("Category not found.", 404);
        }

        $data['slug'] = Str::slug($data['slug']);

        $category->update($data);

        return new CategoryResource($category);
    }

    public function destroy(int $id): void
    {
        $category = Category::find($id);

        if (!$category) {
            throw new AppError("Category not found.", 404);
        }

        $category->delete();
    }


    public function getCategoriesPaginate(): AnonymousResourceCollection
    {
        $categories = Category::orderByDesc("id")->paginate(10);
        return CategoryResource::collection($categories);
    }
}
