<?php

namespace App\Services;

use App\Exceptions\AppError;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function store(array $data): User
    {
        $userEmail = User::firstWhere("email", $data["email"]);
        $userPhoneNumber = User::firstWhere("phone_number", $data["phone_number"]);

        if (!is_null($userEmail)) {
            throw new AppError("O e-mail já existe.", 409);
        }

        if (!is_null($userPhoneNumber)) {
            throw new AppError("O número de telefone já existe.", 409);
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
        if (is_null($user)) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        return $user;
    }

    public function update(array $data, int $id): User
    {
        $userToUpdate = User::find($id);

        if (is_null($userToUpdate)) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        $userToUpdate->update($data);

        return $userToUpdate;
    }

    public function destroy(int $id): void
    {
        $userToDestroy = User::find($id);

        if (is_null($userToDestroy)) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        $userToDestroy->delete();
    }

    public function login(array $data): array
    {
        $user = User::firstWhere("email", $data["email"]);

        if (is_null($user)) {
            throw new AppError("E-mail incorreto!", 401);
        }

        if (!password_verify($data["password"], $user->password)) {
            throw new AppError("Senha incorreta!", 401);
        }

        $token = $user->createToken('auth_token', ['*'], now()->addDay())->plainTextToken;

        return [
            "access_token" => $token,
            "user" => $user
        ];
    }
}
