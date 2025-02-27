<?php

use App\Http\Controllers\BannersController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

// Users
Route::post("/users", [UsersController::class, "storeUser"]);
Route::post("/users/login", [UsersController::class, "login"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::get("/users", [UsersController::class, "getUsers"])->middleware("admin");
    Route::get("/users/{id}", [UsersController::class, "retrieveUser"])->middleware("admin");
    Route::patch("/users/{id}", [UsersController::class, "updateUser"]);
    Route::delete("/users/{id}", [UsersController::class, "destroyUser"])->middleware("admin");
});


// News
Route::get("/news", [NewsController::class, "getNews"]);
Route::get("/news/{id}", [NewsController::class, "retrieveNews"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::post("/news", [NewsController::class, "storeNews"]);
    Route::patch("/news/{id}", [NewsController::class, "updateNews"]);
    Route::delete("/news/{id}", [NewsController::class, "destroyNews"]);
});


// Categories
Route::middleware(["auth.custom"])->group(function () {
    Route::post("/categories", [CategoriesController::class, "storeCategory"])->middleware("admin");
    Route::get("/categories", [CategoriesController::class, "getCategories"])->middleware("admin");
    Route::get("/categories/{id}", [CategoriesController::class, "retrieveCategory"])->middleware("admin");
    Route::patch("/categories/{id}", [CategoriesController::class, "updateCategory"])->middleware("admin");
    Route::delete("/categories/{id}", [CategoriesController::class, "destroyCategory"])->middleware("admin");
});


// Banners
Route::get("/banners", [BannersController::class, "getBanners"]);
Route::get("/banners/{id}", [BannersController::class, "retrieveBanner"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::post("/banners", [BannersController::class, "storeBanner"]);
    Route::patch("/banners/{id}", [BannersController::class, "updateBanner"]);
    Route::patch("/banners/{id}", [BannersController::class, "updateBanner"]);
    Route::delete("/banners/{id}", [BannersController::class, "destroyBanner"]);
});



