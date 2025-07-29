<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockOutDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'stock_in_id' => $this->stock_in_id,
            'stock_out_id' => $this->stock_out_id,
            'quantity' => $this->quantity,
            'stock_in' => new StockInResource($this->whenLoaded('stockIn')),
        ];
    }
}
