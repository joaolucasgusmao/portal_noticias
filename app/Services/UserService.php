<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function store(array $data): User
    {
        if (User::where('email', $data['email'])->orWhere('phone_number', $data['phone_number'])->exists()) {
            throw new AppError("Email or phone number already registered.", 409);
        }

        return User::create($data);
    }

    public function get(): Collection
    {
        return User::oldest("id")->get();
    }

    public function retrieve(int $id): User
    {
        $user = User::find($id);

        if (!$user) {
            throw new AppError("User not found.", 404);
        }

        return $user;
    }

    public function update(array $data, int $id): User
    {
        $user = User::find($id);

        if (!$user) {
            throw new AppError("User not found.", 404);
        }

        $user->update($data);

        return $user;
    }

    public function destroy(int $id): void
    {
        $user = User::find($id);

        if (!$user) {
            throw new AppError("User not found.", 404);
        }

        $user->delete();
    }

    public function login(array $data): array
    {
        $user = User::where("email", $data["email"])->first();

        if (!$user || !Hash::check($data["password"], $user->password)) {
            throw new AppError("Incorrect email or password!", 401);
        }

        $token = $user->createToken('auth_token', ['*'], now()->addDay())->plainTextToken;

        return [
            "access_token" => $token,
            "user" => $user
        ];
    }
}
