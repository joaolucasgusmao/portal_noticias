<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\News;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class NewsService
{

    public function store(array $data, Request $request): News
    {
        $user = $request->user();

        $categories = $data['categories'];
        unset($data['categories']);

        $news = $user->news()->create($data);

        $news->categories()->attach($categories);

        return $news;
    }

    public function get(): Collection
    {
        return News::oldest("id")->get();
    }

    public function retrieve(int $id): News
    {
        $news = News::find($id);

        if (is_null($news)) {
            throw new AppError("Notícia não encontrada.", 404);
        }

        return $news;
    }

    public function update(int $id, array $data): News
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

    public function destroy(int $id): void
    {
        $newsToDestroy = News::find($id);
        if (is_null($newsToDestroy)) {
            throw new AppError("Notícia não encontrada.", 404);
        }

        $newsToDestroy->delete();
    }
}
