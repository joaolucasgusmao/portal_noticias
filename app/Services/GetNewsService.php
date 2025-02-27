<?php

namespace App\Services;

use App\Models\News;
use Illuminate\Database\Eloquent\Collection;

class GetNewsService
{
    public function execute(): Collection
    {
        return News::orderBy("id", "asc")->get();
    }
}