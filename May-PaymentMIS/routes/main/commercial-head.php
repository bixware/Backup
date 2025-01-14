<?php

use App\Http\Controllers\CommercialHead\ApprovalProcessController;
use App\Http\Controllers\CommercialHead\BankStatementProcessController;
use App\Http\Controllers\CommercialHead\CommercialHeadController;
use App\Http\Controllers\CommercialHead\DirectDepositController;
use App\Http\Controllers\CommercialHead\ProcessController;
use App\Http\Controllers\CommercialHead\MPOSProcessController;
use App\Http\Controllers\CommercialHead\ReportsController;
use App\Http\Controllers\CommercialHead\ExceptionController;
use App\Http\Controllers\CommercialHead\StoreMasterController;
use App\Http\Controllers\CommercialHead\TrackerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommercialHead\Upload\IDFCController;



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

/** @var
 * Configuration
 */
$commertialHeadRoutesConfiguration = [
    'namespace' => 'App\Http\Controllers\CommercialHead',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "CommercialHeadController",
    "as" => 'commertial-head.',
];


$commercialHeadRepositoryConfiguration = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Repository',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "RepositoryController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesConfigurationUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "ICICIController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesTidMidUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "TidMidController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesHDFCUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "HDFCController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesConfigurationWalletUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "WALLETController",
    "as" => 'commertial-head.',
];


$commertialHeadRoutesConfigurationSBIUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "SBIController",
    "as" => 'commertial-head.',
];


$commertialHeadRoutesConfigurationSBICASH2Upload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "SBICASHMISController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesConfigurationAxisUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "AxisController",
    "as" => 'commertial-head.',
];


$commertialHeadRoutesConfigurationAmexUpload = [
    'namespace' => 'App\Http\Controllers\CommercialHead\Upload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "AMEXController",
    "as" => 'commertial-head.',
];



$mainRoutesConfig = [
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    "as" => 'commertial-head.',
];


/**
 * Admin Routes
 */
Route::group($commertialHeadRoutesConfiguration, function () {
    // Main
    Route::get('/dashboard', 'index');
    Route::get('/upload', 'upload');

    Route::get('/bank-statement-upload', 'BankStatementUpload');
    Route::get('/bankmisrepository', 'BankMisRepository');
    Route::get('/settings', 'settings');

    Route::get('/settings/storemaster', 'StoreMaster');
    Route::post('/settings/addstoremaster', 'Addstoremaster');
    Route::get('/settings/tid-mid-master', 'TidMidMaster');
    Route::post('/settings/amexmid/{id}', 'Amexmid');
    Route::post('/settings/icicimid/{id}', 'Icicimid');
    Route::post('/settings/sbimid/{id}', 'Sbimid');
    Route::post('/settings/hdfctid/{id}', 'Hdfctid');
    Route::post('/settings/addamex', 'Addamex');
    Route::post('/settings/addicici', 'Addicici');
    Route::post('/settings/addsbi', 'Addsbi');
    Route::post('/settings/addhdfc', 'Addhdfc');
    Route::post('/settings/upload-store-master', 'UploadStoreMaster');

    // logout routes
    Route::post('/logout', 'logout');
});

Route::group($commertialHeadRoutesTidMidUpload, function () {

    Route::post('/amex/upload', 'amexImport');
    Route::post('/amex/save', 'amexSave');
    Route::post('/sbi/upload', 'sbiImport');
    Route::post('/sbi/save', 'sbiSave');
    Route::post('/icici/upload', 'iciciImport');
    Route::post('/icici/save', 'iciciSave');
    Route::post('/hdfc/upload', 'hdfcImport');
    Route::post('/hdfc/save', 'hdfcSave');
});


Route::group($commercialHeadRepositoryConfiguration, function () {
    Route::get('/repository', 'index');
    Route::post('/repository/upload', 'repositoryImport');
});


Route::group($commertialHeadRoutesConfigurationUpload, function () {
    Route::post('/upload/cash/icici', 'ICICIUpload');
    Route::post('/upload/card/icici', 'ICICIcardUpload');
});



Route::group($commertialHeadRoutesHDFCUpload, function () {
    Route::post('/upload/add-hdfc-upidata', 'importHdfcUPIData');
    Route::post('/upload/add-hdfc-carddata', 'importHdfcCardData');
    Route::post('/upload/add-hdfc-cashdata', 'importHdfcCashData');
});

