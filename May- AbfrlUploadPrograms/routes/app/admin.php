<?php

use App\Livewire\Admin\Dashboard as AdminDashboard;
use App\Livewire\Admin\LeandOp;
use App\Livewire\Admin\CrewTarget;
use App\Livewire\Admin\AETargetFile;
use App\Livewire\Admin\GTMTarget;
use App\Livewire\Admin\StaffCommunication;
use App\Livewire\Admin\RunningAVgMix;
use App\Livewire\Admin\PriveList;
use App\Livewire\Admin\StoreTarget;
use App\Livewire\Admin\SeasonPlan;
use App\Livewire\Admin\Settings;
use App\Livewire\Admin\ChangePassword;
use App\Livewire\Admin\Deletepage;
use App\Http\Controllers\Admin\DeletePageController;
use App\Livewire\Admin\Franchisee;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => ['admin', 'auth'],
    'prefix' => 'admin',
    'as' => 'admin'
], function () {

    // when calling the base url
    Route::get('/', function () {
        return redirect()->intended(RouteServiceProvider::ADMIN);
    });

    Route::get('dashboard', AdminDashboard::class);
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
    Route::get('settings', Settings::class);
    Route::get('changepwd', ChangePassword::class);
    Route::post('changepwd', ChangePassword::class);
    Route::get('deletepage', Deletepage::class);
});
