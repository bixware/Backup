<?php


use Admin\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CPU\CPUController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Brand\BrandController;
use App\Http\Controllers\Admin\WorkFlow\WorkFlowController;
use App\Http\Controllers\WorkFlowRequest\SFWorkFlowController;
use App\Http\Controllers\WorkFlowRequest\SFWorkFlowExportController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["middleware" => "guest"], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::post('login', [AuthController::class, 'login']);

Route::get('getalluser', [AdminController::class, 'getAllUser']);

//export---N
Route::post('requestlistexport', [SFWorkFlowExportController::class, 'RequestListExport']);
Route::post('approvelistexport', [SFWorkFlowExportController::class, 'ApproveListExport']);



Route::group(["middleware" => 'admin', 'prefix' => "admin"], function () {

    //Admin Dashboard
    Route::get('dashboard', [AdminController::class, 'index']);

    //Role crud
    Route::group(['namespace' => 'Admin\Role'], function () {
        Route::resource('roles', RoleController::class);
    });

    //BusinessUnit crud
    Route::group(['namespace' => 'Admin\BusinessUnit'], function () {
        Route::resource('businessunit', BusinessUnitController::class);
    });

    //Brand
    Route::group(['namespace' => 'Admin\Brand'], function () {
        Route::get('getbrand', [BrandController::class, 'getBrand']);
    });

    // //Workflow crud
    Route::group(['namespace' => 'Admin\WorkFlow'], function () {
        Route::resource('workflow', WorkFlowController::class);
        Route::resource('workflowstage', WorkFlowStageController::class);
        Route::resource('workflowstageuser', WorkFlowStageUserController::class);

        Route::post('editstageuser', 'WorkFlowStageUserController@editStageUser');

        //mailConfigurationSetup
        Route::post('getallmailcontent', 'WorkFlowStageController@getAllMailContent');
        Route::post('updatemailcontent', 'WorkFlowStageController@updateMailContent');
        Route::post('getworkflowstatus', 'WorkFlowStageController@getworkflowstatus');
    });

    //User crud 
    Route::group(['namespace' => 'User'], function () {
        Route::post('createuser', 'UserController@store');
        Route::get('getalluser', 'UserController@getAllUser');
        Route::get('viewuser/{id}', 'UserController@viewUser');
        Route::put('updateuser/{id}', 'UserController@updateUser');
        Route::delete('deleteuser/{id}', 'UserController@deleteUser');
        Route::post('resetpassword', 'UserController@ResetPassword');
        Route::post('getbusinessuser', 'UserController@getBusinessUser');
        Route::post('getalluser', 'UserController@getAllUser');
    });

    //createcpu
    Route::group(['namespace' => 'WorkFlowRequest'], function () {
        Route::post('createcpu', 'WorkFlowRequestController@createCPU');
        Route::get('getallcpu', 'WorkFlowRequestController@getAllCPU');
        Route::post('viewapproverstatus', 'WorkFlowRequestController@viewapproverstatus');

        //Report List in API
        Route::post('allreportslist', 'SFReportsController@allReportList');
        Route::post('getreportview', 'SFReportsController@getReportView');

        Route::post('workflowexport', 'SFWorkFlowController@workflowExport');
    });
    //admin password
    Route::group(['namespace' => 'Admin'], function () {
        Route::post('resetpassword', 'AdminController@ResetPassword');
        Route::post('changepassword', 'AdminController@ChangePassword');
    });
});


Route::group(["middleware" => ['user', 'cors'], 'prefix' => "user"], function () {
    Route::group(['namespace' => 'BusinessUser'], function () {
        Route::resource('businessuser', BusinessUserController::class);
    });

    //Brand
    Route::group(['namespace' => 'Admin\Brand'], function () {
        Route::get('getbrand', [BrandController::class, 'getBrand']);
    });

    Route::group(['namespace' => 'Admin\WorkFlow'], function () {
        Route::resource('workflow', WorkFlowController::class);
        Route::post('getworkflowstatus', 'WorkFlowStageController@getworkflowstatus');
    });

    Route::group(['namespace' => 'User'], function () {
        Route::post('resetpassword', 'UserController@ResetPassword');
        Route::post('changepassword', 'UserController@ChangePassword');
    });

    //CustomPriceUpload
    Route::group(['namespace' => 'WorkFlowRequest'], function () {


        Route::post('createcpu', 'WorkFlowRequestController@createCPU');
        Route::get('getallcpu', 'WorkFlowRequestController@getAllCPU');
        Route::post('getapproverlist', 'WorkFlowRequestController@getApproverList');
        Route::post('updateapprovalstatus', 'WorkFlowRequestController@updateApprovalStatus');
        Route::post('viewapproverstatus', 'WorkFlowRequestController@viewapproverstatus');
        Route::post('requestlist', 'WorkFlowRequestController@requestList');
        Route::post('getconcludelist', 'WorkFlowRequestController@getConcludeList');
        Route::get('getcategorylist', 'WorkFlowRequestController@getCategoryList');
        Route::post('gethistorylist', 'WorkFlowRequestController@getHistoryList');
        Route::post('uploadremarksfiles', 'WorkFlowRequestController@uploadRemarksFiles');
        Route::get('getdcdsdlist', 'WorkFlowRequestController@getDcDsd');

        //Report api
        Route::post('allreportslist', 'SFReportsController@allReportList');
        Route::post('getreportview', 'SFReportsController@getReportView');

        ///------------------SP FILES---------------------////

        //create cpu
        Route::post('sfcreatecpu', 'SFWorkFlowController@SFCreateCPU');

        //create mcc
        Route::post('sfcreatemcc', 'SFWorkFlowController@SFCreateMCC');

        //create rc
        Route::post('sfcreaterc', 'SFWorkFlowController@SFCreateRC');

        //create nso
        Route::post('sfcreatenso', 'SFWorkFlowController@SFCreateNSO');

        //list api
        Route::post('sfrequestlist', 'SFWorkFlowController@SFRequestList');
        Route::post('sfrequesthistory', 'SFWorkFlowController@SFRequestHisotry');
        Route::post('sfviewhistory', 'SFWorkFlowController@SFViewHisotry');
        Route::post('sfapprovelist', 'SFWorkFlowController@SFApproveList');
        Route::post('sfupdateapproval', 'SFWorkFlowController@SFUpdateApproval');
        Route::post('sfdataentryapproval', 'SFWorkFlowController@SFDataEntryApproval');
        Route::post('createrc', 'SFWorkFlowController@createrc');

        Route::post('sfconcludelist', 'SFWorkFlowController@SFConcludeList');
        Route::post('sfcompletedhistory', 'SFWorkFlowController@SFCompletedHistory');
        ///------------------SP FILES---------------------////
    });
});