Route::group($commertialHeadRoutesConfigurationWalletUpload, function () {
    Route::post('/upload/phonepay', 'PhonePayData');
    Route::post('/upload/paytm', 'importPayTMData');
});

Route::group($commertialHeadRoutesConfigurationSBIUpload, function () {
    Route::post('/upload/add-sbi-cash', 'importSBICashData');
    Route::post('/upload/add-sbi-card', 'importSBICardData');
    Route::post('/upload/add-sbi-box', 'importSBIAgencyData');
    Route::post('/upload/add-sbi-cashmis', 'importSBICashMIS2Data');
});

Route::group($commertialHeadRoutesConfigurationSBICASH2Upload, function () {

    Route::post('/upload/add-sbi-cashmis', 'importSBICashMIS2Data');
});


Route::group($commertialHeadRoutesConfigurationAxisUpload, function () {
    Route::post('/upload/add-axis-cash', 'importAxisCashData');
});


Route::group($commertialHeadRoutesConfigurationAmexUpload, function () {
    Route::post('/upload/amexdata', 'AmexData');
});


Route::group($commertialHeadRoutesConfigurationAmexUpload, function () {
    Route::post('/upload/amexdata', 'AmexData');
});

/**
 * IDFC Main Controller
 */
Route::group($mainRoutesConfig, function () {
    Route::post('/upload/cash/idfc', [IDFCController::class, 'IDFCUpload']);
});


$commertialHeadRoutesConfigurationBankstatementUploadAXIS = [
    'namespace' => 'App\Http\Controllers\CommercialHead\BankStatementUpload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "AxisController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesConfigurationBankstatementUploadHDFC = [
    'namespace' => 'App\Http\Controllers\CommercialHead\BankStatementUpload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "HDFCController",
    "as" => 'commertial-head.',
];
$commertialHeadRoutesConfigurationBankstatementUploadSBI = [
    'namespace' => 'App\Http\Controllers\CommercialHead\BankStatementUpload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "SBIController",
    "as" => 'commertial-head.',
];

$commertialHeadRoutesConfigurationBankstatementUploadIDFC = [
    'namespace' => 'App\Http\Controllers\CommercialHead\BankStatementUpload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "IDFCController",
    "as" => 'commertial-head.',
];


$commertialHeadRoutesConfigurationBankstatementUploadICICI = [
    'namespace' => 'App\Http\Controllers\CommercialHead\BankStatementUpload',
    'middleware' => ['auth', 'commertial-head'],
    'prefix' => 'chead/',
    'controller' => "ICICIController",
    "as" => 'commertial-head.',
];


Route::group($commertialHeadRoutesConfigurationBankstatementUploadHDFC, function () {
    Route::post('/upload/bank-statement-upload/hdfc', 'bankStatementHDFCUpload');
});

Route::group($commertialHeadRoutesConfigurationBankstatementUploadICICI, function () {
    Route::post('/upload/bank-statement-upload/icici', 'bankStatementICICIUpload');
});

Route::group($commertialHeadRoutesConfigurationBankstatementUploadIDFC, function () {
    Route::post('/upload/bank-statement-upload/idfc', 'bankStatementIDFCUpload');
});


Route::group($commertialHeadRoutesConfigurationBankstatementUploadSBI, function () {
    Route::post('/upload/bank-statement-upload/sbi', 'bankStatementSBIUpload');
});


Route::group($commertialHeadRoutesConfigurationBankstatementUploadAXIS, function () {
    Route::post('/upload/bank-statement-upload/axis', 'bankStatementAxisUpload');
});

