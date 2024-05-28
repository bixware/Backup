<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('login', 'API\Admin\Login\LoginController@login');
Route::post('subscriber/login', 'API\Subscriber\Login\LoginController@login');

Route::post('description', 'API\DescriptionController@description');
Route::get('event', 'API\Admin\Users\UsersController@getEvent');
Route::get('customer', 'API\Admin\Users\UsersController@getCustomer');

Route::post('register', 'API\Admin\Users\UsersController@register');
Route::post('getregisteredusers', 'API\Admin\Users\UsersController@getRegisteredUsers');
Route::post('checkemail', 'API\Admin\Users\UsersController@emailChecking');
Route::post('getmenus', 'API\Admin\Dashboard\DashboardController@getMenu');

Route::group(['middleware' => ['auth:api','jwt_reflesh:api','userexist:api','admin:api']], function () {
    Route::group([ 'namespace' => 'API\Admin'],function () {
    
        Route::post('logout', 'Login\LoginController@logout');
        Route::post('refresh', 'Login\LoginController@refresh');
        Route::post('dashboard', 'Dashboard\DashboardController@dashboard');
        Route::post('updateuser/{userUID}', 'Users\UsersController@updateUser');
        Route::get('/viewuser/{userUID}', 'Users\UsersController@viewUser');
        Route::post('/approveuser/{userUID}', 'Users\UsersController@approveUser');

    });

});

Route::group(['middleware' => ['auth:api','jwt_reflesh:api','userexist:api','subscriber:api']], function () {
    Route::group(['prefix' => 'subscriber', 'namespace' => 'API\Subscriber'],function () {
        
        Route::post('logout', 'Login\LoginController@logout');
        Route::post('refresh', 'Login\LoginController@refresh');
        Route::post('dashboard', 'Dashboard\DashboardController@dashboard');
    });

});





