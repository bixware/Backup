<?php

use App\Livewire\Auth\Login;
use App\Livewire\Auth\ForgotPassword;
use App\Livewire\Auth\ResetPassword;
use Illuminate\Support\Facades\Route;
use Livewire\Livewire;


/**
 * Configuring livewire to check the current project
 */
Livewire::setUpdateRoute(function ($handle) {
    return Route::post('/AbfrlLandlord/livewire/update', $handle);
});



Route::get('/', Login::class)
    ->name('login');
Route::get('forgot-password', ForgotPassword::class);
Route::post('forgot-password', ForgotPassword::class)->name('sendResetLink');
Route::get('reset-password/{token}', ResetPassword::class);
Route::post('reset-password', ResetPassword::class)->name('resetpassword');

require __DIR__ . '/app/admin.php';
require __DIR__ . '/app/commercial.php';
require __DIR__ . '/app/landlord.php';