// Restructured
Route::middleware(['commertial-head', 'auth'])->prefix('chead')->as('commertial-head.')->group(function () {

    Route::get('/welcome', [CommercialHeadController::class, 'welcome']);

    // Process Page
    Route::prefix('process')->group(function () {
        Route::controller(ProcessController::class)->group(function () {

            // index route
            Route::get('/', 'index');


            // upi reconciliation
            Route::prefix('cash-recon')->group(function () {
                Route::get('/', 'MPOSRecon');
                Route::post('update-tender-approval-status/{id}', 'MPOSTenderBankReconApproval');
                Route::post('update-bank-approval-status/{id}', 'MPOSBankMisReconApproval');
                Route::post('update-main-approval-status/{id}', 'MPOSMainReconApproval');
            });

            // upi reconciliation
            Route::prefix('card-recon')->group(function () {
                Route::get('/', 'CardRecon');
                Route::post('update-card-approval-status/{id}', 'cardReconApproval');
            });

            Route::prefix('upi-recon')->group(function () {
                Route::get('/', 'UPIRecon');
                Route::post('update-upi-approval-status/{id}', 'upiReconApproval');
            });

            Route::prefix('wallet-recon')->group(function () {
                Route::get('/', 'WalletRecon');
                Route::post('update-wallet-approval-status/{id}', 'walletReconApproval');
            });
        });

        // Specifically for bank statements
        Route::controller(BankStatementProcessController::class)->group(function () {
            // upi reconciliation
            Route::prefix('bank-statement-recon')->group(function () {
                Route::get('/', 'index');
                Route::post('cash/update-bank-approval-status/{id}', 'cashBankReconApproval');
                Route::post('card/update-bank-approval-status/{id}', 'cardBankReconApproval');
                Route::post('wallet/update-bank-approval-status/{id}', 'walletBankReconApproval');
                Route::post('upi/update-bank-approval-status/{id}', 'UPIBankReconApproval');
            });
        });
    });


    /**
     * Reports
     */
    Route::prefix('reports')->group(function () {
        Route::controller(ReportsController::class)->group(function () {
            // index route
            Route::get('/', 'index');
            Route::get('mpos', 'mpos');
            Route::get('sap', 'sap');
            Route::get('bankmis', 'bankmis');
            Route::get('bankstatement', 'bankStatement');
            Route::get('recon-summary', 'reportsSummary');
            Route::get('/bank-statement-reconciliation', 'BankStatementRecon');
            Route::get('others', 'others');
            Route::get('un-allocated', 'unallocated');
        });
    });

    /**
     * Exception
     */
    Route::prefix('exception')->group(function () {
        Route::controller(ExceptionController::class)->group(function () {
            // index route
            Route::get('/', 'index');
            Route::get('cash', 'cash');
            Route::get('card', 'card');
            Route::get('upi', 'upi');
            Route::get('wallet', 'wallet');
        });
    });



    /**
     * Reports
     */
    Route::prefix('tracker')->group(function () {
        Route::controller(TrackerController::class)->group(function () {
            // index route
            Route::get('/', 'index');
            Route::get('/cash-reconcil', 'MposRecon');
            Route::get('/card-reconil', 'CardRecon');
            Route::get('/upi-reconil', 'UPIRecon');
            Route::get('/wallet-reconil', 'WalletRecon');
            Route::get('/all-card-recon', 'AllCardReconNew');
            Route::get('/all-card-recon_old', 'AllCardRecon');
            Route::get('reconciliationsummary', 'reconciliationSummary');

            Route::get('/cash-recon-process', 'MposProcess');
            Route::get('/card-recon-process', 'CardProcess');
            Route::get('/wallet-recon-process', 'WalletProcess');
            Route::get('/bank-statement-process', 'BankStatementProcess');
        });
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
            Route::get('/bank-statement-process', 'BankStatementProcess');
            Route::get('/direct-deposit', 'DirectDeposit');
        });
    });

    /**
     * Approval process
     */
    Route::prefix('direct-deposit')->group(function () {
        Route::controller(DirectDepositController::class)->group(function () {
            Route::get('/', 'index');
            Route::get('/approve', 'approve');
        });
    });


    /**
     * Approval process
     */
    // Route::prefix('settings')->group(function () {
    //     Route::controller(StoreMasterController::class)->group(function () {
    //         Route::post('/upload-store-master', 'UploadStoreMaster');
    //     });
    // });


    // mpos approval
    Route::controller(MPOSProcessController::class)->prefix('process')->group(function () {
        Route::post('mpos-recon/update-card-approval-status/{id}', 'MPOSCardReconApproval');
        Route::post('mpos-recon/update-wallet-approval-status/{id}', 'MPOSWalletReconApproval');
    });
});


Route::group(['middleware' => ['auth', 'commertial-head'], 'prefix' => 'chead', 'namespace' => 'App\Http\Controllers\CommercialHead'], function () {
    Route::get('/changepwd', 'ProfileController@index')->name('changepwd');
    Route::post('/changepwd', 'ProfileController@changePassword')->name('changepwd');
});