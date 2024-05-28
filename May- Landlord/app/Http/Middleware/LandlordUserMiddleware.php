<?php

namespace App\Http\Middleware;

use App\Models\Menu;
use App\Providers\RouteServiceProvider;
use App\Traits\UseMenus;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LandlordUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // dd(auth()->user()->roleUID);
        if (auth()->user()->roleUID !== '3') {
            abort('401');
        }

        // if (!in_array('/' . $request->route()->uri, $this->_menu_arr())) {
        //     return redirect()->intended(RouteServiceProvider::COMMERCIAL_USER);
        // }

        return $next($request);
    }

    /**
     * Get the Menu Array
     * @return array
     */
    public function _menu_arr()
    {
        return Menu::where('userUID', auth()->user()->userUID)
            ->pluck('menuURL')->toArray();
    }
}
