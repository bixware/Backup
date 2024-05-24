<?php

namespace App\Http\Controllers\BusinessUser;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BusinessUserController extends Controller
{
    public function index()
    {
        // return "user_dashboard";
        return response()->json(['hello' => 'business_dashboard']);
    }
}
