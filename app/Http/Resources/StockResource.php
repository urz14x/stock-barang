<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $totalIn = $this->stock_ins()->sum('quantity');
        $totalOut = $this->stock_outs()->sum('quantity');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'stock' => $this->stock,
            'available_stock' => $totalIn - $totalOut,
            'created_at' => $this->created_at
        ];
    }
}
