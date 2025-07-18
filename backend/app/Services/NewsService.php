<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class NewsService
{

    public function store(array $data, Request $request): JsonResource
    {
        $user = $request->user();

        if (News::where("title", $data["title"])->exists()) {
            throw new AppError("The title already exists.", 409);
        }

        if (!empty($data['is_draft']) && $data['is_draft'] === true) {
            $data['is_active'] = false;
        } else {

            if (!empty($data['is_fixed'])) {
                $data['is_active'] = true;
            } else {
                $data['is_active'] = true;
            }
        }

        $data['slug'] = Str::slug($data['slug']);

        $categories = $data['categories'] ?? [];
        unset($data['categories']);

        $news = $user->news()->create($data);
        $news->categories()->sync($categories);
        $news->load('user', 'categories');

        return new NewsResource($news);
    }

    public function get(): AnonymousResourceCollection
    {
        $news = News::with(['categories', 'user'])
            ->orderByDesc('is_fixed')
            ->orderByDesc('is_draft')
            ->orderByDesc('id')
            ->get();

        return NewsResource::collection($news);
    }

    public function retrieve(string $slug): JsonResource
    {
        $news = News::with('categories', 'user')->where('slug', $slug)->first();

        if (!$news) {
            throw new AppError("News not found.", 404);
        }

        $news->increment('views');

        return new NewsResource($news);
    }

    public function update(int $id, array $data): JsonResource
    {
        $news = News::find($id);

        if (!$news) {
            throw new AppError("News not found.", 404);
        }

        if (array_key_exists("categories", $data)) {
            $categories = $data["categories"] ?? [];
            unset($data["categories"]);
            $news->categories()->sync($categories);
        }

        if (!empty($data['is_draft']) && $data['is_draft'] === true) {
            $data['is_active'] = false;
        } else {

            if (!empty($data['is_fixed'])) {
                $data['is_active'] = true;
            } else {

                $data['is_active'] = true;
            }
        }

        if (!empty($data['title']) && !array_key_exists('slug', $data)) {
            throw new AppError("Slug field is required", 422);
        }

        if (array_key_exists('slug', $data)) {
            $data['slug'] = Str::slug($data['slug']);
        }

        $news->update($data);

        $news->load('user', 'categories');

        return new NewsResource($news);
    }

    public function destroy(int $id): void
    {
        $news = News::find($id);

        if (!$news) {
            throw new AppError("News not found.", 404);
        }

        $news->delete();
    }

    public function getNewsByCategory(string $slug): AnonymousResourceCollection
    {
        $news = News::with('categories', 'user')
            ->whereHas('categories', function ($query) use ($slug) {
                $query->where('slug', $slug);
            })
            ->orderByDesc('is_fixed')
            ->orderByDesc('is_draft')
            ->orderByDesc('id')
            ->paginate(10);

        if ($news->isEmpty()) {
            throw new AppError("News not found.", 404);
        }

        return NewsResource::collection($news);
    }

    public function getNewsByUser(Request $request, int $userId): AnonymousResourceCollection
    {
        $user = $request->user();

        if ($user->is_admin) {
            $news = News::with('categories', 'user')->where('user_id', $userId)->get();

            if ($news->isEmpty()) {
                throw new AppError("News not found.", 404);
            }

            return NewsResource::collection($news);
        }

        if ($user->id !== $userId) {
            throw new AppError("Unauthorized", 401);
        }

        $news = $user->news()->with('categories', 'user')->get();

        if ($news->isEmpty()) {
            throw new AppError("News not found.", 404);
        }

        return NewsResource::collection($news);
    }

    public function getNewsByTitle(Request $request): AnonymousResourceCollection
    {
        $title = $request->query('title', '');

        $news = News::with(['categories', 'user'])
            ->when($title, function ($query, $title) {
                $query->where("title", "LIKE", "%$title%");
            })
            ->orderByDesc('is_fixed')
            ->orderByDesc('is_draft')
            ->orderByDesc('id')
            ->paginate(10);

        return NewsResource::collection($news);
    }

    public function getNewsMostViewed(): AnonymousResourceCollection
    {
        $news = News::with(["categories", "user"])->orderByDesc("views")->get();
        return NewsResource::collection($news);
    }

    public function otherNews(string $slug): AnonymousResourceCollection
    {
        $currentNews = News::where('slug', $slug)->first();

        $otherNews = News::where('news.id', '!=', $currentNews->id)->get();

        if ($otherNews->isEmpty()) {
            throw new AppError("No other news found.", 404);
        }
        return NewsResource::collection($otherNews);
    }

    public function getNewsPaginate(): AnonymousResourceCollection
    {
        $news = News::with(['categories', 'user'])
            ->orderByDesc('is_fixed')
            ->orderByDesc('is_draft')
            ->orderByDesc('id')
            ->paginate(10);
        return NewsResource::collection($news);
    }
}
