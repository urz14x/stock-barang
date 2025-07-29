<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockOutResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockIn;
use App\Models\StockOut;
use App\Models\StockOutDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockOutController extends Controller
{
    public function index(Request $request)
    {
        $start_date = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfDay();
        $end_date = $request->end_date ? Carbon::parse($request->end_date)->endOfDay() : Carbon::now()->endOfDay();
        $search = $request->input('search');

        $stockouts = StockOut::with(['stock'])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('stock', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
            })
            ->whereBetween('output_date', [$start_date, $end_date])
            ->latest()
            ->paginate(5);

        return Inertia::render("Barang/Keluar", [
            'stockouts' => StockOutResource::collection($stockouts),
            'stocks' => StockResource::collection(Stock::all()),
            'state' => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }
    public function show($id)
    {
        $stockOut = StockOut::with(['details.stockIn'])->findOrFail($id);
        return response()->json($stockOut);
    }
    public function store(Request $request)
    {
        $request->validate([
            'stock_id' => 'required|exists:stocks,id',
            'quantity' => 'required|integer|min:1',
            'customer' => 'required|string|max:100',
            'output_date' => 'nullable|date',
        ]);

        DB::beginTransaction();
        try {
            $stock = Stock::findOrFail($request->stock_id);

            // Validasi stok masuk tersedia
            $totalIn = StockIn::where('stock_id', $stock->id)->sum('quantity');
            $totalOut = StockOut::where('stock_id', $stock->id)->sum('quantity');
            $availableStock = $totalIn - $totalOut;

            if ($availableStock < $request->quantity) {
                return redirect()->back()->withErrors(['quantity' => 'Stok tidak mencukupi.']);
            }

            $remainingQty = $request->quantity;

            // Ambil stok masuk berdasarkan FIFO
            $stockIns = StockIn::where('stock_id', $stock->id)
                ->where('remaining_quantity', '>', 0)
                ->orderBy('input_date', 'asc')
                ->get();

            // Buat record stock_out
            $stockOut = StockOut::create([
                'stock_id' => $stock->id,
                'quantity' => $request->quantity,
                'customer' => $request->customer,
                'output_date' => $request->filled('output_date') ? Carbon::parse($request->output_date) : now(),
            ]);

            foreach ($stockIns as $stockIn) {
                if ($remainingQty <= 0) break;

                $deductQty = min($stockIn->remaining_quantity, $remainingQty);

                // Update remaining_quantity di stock_in
                $stockIn->remaining_quantity -= $deductQty;
                $stockIn->save();

                // Catat detail pengeluaran (relasi ke stock_in)
                StockOutDetail::create([
                    'stock_out_id' => $stockOut->id,
                    'stock_in_id' => $stockIn->id,
                    'quantity' => $deductQty,
                ]);

                $remainingQty -= $deductQty;
            }

            // Update total stok di tabel stok
            $stock->stock -= $request->quantity;
            $stock->save();

            DB::commit();

            return redirect('/stock-out')->with('success', 'Barang berhasil dikeluarkan dengan metode FIFO.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $stockOut = StockOut::with('details.stockIn')->findOrFail($id);

        // Kembalikan stok ke tabel stocks
        $stock = $stockOut->stock;
        if ($stock) {
            $stock->stock += $stockOut->quantity;
            $stock->save();
        }

        // Kembalikan remaining_quantity ke stock_in berdasarkan FIFO
        foreach ($stockOut->details as $detail) {
            $stockIn = $detail->stockIn;
            if ($stockIn) {
                $stockIn->remaining_quantity += $detail->quantity;
                $stockIn->save();
            }
            $detail->delete(); // hapus detail satu per satu
        }

        $stockOut->delete(); // terakhir hapus data utama

        return redirect()->back()->with('success', 'Barang keluar dihapus dan stok dikembalikan.');
    }
}
