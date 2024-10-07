<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockInResource;
use App\Http\Resources\StockOutResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockOut;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockOutController extends Controller
{
    public function index(Request $request)
    {
        $start_date = Carbon::parse($request->input('start_date'))->startOfDay() ?? Carbon::now();
        $end_date = Carbon::parse($request->input('end_date'))->endOfDay() ?? Carbon::now();
        $search = $request->input('search');
        $stockouts = StockOutResource::collection(StockOut::query()->with('stock')->whereHas('stock', function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->whereBetween("created_at", [$start_date, $end_date])->latest()->paginate(5));

        return Inertia::render("Barang/Keluar", [
            'stockouts' => fn() => $stockouts,
            'stocks' => StockResource::collection(Stock::get()),
            'state' => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'stock_id' => 'required|integer',
            'quantity' => 'required|integer|max:9999',
            'customer' => 'required|string|max:100'
        ]);
        $stock = Stock::find($request->stock_id);
        if ($stock->stock  < $request->quantity) {
            return redirect()->back();
        }
        $stock->stock -= $request->quantity;
        $stock->save();
        StockOut::updateOrCreate(['stock_id' => $request->stock_id], [
            'quantity' => $request->quantity,
            'customer' => $request->customer,
            'created_at'=>$request->input_date ?? Carbon::now()
        ]);

        return redirect('/stock-out');
    }
    public function destroy($id)
    {
        StockOut::find($id)->delete();
        return  to_route('stock.out');
    }
}
