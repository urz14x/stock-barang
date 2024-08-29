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
            'stocks_name' => $this->stock->name,
            'quantity' => $this->quantity,
            'customer' => $this->customer,
            'created_at' => $this->created_at
        ];
    }
}
