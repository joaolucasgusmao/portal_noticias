<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Users
Route::post("/users/login", [UserController::class, "login"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::post("/users/register", [UserController::class, "store"])->middleware("admin");
    Route::get("/users", [UserController::class, "get"])->middleware("admin");
    Route::get("/users/paginate", [UserController::class, "getUsersPaginate"])->middleware("admin");
    Route::get("/users/{id}", [UserController::class, "retrieve"])->middleware("admin");
    Route::patch("/users/{id}", [UserController::class, "update"]);
    Route::delete("/users/{id}", [UserController::class, "destroy"])->middleware("admin");
});


// News
Route::get("/news", [NewsController::class, "get"]);
Route::get("/news/paginate", [NewsController::class, "getNewsPaginate"]);
Route::get("/news/{id}", [NewsController::class, "retrieve"]);
Route::get("/news/category/{categoryId}", [NewsController::class, "getNewsByCategory"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::post("/news", [NewsController::class, "store"]);
    Route::patch("/news/{id}", [NewsController::class, "update"]);
    Route::delete("/news/{id}", [NewsController::class, "destroy"]);
    Route::get("/news/user/{userId}", [NewsController::class, "getNewsByUser"]);
});


// Categories
Route::middleware(["auth.custom"])->group(function () {
    Route::post("/categories", [CategoryController::class, "store"])->middleware("admin");
    Route::get("/categories", [CategoryController::class, "get"])->middleware("admin");
    Route::get("/categories/paginate", [CategoryController::class, "getCategoriesPaginate"])->middleware("admin");
    Route::get("/categories/{id}", [CategoryController::class, "retrieve"])->middleware("admin");
    Route::patch("/categories/{id}", [CategoryController::class, "update"])->middleware("admin");
    Route::delete("/categories/{id}", [CategoryController::class, "destroy"])->middleware("admin");
});


// Banners
Route::middleware(["auth.custom"])->group(function () {
    Route::post("/banners", [BannerController::class, "store"]);
    Route::patch("/banners/{id}", [BannerController::class, "update"]);
    Route::delete("/banners/{id}", [BannerController::class, "destroy"]);
    Route::get("/banners/paginate", [BannerController::class, "getBannersPaginate"]);
});

Route::get("/banners", [BannerController::class, "get"]);
Route::get("/banners/{id}", [BannerController::class, "retrieve"]);
