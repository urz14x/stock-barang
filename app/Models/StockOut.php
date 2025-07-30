<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockOut extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
    public function stockIn()
    {
        return $this->belongsTo(StockIn::class);
    }
    public function details()
    {
        return $this->hasMany(StockOutDetail::class);
    }
    protected $casts = [
        'output_date' => 'date',
    ];
}
