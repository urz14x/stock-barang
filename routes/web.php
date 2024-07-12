<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\StockInController;
use App\Http\Controllers\StockOutController;
use App\Models\StockIn;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get("/stock", [StockController::class, 'index'])->name('dashboard');
    Route::post("/stock", [StockController::class, 'store'])->name('dashboard.store');
    Route::get("/stock-edit/{id}", [StockController::class, 'edit'])->name('dashboard.edit');
    Route::patch("/stock/{id}", [StockController::class, 'update'])->name('dashboard.update');
    Route::delete("/stock/{id}", [StockController::class, 'destroy'])->name('dashboard.destroy');

    Route::get('/stock-in', [StockInController::class, 'index'])->name('stock.in');
    Route::post('/stock-in', [StockInController::class, 'store'])->name('stock.in.store');
    Route::get('/stock-out', [StockOutController::class, 'index'])->name('stock.out');
});

require __DIR__ . '/auth.php';
