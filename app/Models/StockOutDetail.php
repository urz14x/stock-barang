<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOutDetail extends Model
{
    use HasFactory;
    protected $fillable = ['stock_out_id', 'stock_in_id', 'quantity'];
    public function stockOut()
    {
        return $this->belongsTo(StockOut::class);
    }

    public function stockIn()
    {
        return $this->belongsTo(StockIn::class);
    }
}
