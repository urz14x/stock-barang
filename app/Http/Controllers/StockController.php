<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockResource;
use App\Models\Stock;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $query = Stock::query();
        if($request->has('q') && !empty($request->input('search'))){
            $search = $request->q;

            $query->where('name', 'like', '%' . $search . '%');

            // Dapatkan semua hasil yang cocok dengan pencarian tanpa pagination
            $stocks = $query->get();
        }else {
            // Jika tidak ada pencarian, gunakan pagination
            $stocks = (
                StockResource::collection(Stock::query()->where('name', 'like', '%' . $request->q . '%')->with('stock_ins')->select('id', 'name', 'stock', 'created_at')->paginate(5))
            )->additional([
                'attributes' => [
                    'total' => Stock::count(),
                    'per_page' => 5
                ],
                'filtered' => [
                    'q' => $request->q ?? '',
                    'start_date' => $request->start_date ?? Carbon::now(),
                    'end_date' => $request->end_date ?? Carbon::now(),
                    'page' => $request->page ?? 1,
                ]
            ]);
        }

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
        return to_route('dashboard');
    }
}
