<?php

use App\Livewire\Commercial\ChangePassword;
use App\Livewire\Commercial\Dashboard as CommercialDashboard;
use App\Livewire\Commercial\DeletePage;
use App\Livewire\Commercial\Invoice;
use App\Livewire\Commercial\Settings;
use App\Livewire\Commercial\UploadInvoice;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;



Route::group(
    [
        'middleware' => ['commercial', 'auth'],
        'prefix' => 'commercial',
        'as' => 'commercial'
    ],
    function () {

        // when calling the base url
        Route::get('/', function () {
            return redirect()->intended(RouteServiceProvider::COMMERCIAL);
        });



        Route::get('dashboard', CommercialDashboard::class);
        Route::get('settings', Settings::class);
        Route::get('changepwd', ChangePassword::class);
        Route::post('changepwd', ChangePassword::class);
        Route::get('deletepage', DeletePage::class);
        Route::get('invoice', Invoice::class);
        Route::get('invoiceupload', UploadInvoice::class);
        Route::get('invoices/{id}', 'App\Livewire\Commercial\Invoice@show');
    }
);
