<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockInResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockIn;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockInController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = StockIn::query()->with('stock');

        // Filter berdasarkan pencarian
        if ($search) {
            $query->whereHas('stock', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        // Tanggal filter
        $start_date = $request->filled('start_date') && $request->start_date !== 'undefined'
            ? Carbon::parse($request->start_date)->startOfDay()
            : null;

        $end_date = $request->filled('end_date') && $request->end_date !== 'undefined'
            ? Carbon::parse($request->end_date)->endOfDay()
            : null;

        // Terapkan filter tanggal yang sesuai
        if ($start_date && $end_date) {
            $query->whereBetween('input_date', [$start_date, $end_date]);
        } elseif ($start_date) {
            $query->whereDate('input_date', '>=', $start_date);
        } elseif ($end_date) {
            $query->whereDate('input_date', '<=', $end_date);
        }

        // Ambil data paginasi
        $stockins = StockInResource::collection(
            $query->latest()->paginate(5)
        );

        return Inertia::render("Barang/Masuk", [
            'stockins' => fn() => $stockins,
            'stocks' => StockResource::collection(Stock::get()),
            'state' => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'stock_id' => 'required|exists:stocks,id',
            'quantity' => 'required|integer|min:1',
            'input_date' => 'nullable|date',
        ]);

        try {
            // Gunakan input_date atau waktu sekarang jika tidak diberikan
            $inputDate = $request->filled('input_date') ? Carbon::parse($request->input_date) : now();

            // Ambil data stok barang
            $stock = Stock::findOrFail($request->stock_id);

            // Tambahkan jumlah barang masuk ke total stok
            $stock->stock += $request->quantity;
            $stock->save();

            // Simpan entri baru ke tabel stock_in dengan remaining_quantity = quantity
            StockIn::create([
                'stock_id'          => $request->stock_id,
                'quantity'          => $request->quantity,
                'remaining_quantity' => $request->quantity, // FIFO tracking
                'input_date'        => $inputDate,
            ]);
            return redirect('/stock-in')->with('success', 'Barang berhasil di inputkan');
            // return redirect('/stock-in')->with('success', 'Barang masuk berhasil ditambahkan dengan metode FIFO.');
        } catch (\Throwable $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menambahkan stok: ' . $e->getMessage()]);
        }
    }
    public function edit($id)
    {
        $stockIn = StockIn::findOrFail($id);

        if ($stockIn->remaining_quantity < $stockIn->quantity) {
            return back()->withErrors(['error' => 'Tidak dapat mengedit karena stok telah digunakan.']);
        }
        // dd((new StockInResource($stockIn))->toArray(request()));
        return Inertia::render('EditStokMasuk', [
            'stockin' => new StockInResource($stockIn),
            'stocks' => StockResource::collection(Stock::select('id', 'name')->get()),
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'stock_id' => 'required|exists:stocks,id',
            'quantity' => 'required|integer|min:1',
            'input_date' => 'required|date',
        ]);

        DB::beginTransaction();
        try {
            $stockIn = StockIn::findOrFail($id);
            $oldQty = $stockIn->quantity;
            $oldRemaining = $stockIn->remaining_quantity;
            $newQty = $request->quantity;

            // Hitung selisih quantity
            $selisih = $newQty - $oldQty;

            // Jika mengurangi quantity dan remaining < selisih, berarti barang sudah terpakai
            if ($selisih < 0 && abs($selisih) > $oldRemaining) {
                return redirect()->back()->withErrors(['quantity' => 'Tidak bisa mengurangi quantity karena sebagian barang sudah keluar.']);
            }

            // Update stock_in
            $stockIn->update([
                'stock_id' => $request->stock_id,
                'quantity' => $newQty,
                'remaining_quantity' => $oldRemaining + $selisih,
                'input_date' => $request->input_date,
            ]);

            // Update total stock di tabel stocks
            $stock = Stock::find($request->stock_id);
            $stock->stock += $selisih;
            $stock->save();

            DB::commit();

            return redirect()->route('stock.in')->with('success', 'Data berhasil diperbarui.');
        } catch (\Throwable $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }
    public function destroy($id)
    {
        $stockIn = StockIn::findOrFail($id);

        // Cek apakah stok belum terpakai
        if ($stockIn->remaining_quantity < $stockIn->quantity) {
            return back()->withErrors(['error' => 'Stok sudah digunakan, tidak bisa dihapus.']);
        }

        // Kurangi stock
        $stock = $stockIn->stock;
        if ($stock) {
            $stock->stock -= $stockIn->quantity;
            $stock->save();
        }

        $stockIn->delete();

        return redirect()->back()->with('success', 'Barang masuk dihapus dan stok dikurangi.');
    }
}
