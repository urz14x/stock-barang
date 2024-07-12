<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockInResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockIn;
use Illuminate\Http\Request;

class StockInController extends Controller
{
    public function index()
    {
        $stockin = StockIn::query()->with('stock')->select('id', 'quantity', 'stock_id')->get();
        return StockInResource::collection($stockin->all());
        // return inertia("Barang/Masuk", [
        //     'stockin' => $stockin
        // ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'stock_id' => 'required|integer',
            'quantity' => 'required|integer|max:9999',
        ]);
        $stock = Stock::find($request->stock_id);
        $stock->stock += $request->quantity;

        StockIn::create([
            'stock_id' => $request->stock_id,
            'quantity' => $request->quantity
        ]);
        return  to_route('dashboard');
    }
    public function edit()
    {
    }
    public function destroy()
    {
    }
}
