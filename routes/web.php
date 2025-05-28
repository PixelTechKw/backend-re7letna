<?php

use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\SettingController;
use App\Http\Controllers\Backend\UserController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group(
    ['middleware' => ['auth', 'verified', 'adminAccess'], 'as' => 'backend.', 'prefix' => 'dashboard'],
    function () {
        Route::get('/home', [DashboardController::class, 'index'])->name('home');
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::resource('user', UserController::class);
        Route::resource('setting', SettingController::class);
        Route::get("toggle/activate", [DashboardController::class, "toggleActivate"])->name("toggle.activate");
        Route::get("toggle/order", [DashboardController::class, "toggleOrder"])->name("toggle.order");
        Route::get("toggle/home", [DashboardController::class, "toggleOnHome"])->name("toggle.home");
        Route::get("update/status", [DashboardController::class, "updateStatus"])->name("update.status");
    }
);
Route::group(
    ['as' => 'frontend.'],
    function () {
        Route::get('/', [HomeController::class, 'index'])->name('home');
    }
);


require __DIR__ . '/auth.php';
