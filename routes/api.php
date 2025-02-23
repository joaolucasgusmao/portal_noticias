<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::post("/users", [UsersController::class, 'store']);
Route::get("/users", [UsersController::class, 'getUsers']);