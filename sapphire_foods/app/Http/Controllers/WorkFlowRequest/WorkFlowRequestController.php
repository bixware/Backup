<?php

namespace App\Http\Controllers\WorkFlowRequest;

use Log;
use PDO;
use Auth;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\WorkFlow;
use App\Models\DcdsdDetails;
use App\Models\WorkFlowFile;
use Illuminate\Http\Request;
use App\Models\WorkFlowFiles;
use App\Models\WorkFlowStage;
use App\Models\CostPriceUpdate;
use App\Models\FileUploadDetail;
use App\Models\WorkFlowStageUser;
use Illuminate\Support\Facades\DB;
use App\Models\SystemConfiguration;
use App\Models\WorkFlowRemarksFile;
use App\Http\Controllers\Controller;
use App\Http\Requests\CPUValidation;
use App\Models\WorkFlowRequestEntry;
use App\Models\WorkFlowStatusRemarks;

class WorkFlowRequestController extends Controller
{
    public function createCPU(CPUValidation $request)
    {
        try {
            if (request()->brandUID == 1) {
                $systicket = SystemConfiguration::where('configName', 'KFC')->first();
                $ticketUID = $systicket->configValue;
            } else {
                $systicket = SystemConfiguration::where('configName', 'PIZZA HUT')->first();
                $ticketUID = $systicket->configValue;
            }

            // dd($request->workFlowUID, Auth::id());
            $user_id = Auth::id();
            //Check if the user is the initiator.
            $initiator_check = WorkFlowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['stageNo', '=', 1], ['userUID', '=', $user_id]])->first();

            if (!$initiator_check) {
                return response()->json(['message' => 'You are not an initiator'], 500);
            }

            $brand = Brand::where('brandUID', request()->brandUID)->first();

            $workflow = WorkFlow::where('workFlowUID', request()->workFlowUID,)->first();
            // workFlowUID
            $workflowstage = WorkFlowStage::where('workFlowStageUID', request()->workFlowStageUID,)->first();
            $dcdsd = DcdsdDetails::where('dcdsdUID', $request->dcdsdUID)->first();

            // Start transaction
            \DB::beginTransaction();

            $parsedFromDate =  date('Y-m-d', strtotime($request->fromDate));
            $parsedToDate =  date('Y-m-d', strtotime($request->toDate));

