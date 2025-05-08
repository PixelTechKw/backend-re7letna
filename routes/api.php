<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\QuestionnaireController;
use App\Http\Controllers\Api\StageController;
use App\Http\Controllers\Api\ToolController;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(
    ['as' => 'api.'],
    function () {
        Route::middleware('auth:sanctum')->group(
            function () {
                Route::post('/change-password', [UserController::class, 'changePassword'])->name('change-password');
                Route::resource('quiz', Quiz::class);
            }
        );

        Route::middleware('guest:sanctum')->group(
            function () {
                Route::resource('questionnaire', QuestionnaireController::class)->only(['index', 'show']);
                Route::resource('category', CategoryController::class)->only(['index']);
                Route::resource('stage', StageController::class)->only(['index']);
                Route::resource('tool', ToolController::class)->only(['index', 'show']);
                Route::post('/login', [UserController::class, 'login'])->name('login');
                Route::post('/register', [UserController::class, 'register'])->name('register');
                Route::post('/forgot-password', [UserController::class, 'forgotPassword'])->name('forgot-password');
            }
        );
    }
);
