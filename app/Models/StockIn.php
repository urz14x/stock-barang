<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockIn extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function stockOuts()
    {
        return $this->hasMany(StockOut::class);
    }
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
    protected $fillable = ['stock_id', 'quantity',  'remaining_quantity', 'input_date', 'created_at'];
}
