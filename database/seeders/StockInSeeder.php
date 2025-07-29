<?php

namespace Database\Seeders;

use App\Models\Stock;
use App\Models\StockIn;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockInSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = Stock::all();

        foreach ($stocks as $stock) {
            StockIn::create([
                'stock_id' => $stock->id,
                'quantity' => rand(5, 20),
                'input_date' => Carbon::now()->subDays(rand(1, 30))->format('Y-m-d'),
            ]);
        }
    }
}
