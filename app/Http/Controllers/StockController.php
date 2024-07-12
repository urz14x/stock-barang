<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockResource;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stocks = Stock::query()->with('stock_ins')->select('id', 'name', 'stock')->paginate(5);
        StockResource::collection($stocks);
        return inertia('Dashboard', [
            'stocks' => $stocks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:100',
            'stock' => 'required|integer|max:9999',
        ]);
        Stock::create($attributes);
        return  to_route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $stock = Stock::where('id', $id)->first();
        return inertia('EditStokBarang', [
            'stock' => $stock
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $attributes = $request->validate([
            'name' => 'required|string|max:100',
            'stock' => 'required|integer|max:9999',
        ]);
        $stock = Stock::where('id', $id)->first();
        $stock->update($attributes);
        return  to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Stock::find($id)->delete();
        return  to_route('dashboard');
    }
}
