<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockInResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockIn;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockInController extends Controller
{
    public function index(Request $request)
    {
        $start_date = Carbon::parse($request->input('start_date'))->startOfDay() ?? Carbon::now();
        $end_date = Carbon::parse($request->input('end_date'))->endOfDay() ?? Carbon::now();
        $search = $request->input('search');
        $stockins = StockInResource::collection(StockIn::query()->with('stock')->whereHas('stock', function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->whereBetween("created_at", [$start_date, $end_date])->latest()->paginate(5));

        return Inertia::render("Barang/Masuk", [
            'stockins' => fn() => $stockins,
            'stocks' => StockResource::collection(Stock::get()),
            'state' => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'stock_id' => 'required|integer',
            'quantity' => 'required|integer|max:9999',
        ]);
        $stock = Stock::find($request->stock_id);
        $stock->stock += $request->quantity;
        $stock->save();

        // if(StockIn::where('stock_id', $stock)->exists()){
        //     $stock->stock += $request->quantity;
        //     $stock->save();
        // }

        StockIn::updateOrCreate(['stock_id' => $request->stock_id], [
            'quantity' => $request->quantity,
            'created_at'=>$request->input_date ?? Carbon::now()
        ]);

        // $stock->stock += $request->quantity;
        // $stock->save();

        // StockIn::firstOrCreate($attribute);
        return redirect('/stock-in');
    }

    public function edit($id)
    {
        $stockin = StockIn::where('id', $id)->first();
        return inertia('EditStokMasuk', [
            'stockin' => $stockin
        ]);
    }
    public function update(Request $request, $id)
    {
        // $attributes = $request->validate([
        //     'name' => 'required|string|max:100',
        //     'stock_id' => 'required|integer',
        // ]);
        // $stock = Stock::where('id', $id)->first();
        // $stock->update($attributes);
        // return  to_route('dashboard');
    }
    public function destroy($id)
    {
        StockIn::find($id)->delete();
        return  to_route('stock.in');
    }
}
