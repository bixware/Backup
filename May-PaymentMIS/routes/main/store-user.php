<?php

use App\Http\Controllers\StoreUser\ProcessController;
use App\Http\Controllers\StoreUser\StoreUserController;
use App\Http\Controllers\StoreUser\TrackerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreUser\MPOSProcessController;
use App\Http\Controllers\StoreUser\ReportsController;
use App\Http\Controllers\StoreUser\ApprovalProcessController;
use App\Http\Controllers\StoreUser\DirectDepositController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['auth', 'store-user'])->prefix('suser')->as('store-user.')->group(function () {

    Route::controller(StoreUserController::class)->group(function () {
        Route::get('/dashboard', 'index');
        Route::get('/welcome', 'welcome');

        Route::get('/reports', 'reports');
        Route::get('/settings', 'settings');
        Route::get('/bank-mis/export', 'exportBankMIS');
        Route::get('/sap/export/excel', 'exportSAP');
        Route::get('/mpos/export/excel', 'exportMPOS');
        // logout routes
        Route::post('/logout', 'logout');
    });

    Route::controller(ReportsController::class)->prefix('reports')->group(function () {
        Route::get('/', 'index');
        Route::get('card-tender-sales', 'SAP');
        Route::get('cash-tender-sales', 'MPOS');
        Route::get('bankmis', 'BankMIS');
        Route::get('bankstatement', 'bankStateMent');
        Route::get('recon-summary', 'allCardUpiWallet');
        Route::get('others', 'others');
    });


    Route::controller(ProcessController::class)->prefix('process')->group(function () {

        Route::get('/', 'index');
        // crete a new record
        Route::prefix('card-recon')->group(function () {
            Route::get('/', 'cardRecon');
            Route::post('card-create/{id}', 'cardApprovalUpload');
        });


        Route::prefix('upi-recon')->group(function () {
            Route::get('/', 'upiRecon');
            Route::post('upi-create/{id}', 'upiApprovalUpload');
        });

        // wallet process
        Route::prefix('wallet-recon')->group(function () {
            Route::get('/', 'walletRecon');
            Route::post('wallet-create/{id}', 'walletApprovalUpload');
        });

        // Mpos cash recon
        Route::prefix('cash-recon')->group(function () {
            Route::get('/', 'mposCashRecon');
            Route::post('create-main-mis/{id}', 'mposApprovalUpload');
        });

        Route::prefix('all-card-recon')->group(function () {
            Route::get('/', 'allCardRecon');
            Route::post('card-create/{id}', 'allCardApprovalUpload');
        });
    });




    Route::controller(TrackerController::class)->prefix('tracker')->group(function () {
        Route::get('/', 'index');
        Route::get('daywisereconciliation', 'daywiseRecon');
        // Sap
        Route::get('reconciliationsummary', 'reconciliationSummary');
        Route::get('cash-recon', 'mposCashRecon');
        Route::get('wallet-recon', 'walletRecon');
        Route::get('card-recon', 'cardReconcil');
        Route::get('upi-recon', 'upiReconcil');
        Route::get('all-card-recon', 'allCardReconNew');
        Route::get('all-card-recon-old', 'allCardRecon');
    });


    /**
     * Approval process
     */
    Route::prefix('approval-process')->group(function () {
        Route::controller(ApprovalProcessController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('/cash-recon-process', 'MposProcess');
            Route::get('/card-recon-process', 'CardProcess');
            Route::get('/upi-recon-process', 'UPIProcess');
            Route::get('/wallet-recon-process', 'WalletProcess');
            Route::get('/direct-deposit', 'DirectDeposit');
        });
    });



    /**
     * Approval process
     */
    Route::prefix('direct-deposit')->group(function () {
        Route::controller(DirectDepositController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('create', 'create');
        });
    });


    Route::controller(MPOSProcessController::class)->prefix('process')->group(function () {
        Route::post('mposcard-recon/create/{id}', 'cardReconUpload');
        Route::post('mposwallet-recon/create/{id}', 'walletReconUpload');
    });
});


Route::group(['middleware' => ['auth', 'store-user'], 'prefix' => 'suser', 'namespace' => 'App\Http\Controllers\StoreUser'], function () {
    Route::get('/changepwd', 'ProfileController@index')->name('changepwd');
    Route::post('/changepwd', 'ProfileController@changePassword')->name('changepwd');
});