<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\API\UpdateApis\PickupPTController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/allbankmisinsert', [ApiController::class, 'AllBankMisInsert']);
Route::post('/insertsalescashreco', [ApiController::class, 'insertSalesCashReco']);

//27/07/23
Route::post('/allbankmisinsertcard', [ApiController::class, 'AllBankMisInsertCard']);
Route::post('/insertsalescardreco', [ApiController::class, 'insertSalesCardReco']);

//Wallet
Route::post('/allwallertinsert', [ApiController::class, 'allWalletInsert']);
Route::post('/insertsaleswalletreco', [ApiController::class, 'insertSalesWalletReco']);
Route::post('/insertcashbankstementreco', [ApiController::class, 'insertCashBankStementReco']);
Route::post('/insertcardbankstementreco', [ApiController::class, 'insertCardBankStementReco']);

//25-09-2023
Route::post('/mposcashsalesreco', [ApiController::class, 'mposCashSalesReco']);
Route::post('/mposcardsalesreco', [ApiController::class, 'mposCardSalesReco']);
Route::post('/mposwalletsalesreco', [ApiController::class, 'mposSalesWalletReco']);

//26-09-2023
Route::post('truncatesalesrecotables', [ApiController::class, 'TruncateSalesRecoTables']);
Route::post('truncatebankstatementtables', [ApiController::class, 'TruncateBankStatementTables']);
Route::post('truncatempossalestables', [ApiController::class, 'TruncateMposSalesTables']);

Route::post('truncateallbanktables', [ApiController::class, 'TruncateAllBankTables']);
Route::post('truncateapprovaltables', [ApiController::class, 'TruncateApprovalTables']);

//27-09-2023

Route::post('truncateallbanktables', [ApiController::class, 'TruncateAllBankTables']);

Route::post('truncateapprovaltables', [ApiController::class, 'TruncateApprovalTables']);

/**
 * UpdateMain Dataset 12-10-2023
 */
Route::post('/update/pickup-code', PickupPTController::class);

// 13-10-2023
Route::post('/selectcash', [ApiController::class, 'SelectCash']);
Route::post('/selectwallet', [ApiController::class, 'SelectWallet']);
Route::post('/selectcard', [ApiController::class, 'SelectCard']);


Route::post('/mpostendercashsalesreco', [ApiController::class, 'mposTenderCashSalesReco']);
Route::post('/ad70ee390fed7465f65c472f79681293', \App\Http\Controllers\API\UpdateApis\TIDMIDController::class);
Route::post('/YXBpX3VwZGF0ZV9zYmlfYWdlbmN5', \App\Http\Controllers\API\UpdateApis\SBIUpdateController::class);
Route::post('/getfilecount', \App\Http\Controllers\API\SelectMISApi::class);
//18-05-2024 api
Route::post('/salestableRetekcode', [\App\Http\Controllers\API\UpdateApis\UpdateRetekCodeController::class, 'SalestableRetekcode']);
Route::post('/bankdropStatus', [\App\Http\Controllers\API\UpdateApis\UpdateRetekCodeController::class, 'BankdropStatus']);
Route::post('/brandmissingremarks', [\App\Http\Controllers\API\UpdateApis\UpdateRetekCodeController::class, 'BrandMissingRemarks']);
Route::post('/updateRetekcode', [\App\Http\Controllers\API\UpdateApis\UpdateRetekCodeController::class, 'UpdateRetekcode']);
