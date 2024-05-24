<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user = JWTAuth::parseToken()->authenticate();

        // checking the role id
        if ($user->roleUID == 1) {
            return $next($request);
        }

        // Generating the error response
        return response()->json([
            "status" => 401,
            "message" => "Unauthorized"
        ], 401);
    }
}
