<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RealStateController;
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
Route::get("/news/title", [NewsController::class, "getNewsByTitle"]);
Route::get("/news/category/{categoryId}", [NewsController::class, "getNewsByCategory"]);
Route::get("/news/{id}", [NewsController::class, "retrieve"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::post("/news", [NewsController::class, "store"]);
    Route::patch("/news/{id}", [NewsController::class, "update"]);
    Route::delete("/news/{id}", [NewsController::class, "destroy"]);
    Route::get("/news/user/{userId}", [NewsController::class, "getNewsByUser"]);
});


// Categories
Route::get("/categories", [CategoryController::class, "get"]);
Route::get("/categories/paginate", [CategoryController::class, "getCategoriesPaginate"]);
Route::get("/categories/{id}", [CategoryController::class, "retrieve"]);

Route::middleware(["auth.custom"])->group(function () {
    Route::post("/categories", [CategoryController::class, "store"])->middleware("admin");
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


// Real States
Route::middleware(["auth.custom"])->group(function () {
    Route::post("/realstates", [RealStateController::class, "store"]);
    Route::patch("/realstates/{id}", [RealStateController::class, "update"]);
    Route::delete("/realstates/{id}", [RealStateController::class, "destroy"]);
    Route::get("/realstates/user/{userId}", [RealStateController::class, "getRealStatesByUser"]);
});

Route::get("/realstates", [RealStateController::class, "get"]);
Route::get("/realstates/paginate", [RealStateController::class, "getRealStatesPaginate"]);
Route::get("/realstates/{id}", [RealStateController::class, "retrieve"]);
