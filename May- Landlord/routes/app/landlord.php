<?php

use App\Livewire\Landlord\ChangePassword;
use App\Livewire\Landlord\Dashboard as LandlordDashboard;
use App\Livewire\Landlord\Invoice;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'middleware' => ['landlord', 'auth'],
        'prefix' => 'landlord',
        'as' => 'landlord'
    ],
    function () {
        // when calling the base url
        Route::get('/', function () {
            return redirect()->intended(RouteServiceProvider::LANDLORD);
        });
        Route::get('dashboard', LandlordDashboard::class);
        Route::get('invoice', Invoice::class);
        Route::get('changepwd', ChangePassword::class);
        //Route::get('settings', Settings::class);
    }
);
