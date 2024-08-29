<?php

use App\Http\Controllers\PDFExportController;
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
    return Inertia::render('Welcome');
})->middleware('guest')->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get("/stock", [StockController::class, 'index'])->name('dashboard');
    Route::post("/stock", [StockController::class, 'store'])->name('dashboard.store');
    Route::get("/stock-edit/{id}", [StockController::class, 'edit'])->name('dashboard.edit');
    Route::patch("/stock/{id}", [StockController::class, 'update'])->name('dashboard.update');
    Route::delete("/stock/{id}", [StockController::class, 'destroy'])->name('dashboard.destroy');
    Route::get('/export-pdf-stock', [PDFExportController::class, 'exportPDFStock'])->name('export.pdf.stock');

    Route::get('/stock-in', [StockInController::class, 'index'])->name('stock.in');
    Route::get('/filter', [StockInController::class, 'filter'])->name('stock.in.filter');
    Route::get("/stock-in-edit/{id}", [StockInController::class, 'edit'])->name('stock.in.edit');
    Route::patch("/stock-in/{id}", [StockInController::class, 'update'])->name('stock.in.update');
    Route::post('/stock-in', [StockInController::class, 'store'])->name('stock.in.store');
    Route::delete('/stock-in/{id}', [StockInController::class, 'destroy'])->name('stock.in.delete');
    Route::get('/export-pdf', [PDFExportController::class, 'exportPDF'])->name('export.pdf');

    Route::get('/stock-out', [StockOutController::class, 'index'])->name('stock.out');
    Route::post('/stock-out', [StockOutController::class, 'store'])->name('stock.out.store');
    Route::delete('/stock-out/{id}', [StockOutController::class, 'destroy'])->name('stock.out.delete');
    Route::get('/export-pdf-stock-out', [PDFExportController::class, 'exportPDFStockOut'])->name('export.pdf.stockout');
});

require __DIR__ . '/auth.php';