            //get next stage emailID
            $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 2], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
            if (!$next_workflow_stage_user) {
                $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 3], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
            }
            if ($request->workFlowUID == 1) {
                $approvalStatus = 1;
            } else {
                $approvalStatus = 41;
            }
            $workFlowRequest = WorkFlowRequestEntry::create([
                'requestNo' => $ticketUID,
                'brandUID' => request()->brandUID,
                'brand' => $brand->brandName,
                'categoryUID' => request()->categoryUID,
                'dcdsdUID' => $dcdsd->dcdsdUID ?? NULL,
                'dcdsdName' => $dcdsd->Name ?? NULL,
                'category' => request()->category,
                'vendorCode' => request()->vendorCode,
                'vendorDescription' => request()->vendorDescription,
                'materialCode' => request()->materialCode,
                'description' => request()->description,
                'fromDate' => $parsedFromDate,
                'toDate' => $parsedToDate,
                'workFlowUID' => request()->workFlowUID,
                'workFlowName' => $workflow->workFlowName,
                'workFlowStageUID' => request()->workFlowStageUID,
                'workFlowStageName' => $workflowstage->stageName,
                'currentStageUserID' => Auth::id(),
                'nextStageUserID' => $next_workflow_stage_user->userUID,
                'createdBy' => Auth::id(),
                'isActive' => 1,
                'approvalStatus' => $approvalStatus,
                'remarks' => $request->remarks
            ]);


            if ($request->hasFile('multipleUpload')) {
                $files = $request->file('multipleUpload');

                foreach ($files as $imgresponse) {
                    // Generate a unique file name
                    $input_file_name =  $imgresponse->getClientOriginalName();
                    $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                    $fileName = $file . "_" . time() . '.' .  $imgresponse->extension();

                    // Store the file in the specified disk (e.g., public disk)
                    // $imgresponse->move(storage_path() . '/testuploads', $fileName);
                    $imgresponse->move(storage_path('app/public/uploads/tickets'), $fileName);

                    WorkFlowFile::create([
                        'workFlowRequestUID' => $workFlowRequest->workFlowRequestUID,
                        'requestFileName' => $fileName
                    ]);
                }


                // Commit the transaction
                \DB::commit();


                $workFlowRequest->updloadFile = WorkFlowFile::where('workFlowRequestUID', $workFlowRequest->workFlowRequestUID)->get();

                $workFlowRequest->remarksFile = WorkFlowRemarksFile::where('workFlowRequestUID', $workFlowRequest->workFlowRequestUID)->get();

                if ($workFlowRequest) {
                    $current_date_time = date('Y-m-d H:i:s');



                    $approver_one_mail = $next_workflow_stage_user->userEmail;
                    $approver_one_name = $next_workflow_stage_user->userName;

                    ///Status and Remarks Upload in the tbl_xWorkFlowStatusRemarks
                    $workflowstatus = WorkFlowStatusRemarks::create([
                        'workFlowRequestUID' => $workFlowRequest->workFlowRequestUID,
                        'workFlowStageUID' => $workflowstage->workFlowStageUID,
                        'workFlowStageName' => $workflowstage->stageName,
                        'status' => 1,
                        'statusDescription' => 'Initiated',
                        'remarks' => 'Initiated',
                        'isActive' => 1,
                        'createdBy' => Auth::id(),
                        'createdDate' => $current_date_time
                    ]);

                    // dd($initiator_check->userName, $approver_one_mail, $approver_one_name);

                    // $approver_one_mail = 'thiraviyam@bixware.com';
                    $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:APPROVER_NAME,:STAGE_NO,:TICKETUID', [
                        'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                        'INITIATOR_NAME'           => $initiator_check->userName,
                        'APPROVER_EMAIL'           => $approver_one_mail,
                        'APPROVER_NAME' => $approver_one_name,
                        'STAGE_NO' => null,
                        'TICKETUID' => $ticketUID
                    ]));


                    ///Ticket update query
                    if (request()->brandUID == 1) {
                        $numericPart = (int)substr($ticketUID, 3); // Assuming the prefix is 'KFC' as in your stored procedure
                        $newNumericPart = $numericPart + 1;
                        $newTicketUID = 'KFC' . str_pad($newNumericPart, 6, '0', STR_PAD_LEFT); // Format the new ticketUID
                        $update = \DB::table('tbl_mSystemConfiguration')
                            ->where('sysConfigUID', $systicket->sysConfigUID)
                            ->update(['configValue' => $newTicketUID]);
                    } else {
                        $numericPart = (int)substr($ticketUID, 2); // Assuming the prefix is 'KFC' as in your stored procedure
                        $newNumericPart = $numericPart + 1;
                        $newTicketUID = 'PH' . str_pad($newNumericPart, 6, '0', STR_PAD_LEFT); // Format the new ticketUID
                        $update = \DB::table('tbl_mSystemConfiguration')
                            ->where('sysConfigUID', $systicket->sysConfigUID)
                            ->update(['configValue' => $newTicketUID]);
                    }
                }
            }
            return response()->json($workFlowRequest);
        } catch (\Exception $e) {
            // Rollback the transaction on error
            \DB::rollBack();

            // Log the error for debugging
            \Log::error('Error occurred while saving cost price update: ' . $e->getMessage());

            // Return an error response
            return response()->json(['error' => 'An error occurred while saving cost price update' . $e->getMessage()], 500);
        }
    }

    public function getAllCPU(Request $request)
    {
        $costpriceupdates = WorkFlowRequestEntry::with('uploadFile')->whereNotIn('approvalStatus', [10, 11])
            ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();
        return response()->json($costpriceupdates);
    }

    public function getCategoryList()
    {

        $categories = Category::where('isActive', 1)->get();
        return response()->json($categories);
    }

    public function getDcDsd()
    {

        $dcdsd = DcdsdDetails::where('isActive', 1)->get();
        return response()->json($dcdsd);
    }
    public function getConcludeList(Request $request)
    {
        $pdo = DB::connection()->getPdo();

        $stmt = $pdo->prepare(
            'EXEC CPU_CONCLUDE_LIST ' . $request->userUID
        );
        // dd($stmt);
        $stmt->execute();
        $results = [];

        do {
            // $resultSet = [];
            $resultSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($resultSet)) {
                $results = array_merge($results, $resultSet);
            }
        } while ($stmt->nextRowset());

        return response()->json($results);

        // $costpriceupdates = WorkFlowRequestEntry::with('uploadFile')->where('approvalStatus', 10)
        //     ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();
        // return response()->json($costpriceupdates);
    }

    public function getApproverList(Request $request)
    {
        $pdo = DB::connection()->getPdo();

        $stmt1 = $pdo->prepare(
            'EXEC CPU_APPROVAL_LIST ' . $request->userUID
        );
        // dd($stmt);
        $stmt1->execute();
        $results = [];

        $stmt2 = $pdo->prepare(
            'EXEC MCC_APPROVAL_LIST ' . $request->userUID
        );
        // dd($stmt);
        $stmt2->execute();
        $results1 = [];
        $results2 = [];

        // dd($stmt1, $stmt2);
        do {
            // $resultSet = [];
            $resultSet = $stmt1->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($resultSet)) {
                $results1 = array_merge($results, $resultSet);
            }
        } while ($stmt1->nextRowset());

        do {
            // $resultSet = [];
            $resultSet = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($resultSet)) {
                $results2 = array_merge($results, $resultSet);
            }
        } while ($stmt2->nextRowset());

        $results = array_merge($results1, $results2);


        return response()->json($results);
        // $approver_list = collect(\DB::select('GET_APPROVAL_USER :PROC_TYPE,:USER_UID', [
        //     'PROC_TYPE'  => 'APPROVER_LIST',
        //     'USER_UID'        => Auth::id()
        // ]));
        // return response()->json($approver_list);
        // if ($approver_list) {
        //     // $last_stage = Work
        //     foreach ($approver_list as $approver) {
        //         // dd(isset($approver['stageNo']));
        //         // dd($approver['stageNo']);
        //         // echo ($approver['stageNo']);
        //         // exit;
        //         if (isset($approver['stageNo']) && $approver['stageNo'] == 7) {
        //             //scm1  
        //             dd("hi");
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 1], ['approvalStatus', '=', 1]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         }
        //         // $approver_list = collect(\DB::select('GET_APPROVAL_LIST :PROC_TYPE,:WORKFLOWUID,:WORKFLOWSTAGEUID', [
        //         //     'PROC_TYPE'        => 'ApprovalList',
        //         //     'WORKFLOWUID'      => $request->workFlowUID,
        //         //     'WORKFLOWSTAGEUID' => $request->workFlowStageUID


        //         // ]));
        //         // // dd($mailSendFunction);
        //         // return response()->json($approver_list);
        //         if ($approver_list->stageNo == 2) {
        //             //scm1
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 1], ['approvalStatus', '=', 1]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         } else if ($approver_list->stageNo == 3) {
        //             //planning
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 2], ['approvalStatus', '=', 2]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         } else if ($approver_list->stageNo == 4) {
        //             //scm2
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 3], ['approvalStatus', '=', 4]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         } else if ($approver_list->stageNo == 5) {
        //             //scm3
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 4], ['approvalStatus', '=', 6]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         } else if ($approver_list->stageNo == 6) {
        //             //finance
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 5], ['approvalStatus', '=', 8]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         } else {
        //             $approve_list = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '=', 6], ['approvalStatus', '=', 10]])
        //                 ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //             return response()->json($approve_list);
        //         }
        //     }
        // } else {
        //     return response()->json(['message' => 'No record Found'], 200);
        // }
    }

    public function uploadRemarksFiles(Request $request)
    {
        //remarks file upload

        if ($request->hasFile('remarksFile')) {
            $files = $request->file('remarksFile');

            foreach ($files as $imgresponse) {

                // Generate a unique file name
                $input_file_name =  $imgresponse->getClientOriginalName();
                $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                $fileName = $file . "_" . time() . '.' .  $imgresponse->getClientOriginalExtension();

                // Store the file in the specified disk (e.g., public disk)
                // $imgresponse->move(storage_path() . '/testuploads', $fileName);
                $imgresponse->move(storage_path() . '/app/public/uploads/remarks/', $fileName);

                WorkFlowRemarksFile::create([
                    'userUID' => $request->userUID,
                    'workFlowRequestUID' => $request->workFlowRequestUID,
                    'workFlowUID' => $request->workFlowUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'remarksFileName' => $fileName
                ]);
            }
            return response()->json(["message" => "Success"]);
        }
    }

    public function updateApprovalStatus(Request $request)
    {

        $current_date_time = date('Y-m-d H:i:s');
        //Check the workflowstageUser 
        $approver_list = WorkFlowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['workFlowStageUID', '=', $request->workFlowStageUID], ['userUID', $request->userUID]])->first();
        // dd($approver_list);
        if ($approver_list) {
            if ($approver_list->stageNo == 2) {

                $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 3], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                if (!$next_workflow_stage_user) {
                    $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 4], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                }
                $approver_mail = $next_workflow_stage_user->userEmail;
                $approver_name = $next_workflow_stage_user->userName;

                $updateworkflow = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->update([
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'approvalStatus' => $request->approvalStatus,
                    'currentStageUserID' => Auth::id(),
                    'nextStageUserID' => $next_workflow_stage_user->userUID,
                ]);

                if ($updateworkflow) {
                    $statusDescription = $request->approvalStatus == 2 ? 'stage 1 approved' : 'stage 1 rejected';
                    $wfstatusremarks = WorkFlowStatusRemarks::create([
                        'workFlowRequestUID' =>  $request->workFlowRequestUID,
                        'workFlowStageUID' => $request->workFlowStageUID,
                        'workFlowStageName' => $approver_list->stageName,
                        'status' => $request->approvalStatus,
                        'statusDescription' => $statusDescription,
                        'remarks' => $request->remarks ?? null,
                        'isActive' => 1,
                        'createdBy' => Auth::id(),
                        'createdDate' => $current_date_time
                    ]);


                    $workflowstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->first();

                    if ($request->approvalStatus == 2) {
                        $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:APPROVER_NAME,:STAGE_NO,:TICKETUID', [
                            'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                            'INITIATOR_NAME'           => $approver_list->userName,
                            'APPROVER_EMAIL'           => $approver_mail,
                            'APPROVER_NAME' => $approver_name,
                            'STAGE_NO' => $approver_list->stageNo,
                            'TICKETUID' => $workflowstageuser->requestNo
                        ]));
                    } else {

                        collect(\DB::statement('REJECT_MAIL_SEND :stage,:ticketId,:rejectorName', [
                            'stage'           => $approver_list->stageNo,
                            'ticketId' => $workflowstageuser->requestNo,
                            'rejectorName'   => $approver_list->userName
                        ]));
                    }

                    return response()->json([
                        "message" => "Success"
                    ], 200);
                }
            } else if ($approver_list->stageNo == 3) {

                $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 4], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                if (!$next_workflow_stage_user) {
                    $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 5], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                }
                $approver_mail = $next_workflow_stage_user->userEmail;
                $approver_name = $next_workflow_stage_user->userName;

                $updateworkflow = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->update([
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'approvalStatus' => $request->approvalStatus,
                    'currentStageUserID' => Auth::id(),
                    'nextStageUserID' => $next_workflow_stage_user->userUID,
                ]);

                $statusDescription = $request->approvalStatus == 4 ? 'stage 2 approved' : 'stage 2 rejected';
                $wfstatusremarks = WorkFlowStatusRemarks::create([
                    'workFlowRequestUID' =>  $request->workFlowRequestUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'status' => $request->approvalStatus,
                    'statusDescription' => $statusDescription,
                    'remarks' => $request->remarks ?? null,
                    'isActive' => 1,
                    'createdBy' => Auth::id(),
                    'createdDate' => $current_date_time
                ]);


                $workflowstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->first();


                ///Mail send for next stage approver
                if ($request->approvalStatus == 4) {
                    $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:APPROVER_NAME,:STAGE_NO,:TICKETUID', [
                        'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                        'INITIATOR_NAME'           => $approver_list->userName,
                        'APPROVER_EMAIL'           => $approver_mail,
                        'APPROVER_NAME' => $approver_name,
                        'STAGE_NO' => $approver_list->stageNo,
                        'TICKETUID' => $workflowstageuser->requestNo
                    ]));
                } else {
                    // dd($approver_list->stageNo, $workflowstageuser->requestNo, $approver_list->userName);
                    collect(\DB::statement('REJECT_MAIL_SEND :stage,:ticketId,:rejectorName', [
                        'stage'           => $approver_list->stageNo,
                        'ticketId' => $workflowstageuser->requestNo,
                        'rejectorName'   => $approver_list->userName
                    ]));
                }

                return response()->json([
                    "message" => "Success"
                ], 200);
            } else if ($approver_list->stageNo == 4) {
                //scm3 
                $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 5], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                if (!$next_workflow_stage_user) {
                    $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 6], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                }
                $approver_mail = $next_workflow_stage_user->userEmail;
                $approver_name = $next_workflow_stage_user->userName;

                $updateworkflow = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->update([
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'approvalStatus' => $request->approvalStatus,
                    'currentStageUserID' => Auth::id(),
                    'nextStageUserID' => $next_workflow_stage_user->userUID,
                ]);


                $statusDescription = $request->approvalStatus == 6 ? 'stage 3 approved' : 'stage 3 rejected';

                $wfstatusremarks = WorkFlowStatusRemarks::create([
                    'workFlowRequestUID' =>  $request->workFlowRequestUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'status' => $request->approvalStatus,
                    'statusDescription' => $statusDescription,
                    'remarks' => $request->remarks ?? null,
                    'isActive' => 1,
                    'createdBy' => Auth::id(),
                    'createdDate' => $current_date_time
                ]);


                $workflowstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->first();


                ///Mail send for next stage approver
                if ($request->approvalStatus == 6) {
                    $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:APPROVER_NAME,:STAGE_NO,:TICKETUID', [
                        'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                        'INITIATOR_NAME'           => $approver_list->userName,
                        'APPROVER_EMAIL'           => $approver_mail,
                        'APPROVER_NAME' => $approver_name,
                        'STAGE_NO' => $approver_list->stageNo,
                        'TICKETUID' => $workflowstageuser->requestNo
                    ]));
                } else {

                    collect(\DB::statement('REJECT_MAIL_SEND :stage,:ticketId,:rejectorName', [
                        'stage'           => $approver_list->stageNo,
                        'ticketId' => $workflowstageuser->requestNo,
                        'rejectorName'   => $approver_list->userName
                    ]));
                }

                return response()->json([
                    "message" => "Success"
                ], 200);
            } else if ($approver_list->stageNo == 5) {

                if ($request->workFlowUID == 1) {
                    $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 6], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                    if (!$next_workflow_stage_user) {
                        $next_workflow_stage_user = WorkFlowStageUser::where([['stageNo', 7], ['workFlowUID', '=', $request->workFlowUID], ['isActive', 1]])->first();
                    }
                    $approver_mail = $next_workflow_stage_user->userEmail;
                    $approver_name = $next_workflow_stage_user->userName;
                } else {
                    //material code creation
                    $next_workflow_stage_user = WorkFlowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['stageNo', '=', 1]])->first();

                    $approver_mail = $next_workflow_stage_user->userEmail;
                    $approver_name = $next_workflow_stage_user->userName;
                }


                //finance1
                $updateworkflow = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->update([
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'approvalStatus' => $request->approvalStatus,
                    'currentStageUserID' => Auth::id(),
                    'nextStageUserID' => $next_workflow_stage_user->userUID,
                ]);

                $statusDescription = $request->approvalStatus == 6 ? 'stage 4 approved' : 'stage 4 rejected';

                $wfstatusremarks = WorkFlowStatusRemarks::create([
                    'workFlowRequestUID' =>  $request->workFlowRequestUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'status' => $request->approvalStatus,
                    'statusDescription' => $statusDescription,
                    'remarks' => $request->remarks ?? null,
                    'isActive' => 1,
                    'createdBy' => Auth::id(),
                    'createdDate' => $current_date_time
                ]);

                $workflowstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->first();


                ///Mail send for next stage approver
                if ($request->approvalStatus == 8) {
                    $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:APPROVER_NAME,:STAGE_NO,:TICKETUID', [
                        'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                        'INITIATOR_NAME'           => $approver_list->userName,
                        'APPROVER_EMAIL'           => $approver_mail,
                        'APPROVER_NAME' => $approver_name,
                        'STAGE_NO' => $approver_list->stageNo,
                        'TICKETUID' => $workflowstageuser->requestNo
                    ]));
                } else {
                    $mailSendFunction = collect(\DB::statement('REJECT_MAIL_SEND :stage,:ticketId,:rejectorName', [
                        'stage'           => $approver_list->stageNo,
                        'ticketId' => $workflowstageuser->requestNo,
                        'rejectorName'   => $approver_list->userName
                    ]));
                }
                return response()->json([
                    "message" => "Success"
                ], 200);
            } else if ($approver_list->stageNo == 6) {

                $next_workflow_stage_user = WorkFlowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['stageNo', '=', 1]])->first();

                $approver_mail = $next_workflow_stage_user->userEmail;
                $approver_name = $next_workflow_stage_user->userName;

                $updateworkflow = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->update([
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'approvalStatus' => $request->approvalStatus,
                    'currentStageUserID' => Auth::id(),
                    'nextStageUserID' => $next_workflow_stage_user->userUID,
                ]);

                $wfstatusremarks = WorkFlowStatusRemarks::create([
                    'workFlowRequestUID' =>  $request->workFlowRequestUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'status' => $request->approvalStatus,
                    'statusDescription' => "Date Entry Done",
                    'remarks' => $request->remarks ?? null,
                    'isActive' => 1,
                    'createdBy' => Auth::id(),
                    'createdDate' => $current_date_time
                ]);



                $workflowstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->first();


                ///Mail send for next stage approver
                $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:APPROVER_NAME,:STAGE_NO,:TICKETUID', [
                    'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                    'INITIATOR_NAME'           => $approver_list->userName,
                    'APPROVER_EMAIL'           => $approver_mail,
                    'APPROVER_NAME' => $approver_name,
                    'STAGE_NO' => $approver_list->stageNo,
                    'TICKETUID' => $workflowstageuser->requestNo
                ]));

                return response()->json($mailSendFunction);
            } else {
                $updateworkflow = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->update([
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'approvalStatus' => $request->approvalStatus
                ]);

                $wfstatusremarks = WorkFlowStatusRemarks::create([
                    'workFlowRequestUID' =>  $request->workFlowRequestUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'workFlowStageName' => $approver_list->stageName,
                    'status' => $request->approvalStatus,
                    'statusDescription' => "Completed",
                    'remarks' => $request->remarks ?? null,
                    'isActive' => 1,
                    'createdBy' => Auth::id(),
                    'createdDate' => $current_date_time
                ]);
                // $workflow_stage_user = WorkFlowStageUser::where('stageNo', 1)->first();
                // $approver_mail = $workflow_stage_user->userEmail;

                // $approver_mail = 'nithya@bixware.com';
                // $workflowstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->first();


                // ///Mail send for next stage approver
                // $mailSendFunction = collect(\DB::select('APPROVER_MAIL_SEND :PROC_TYPE,:INITIATOR_NAME,:APPROVER_EMAIL,:TICKETUID', [
                //     'PROC_TYPE'        => 'APPROVER_ONE_MAIL_SEND',
                //     'INITIATOR_NAME'           => $approver_list->userEmail,
                //     'APPROVER_EMAIL'           => $approver_mail,
                //     'TICKETUID' => $workflowstageuser->requestNo
                // ]));

                return response()->json($wfstatusremarks);
            }
        } else {
            return response()->json(['message' => 'No record Found'], 200);
        }
    }


    public function viewapproverstatus(Request $request)
    {
        $wfstageuser = WorkFlowRequestEntry::where('workFlowRequestUID', $request->workFlowRequestUID)->with(['uploadFile', 'noOfStage'])
            ->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate', ['dd-MM-yyyy', 'dd-MM-yyyy'])->first();
        return response()->json($wfstageuser);
    }

    public function requestList(Request $request)
    {
        return DB::select('MCC_REQUEST_LIST :USER_UID', [
            'USER_UID'        => $request->userUID
        ]);
        // dd("hii");
        // $pdo = DB::connection()->getPdo();

        // $stmt = $pdo->prepare(
        //     'EXEC CPU_REQUEST_LIST ' . $request->userUID
        // );


        // $stmt->execute();
        // // dd($stmt);
        // $results = [];

        // do {
        //     // $resultSet = [];
        //     $resultSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //     if (!empty($resultSet)) {
        //         $results = array_merge($results, $resultSet);
        //     }
        // } while ($stmt->nextRowset());

        // return response()->json($results);

        // dd($approver_list);
        // return response()->json($approver_list);

        //Check the workflowstageUser 
        // $requestlist = WorkFlowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['workFlowStageUID', '=', $request->workFlowStageUID], ['userUID', $request->userUID]])->first();


        // if ($requestlist) {
        //     if ($requestlist->stageNo == 2) {
        //         // dd("dd");
        //         $requestlist = WorkFlowRequestEntry::with(['uploadFile', 'noOfStage'])->where([['workFlowStageUID', '>', 1], ['approvalStatus', '>', 1]])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //         return response()->json($requestlist);
        //     } else if ($requestlist->stageNo == 3) {

        //         $requestlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 2)->whereNotIn('approvalStatus', [1, 3])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();


        //         return response()->json($requestlist);
        //     } else if ($requestlist->stageNo == 4) {

        //         $approve_list = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 3)->whereNotIn('approvalStatus', [1, 3, 5])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //         return response()->json($approve_list);
        //     } else if ($requestlist->stageNo == 5) {

        //         $requestlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 4)->whereNotIn('approvalStatus', [1, 3, 5, 7])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //         return response()->json($requestlist);
        //     } else if ($requestlist->stageNo == 6) {

        //         $requestlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 5)->whereNotIn('approvalStatus', [1, 3, 5, 7, 9])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //         return response()->json($requestlist);
        //     } else if ($requestlist->stageNo == 7) {
        //         $requestlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 6)->whereNotIn('approvalStatus', [1, 3, 5, 7, 9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //         return response()->json($requestlist);
        //     } else {
        //         $requestlist = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '>', 7], ['status', '>', 1]])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

        //         return response()->json($requestlist);
        //     }
        // } else {
        //     return response()->json(['message' => 'No record Found'], 200);
        // }
    }

    public function getHistoryList(Request $request)
    {

        $pdo = DB::connection()->getPdo();

        $stmt = $pdo->prepare(
            'EXEC CPU_HISTORY_LIST ' . $request->userUID
        );

        $stmt->execute();
        $results = [];

        do {
            // $resultSet = [];
            $resultSet = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($resultSet)) {
                $results = array_merge($results, $resultSet);
            }
        } while ($stmt->nextRowset());

        return response()->json($results);

        //Check the workflowstageUser 
        $rejectlist = WorkFlowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['workFlowStageUID', '=', $request->workFlowStageUID], ['userUID', $request->userUID]])->first();


        if ($rejectlist) {
            if ($rejectlist->stageNo == 1) {
                $rejectlist = WorkFlowRequestEntry::with(['uploadFile', 'remarksFile'])->where('workFlowStageUID', '>', 1)->whereIn('approvalStatus',  [3, 5, 7, 9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            } else if ($rejectlist->stageNo == 2) {

                $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 2)->whereIn('approvalStatus',  [3, 5, 7, 9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            } else if ($rejectlist->stageNo == 3) {

                $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 3)->whereIn('approvalStatus',  [5, 7, 9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();


                return response()->json($rejectlist);
            } else if ($rejectlist->stageNo == 4) {

                $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 4)->whereIn('approvalStatus',   [7, 9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            } else if ($rejectlist->stageNo == 5) {

                $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 5)->whereIn('approvalStatus',  [9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            } else if ($rejectlist->stageNo == 6) {

                $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 6)->whereNotIn('approvalStatus', 11)->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            } else if ($rejectlist->stageNo == 7) {
                // $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where('workFlowStageUID', '>', 6)->whereNotIn('approvalStatus', [1, 3, 5, 7, 9, 11])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            } else {
                // $rejectlist = WorkFlowRequestEntry::with('uploadFile')->where([['workFlowStageUID', '>', 7], ['status', '>', 1]])->selectRaw('*, FORMAT(fromDate, ?) AS fromDate, FORMAT(toDate, ?) AS toDate, workFlowStageName AS stageName, approvalStatus AS status', ['dd/MM/yyyy', 'dd/MM/yyyy'])->orderByDesc('workFlowRequestUID')->get();

                return response()->json($rejectlist);
            }
        } else {
            return response()->json(['message' => 'No record Found'], 200);
        }
    }
}
