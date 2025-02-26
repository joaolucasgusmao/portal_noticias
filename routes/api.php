<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// Users
Route::post("/users", [UsersController::class, 'storeUser']);
Route::post("/users/login", [UsersController::class, 'login']);

Route::middleware(['auth.custom'])->group(function () {
    Route::get("/users", [UsersController::class, 'getUsers'])->middleware('admin');
    Route::get("/users/{id}", [UsersController::class, 'retrieveUser'])->middleware('admin');
    Route::patch("/users/{id}", [UsersController::class, 'updateUser']);
    Route::delete("/users/{id}", [UsersController::class, 'destroyUser'])->middleware('admin');
});

// News
Route::middleware(["auth.custom"])->group(function () {
    Route::post("/news", [NewsController::class, 'storeNews']);
});

// Categories
Route::middleware(["auth.custom"])->group(function () {
    Route::post("/categories", [CategoriesController::class, 'storeCategory']);
});
