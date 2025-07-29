<?php

namespace Database\Seeders;

use App\Models\Stock;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = [
            ['name' => 'Mesin Juki', 'stock' => 5],
            ['name' => 'Mesin Jack', 'stock' => 5],
            ['name' => 'Mesin Serut', 'stock' => 5],
            ['name' => 'Gergaji Mesin', 'stock' => 5],
        ];

        foreach ($stocks as $stock) {
            Stock::create($stock);
        }
    }
}
