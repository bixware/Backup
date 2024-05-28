<?php

namespace App\Http\Middleware;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Middleware\Authenticate as Middleware;


class UserExist extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        
        if (! Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No user Found',
            ],401);
        }
    }
}
