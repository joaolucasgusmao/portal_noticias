<?php

namespace App\Services;

use App\Models\News;
use Illuminate\Http\Request;

class StoreNewsService
{
    public function execute(array $data, Request $request): News
    {
        $user = $request->user();

        $categories = $data['categories'];
        unset($data['categories']);

        $news = $user->news()->create($data);

        $news->categories()->attach($categories);

        return $news;
    }
}
