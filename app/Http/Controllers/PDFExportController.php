<?php

namespace App\Http\Controllers;

use App\Http\Resources\StockInResource;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use App\Models\StockIn;
use App\Models\StockOut;
use Carbon\Carbon;
use PDF;
use Illuminate\Http\Request;

class PDFExportController extends Controller
{
    public function index(){
         $stockins = StockIn::get();
        return view('StockInExport', compact('stockins'));
    }
    public function exportStock(Request $request)
    {
        $start_date = Carbon::parse($request->start_date)->startOfDay() ?? Carbon::now();
        $end_date = Carbon::parse($request->end_date)->endOfDay() ?? Carbon::now();
        // Ambil data yang ingin diexport
        $stocks = Stock::whereDate('created_at', '>=', $start_date)->whereDate('created_at', '<=', $end_date)->get();

        // Membuat view untuk PDF
        $pdf = PDF::loadView('StockExport', compact('stocks', 'start_date', 'end_date'));

        // Mengunduh file PDF
        return $pdf->download(Carbon::now() . '-laporan-stock.pdf');
    }
    public function exportPDF(Request $request)
    {
        $start_date = Carbon::parse($request->input('start_date'))->startOfDay() ?? Carbon::now();
        $end_date = Carbon::parse($request->input('end_date'))->endOfDay() ?? Carbon::now();
        // Ambil data yang ingin diexport
        $stockins = StockIn::whereDate('created_at', '>=', $start_date)->whereDate('created_at', '<=', $end_date)->get();

        // Membuat view untuk PDF
        $pdf = PDF::loadView('StockInExport', compact('stockins', 'start_date', 'end_date'));

        // Mengunduh file PDF
        return $pdf->download(Carbon::now() . '-laporan-miftah-machine.pdf');
    }
    public function exportPDFStockOut(Request $request)
    {
        $start_date = Carbon::parse($request->start_date)->startOfDay() ?? Carbon::now();
        $end_date = Carbon::parse($request->end_date)->endOfDay() ?? Carbon::now();
        // Ambil data yang ingin diexport
        $stockouts = StockOut::whereDate('created_at', '>=', $start_date)->whereDate('created_at', '<=', $end_date)->get();

        // Membuat view untuk PDF
        $pdf = PDF::loadView('StockOutExport', compact('stockouts', 'start_date', 'end_date'));

        // Mengunduh file PDF
        return $pdf->download(Carbon::now() . '-laporan-barang-keluar.pdf');
    }
}
