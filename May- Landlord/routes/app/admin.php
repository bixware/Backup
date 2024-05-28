<?php



use Illuminate\Support\Facades\Route;
use App\Livewire\Admin\ChangePassword;
use App\Providers\RouteServiceProvider;
use App\Livewire\Admin\Dashboard as AdminDashboard;
use App\Livewire\Admin\ManageUser;
use App\Livewire\Admin\PageAccess;

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
    Route::get('manageuser', ManageUser::class);
    Route::get('pageaccess', PageAccess::class);
    Route::get('changepwd', ChangePassword::class);
});
