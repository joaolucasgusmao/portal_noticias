<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\News;
use App\Models\RealState;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class RealStateService
{

    public function store(array $data, Request $request): RealState
    {
        $user = $request->user();

        $news = $user->real_state()->create($data);

        return $news;
    }

    public function get(): Collection
    {
        return RealState::oldest("id")->get();
    }

    public function retrieve(int $id): RealState
    {
        $real_state = RealState::find($id);

        if (!$real_state) {
            throw new AppError("Real State not found.", 404);
        }

        return $real_state;
    }

    public function update(int $id, array $data): RealState
    {
        $real_state = RealState::find($id);

        if (!$real_state) {
            throw new AppError("Real State found.", 404);
        }

        $real_state->update($data);
        return $real_state;
    }

    public function destroy(int $id): void
    {
        $real_state = RealState::find($id);

        if (!$real_state) {
            throw new AppError("Real State not found.", 404);
        }

        $real_state->delete();
    }

    public function getRealStateByUser(Request $request, int $userId): Collection
    {
        $user = $request->user();

        if ($user->is_admin) {
            $real_state = RealState::where('user_id', $userId)->get();

            if ($real_state->isEmpty()) {
                throw new AppError("Real States not found.", 404);
            }

            return $real_state;
        }

        if ($user->id !== $userId) {
            throw new AppError("Unauthorized", 401);
        }

        if ($user->real_state->isEmpty()) {
            throw new AppError("Real States not found.", 404);
        }

        return $user->real_state;
    }

    public function getRealStatePaginate(): LengthAwarePaginator
    {
        return RealState::paginate(10);
    }
}
