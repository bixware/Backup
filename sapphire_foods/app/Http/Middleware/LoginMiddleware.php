<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $role_id = auth()->user()->role_id;

            if ($role_id == 1) {
                return redirect()->route('admin.dashboard');
            } elseif ($role_id == 2) {
                return redirect()->route('user.dashboard');
            }
        }
    }
}
