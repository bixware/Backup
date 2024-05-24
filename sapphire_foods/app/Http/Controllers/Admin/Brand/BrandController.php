<?php

namespace App\Http\Controllers\Admin\Brand;

use App\Models\Brand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BrandController extends Controller
{
    public function getBrand()
    {
        $brand = Brand::all();
        return response()->json($brand);
    }
}
