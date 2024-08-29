<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockOutResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockOut;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StockOutController extends Controller
{
    public function index(Request $request)
    {
        $query = StockOut::query();
        if ($request->has('q') && !empty($request->input('search'))) {
            $search = $request->q;

            $query->where('customer', 'like', '%' . $search . '%');

            // Dapatkan semua hasil yang cocok dengan pencarian tanpa pagination
            $stockout = $query->get();
        } else {
            $stockout = (
                StockResource::collection(Stock::get()))
                ->additional([
                'stocks' => StockOutResource::collection($query->with('stock')->where('customer', 'like', '%' . $request->q . '%')->whereDate('created_at', '>=', date($request->start_date))->whereDate('created_at', '<=', date($request->end_date))->paginate(5)),
                'filtered' => [
                    'q' => $request->q ?? '',
                    'start_date' => $request->start_date ?? Carbon::now(),
                    'end_date' => $request->end_date ?? Carbon::now()
                ]
            ]);
        }

        return inertia("Barang/Keluar", [
            'stockout' => $stockout
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
            'customer' => $request->customer
        ]);


        return to_route('stock.out');
    }
    public function destroy($id)
    {
        StockOut::find($id)->delete();
        return  to_route('stock.out');
    }
}
