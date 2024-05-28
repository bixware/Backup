<?php

use App\Livewire\User\Franchisee;
use App\Livewire\User\Dashboard as UserDashboard;
use App\Livewire\User\LeandOp;
use App\Livewire\User\CrewTarget;
use App\Livewire\User\AETargetFile;
use App\Livewire\User\ChangePassword;
use App\Livewire\User\GTMTarget;
use App\Livewire\User\StaffCommunication;
use App\Livewire\User\RunningAVgMix;
use App\Livewire\User\PriveList;
use App\Livewire\User\StoreTarget;
use App\Livewire\User\SeasonPlan;
use App\Livewire\User\Settings;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

Route::group(
    [
        'middleware' => ['user', 'auth'],
        'prefix' => 'user',
        'as' => 'user'
    ],
    function () {

        // when calling the base url
        Route::get('/', function () {
            return redirect()->intended(RouteServiceProvider::USER);
        });

        Route::get('dashboard', UserDashboard::class);
        Route::get('leandop', LeandOp::class);
        Route::get('crewtarget', CrewTarget::class);
        Route::get('aetargetfile', AETargetFile::class);
        Route::get('gtmtarget', GTMTarget::class);
        Route::get('staffcommunication', StaffCommunication::class);
        Route::get('runningavgmix', RunningAVgMix::class);
        Route::get('privelist', PriveList::class);
        Route::get('storetarget', StoreTarget::class);
        Route::get('seasonplan', SeasonPlan::class);
        Route::get('franchisee', Franchisee::class);
        Route::get('changepwd', ChangePassword::class);
        Route::post('changepwd', ChangePassword::class);
        //Route::get('settings', Settings::class);
    }
);
