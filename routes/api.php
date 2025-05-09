<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChildController;
use App\Http\Controllers\Api\QuestionnaireController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\StageController;
use App\Http\Controllers\Api\ToolController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ConsultantController;
use App\Models\Consultant;
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
                Route::post('/forgot-password', [UserController::class, 'forgotPassword'])->name('change-password');
                Route::resource('quiz', QuizController::class);
                Route::post('/logout', [UserController::class, 'logout'])->name('logout');
                Route::post('/update/{id}', [UserController::class, 'update'])->name('update');
                Route::resource('child', ChildController::class);
            }
        );
        Route::resource('questionnaire', QuestionnaireController::class)->only(['index', 'show']);
        Route::resource('category', CategoryController::class)->only(['index']);
        Route::resource('video', VideoController::class)->only(['index', 'show']);
        Route::resource('stage', StageController::class)->only(['index']);
        Route::resource('tool', ToolController::class)->only(['index', 'show']);
        Route::resource('comment', CommentController::class)->only(['store']);
        Route::resource('consultant', ConsultantController::class)->only(['index', 'show']);
        Route::post('/login', [UserController::class, 'login'])->name('login');
        Route::post('/register', [UserController::class, 'register'])->name('register');
        Route::post('/forgot-password', [UserController::class, 'forgotPassword'])->name('forgot-password');
    }
);
