<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post("/users", [UsersController::class, 'storeUser']);
Route::get("/users", [UsersController::class, 'getUsers']);
Route::get("/users/{id}", [UsersController::class, 'retrieveUser']);
Route::patch("/users/{id}", [UsersController::class, 'updateUser']);
Route::delete("/users/{id}", [UsersController::class, 'destroyUser']);

Route::post("/users/login", [UsersController::class, 'login']);
