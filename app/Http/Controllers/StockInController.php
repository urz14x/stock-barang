<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockInResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockIn;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StockInController extends Controller
{
    public function index(Request $request)
    {
        $query = StockIn::query();
        $stockin = (StockResource::collection(Stock::get()))->additional([
            'stocks' => StockInResource::collection($query->with('stock')->whereDate('created_at', '>=', date($request->start_date))->whereDate('created_at', '<=', date($request->end_date))->where('stock_id', 'like', '%' . $request->q . '%')->paginate(10)),
            'filtered' => [
                'q' => $request->q ?? '',
                'start_date' => $request->start_date ?? Carbon::now(),
                'end_date' => $request->end_date ?? Carbon::now()
            ]
        ]);
        // return $stockin;
        return inertia("Barang/Masuk", [
            'stockin' => $stockin
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
            'quantity' => $request->quantity
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
    public function update(Request $request, $id){
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
