<?php

namespace App\Services;

use App\Models\Banner;
use Illuminate\Database\Eloquent\Collection;

class GetBannersService
{
    public function execute(): Collection
    {
        return Banner::orderBy("id", "asc")->get();
    }
}