<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StockOutController extends Controller
{
    public function index()
    {
        return inertia("Barang/Keluar");
    }
}
