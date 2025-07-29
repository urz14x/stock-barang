<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockOutResource extends JsonResource
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
            'stock_id' => $this->stock_id,
            'stocks_name' => $this->stock->name ?? null,
            'quantity' => $this->quantity,
            'customer' => $this->customer,
            'output_date' => $this->output_date,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'details' => StockOutDetailResource::collection($this->whenLoaded('details')),
        ];
    }
}
