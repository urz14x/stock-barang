<?php

namespace Database\Seeders;

use App\Models\Stock;
use App\Models\StockOut;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockOutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = Stock::all();

        foreach ($stocks as $stock) {
            StockOut::create([
                'stock_id' => $stock->id,
                'quantity' => rand(1, 5),
                'customer' => 'Pelanggan ' . $stock->id,
                'input_date' => Carbon::now()->subDays(rand(0, 10))->format('Y-m-d'),
            ]);
        }
    }
}
