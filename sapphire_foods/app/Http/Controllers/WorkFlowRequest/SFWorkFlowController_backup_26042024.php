<?php

namespace App\Http\Controllers\WorkFlowRequest;

use Log;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SFWorkFlowController extends Controller
{
    public function SFCreateCPU(Request $request)
    {
        Log::info($request->all());
        if ($request->hasFile('multipleUpload')) {
            $files = $request->file('multipleUpload');
            $fileNames = [];
            foreach ($files as $imgresponse) {
                // Generate a unique file name
                $input_file_name =  $imgresponse->getClientOriginalName();
                $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                $fileName = $file . "_" . time() . '.' .  $imgresponse->extension();
                $imgresponse->move(storage_path('app/public/uploads/tickets'), $fileName);
                $fileNames[] = $fileName;
            }
            $combinedFileNames = implode(',', $fileNames);

            if (!empty($request->fromDate)) {
                // $dt = $request->fromDate;
                $parsedfromDate = Carbon::createFromFormat('d/m/Y', $request->fromDate)->format('Y-m-d');
                $parsedtoDate = Carbon::createFromFormat('d/m/Y', $request->toDate)->format('Y-m-d');
            } else {
                $parsedfromDate = "";
                $parsedtoDate = "";
            }

            return DB::select(
                'SF_REQUEST_CREATEUPDATE 
            :PROCTYPE,
            :userUID,
            :businessUnitUID,
            :businessUnitName,
            :userName,
            :userEmail,
            :approveID,
            :approveName,
            :rejectID,
            :rejectName,
            :stageName,
            :stageNo,
            :workFlowName,
            :workFlowUID,
            :workFlowStageUID,
            :brandUID,
            :brand,
            :category,
            :categoryUID,
            :vendorCode,
            :vendorDescription,
            :materialCode,
            :description,
            :fromDate,
            :toDate,
            :dcDsd,
            :dcdsdUID,
            :remarks,
            :filename,
            :filepath,
            :receipeName,
            :FGCode,
            :workFlowRequestUID,
            :requestNo',
                [
                    'PROCTYPE' => 'Initiator',
                    'userUID' => $request->userUID,
                    'businessUnitUID' => $request->businessUnitUID,
                    'businessUnitName' => $request->businessUnitName,
                    'userName' => $request->userName,
                    'userEmail' => $request->userEmail,
                    'approveID' => $request->approveID,
                    'approveName' => $request->approveName,
                    'rejectID' => $request->rejectID,
                    'rejectName' => $request->rejectName,
                    'stageName' => $request->stageName,
                    'stageNo' => $request->stageNo,
                    'workFlowName' => $request->workFlowName,
                    'workFlowUID' => $request->workFlowUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'brandUID' => $request->brandUID,
                    'brand' => $request->brand,
                    'category' => $request->category,
                    'categoryUID' => $request->categoryUID,
                    'vendorCode' => $request->vendorCode,
                    'vendorDescription' => $request->vendorDescription,
                    'materialCode' => $request->materialCode,
                    'description' => $request->description,
                    'fromDate' => $parsedfromDate,
                    'toDate' => $parsedtoDate,
                    'dcDsd' => $request->dcDsd,
                    'dcdsdUID' => $request->dcdsdUID,
                    'remarks' => $request->remarks,
                    'filename' => $combinedFileNames,
                    'filepath' => 'app/public/uploads/tickets',
                    'receipeName' => $request->receipeName ?? NULL,
                    'FGCode' => $request->FGCode ?? NULL,
                    'workFlowRequestUID' => $request->workFlowRequestUID ?? NULL,
                    'requestNo' => $request->requestNo ?? NULL
                ]
            );
        }
    }

    public function SFCreateMCC(Request $request)
    {

        if ($request->hasFile('multipleUpload')) {
            $files = $request->file('multipleUpload');
            $fileNames = [];
            foreach ($files as $imgresponse) {
                // Generate a unique file name
                $input_file_name =  $imgresponse->getClientOriginalName();
                $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                $fileName = $file . "_" . time() . '.' .  $imgresponse->extension();
                $imgresponse->move(storage_path('app/public/uploads/tickets'), $fileName);
                $fileNames[] = $fileName;
            }
            $combinedFileNames = implode(',', $fileNames);


            return DB::select(
                'SF_REQUEST_CREATEUPDATE 
            :PROCTYPE,
            :userUID,
            :businessUnitUID,
            :businessUnitName,
            :userName,
            :userEmail,
            :approveID,
            :approveName,
            :rejectID,
            :rejectName,
            :stageName,
            :stageNo,
            :workFlowName,
            :workFlowUID,
            :workFlowStageUID,
            :brandUID,
            :brand,
            :category,
            :categoryUID,
            :vendorCode,
            :vendorDescription,
            :materialCode,
            :description,
            :fromDate,
            :toDate,
            :dcDsd,
            :dcdsdUID,
            :remarks,
            :filename,
            :filepath,
            :receipeName,
            :FGCode,
            :workFlowRequestUID,
            :requestNo',


                [
                    'PROCTYPE' => 'Initiator',
                    'userUID' => $request->userUID,
                    'businessUnitUID' => $request->businessUnitUID,
                    'businessUnitName' => $request->businessUnitName,
                    'userName' => $request->userName,
                    'userEmail' => $request->userEmail,
                    'approveID' => $request->approveID,
                    'approveName' => $request->approveName,
                    'rejectID' => $request->rejectID,
                    'rejectName' => $request->rejectName,
                    'stageName' => $request->stageName,
                    'stageNo' => $request->stageNo,
                    'workFlowName' => $request->workFlowName,
                    'workFlowUID' => $request->workFlowUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'brandUID' => $request->brandUID,
                    'brand' => $request->brand,
                    'category' => $request->category,
                    'categoryUID' => $request->categoryUID,
                    'vendorCode' => $request->vendorCode ?? NULL,
                    'vendorDescription' => $request->vendorDescription ?? NULL,
                    'materialCode' => $request->materialCode ?? NULL,  //SKU CODE
                    'description' => $request->description, //SKU DESCRIPTION
                    'fromDate' => $request->fromDate ?? NULL,
                    'toDate' => $request->toDate ?? NULL,
                    'dcDsd' => $request->dcDsd ?? NULL,
                    'dcdsdUID' => $request->dcdsdUID ?? NULL,
                    'remarks' => $request->remarks,
                    'filename' => $combinedFileNames,
                    'filepath' => 'app/public/uploads/tickets',
                    'receipeName' => $request->receipeName ?? NULL,
                    'FGCode' => $request->FGCode ?? NULL,
                    'workFlowRequestUID' => $request->workFlowRequestUID ?? NULL,
                    'requestNo' => $request->requestNo ?? NULL
                ]
            );
        }
    }

    public function SFCreateNSO(Request $request)
    {

        if ($request->hasFile('multipleUpload')) {
            $files = $request->file('multipleUpload');
            $fileNames = [];
            foreach ($files as $imgresponse) {
                // Generate a unique file name
                $input_file_name =  $imgresponse->getClientOriginalName();
                $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                $fileName = $file . "_" . time() . '.' .  $imgresponse->extension();
                $imgresponse->move(storage_path('app/public/uploads/tickets'), $fileName);
                $fileNames[] = $fileName;
            }
            $combinedFileNames = implode(',', $fileNames);


            return DB::select(
                'SF_REQUEST_CREATEUPDATE 
            :PROCTYPE,
            :userUID,
            :businessUnitUID,
            :businessUnitName,
            :userName,
            :userEmail,
            :approveID,
            :approveName,
            :rejectID,
            :rejectName,
            :stageName,
            :stageNo,
            :workFlowName,
            :workFlowUID,
            :workFlowStageUID,
            :brandUID,
            :brand,
            :category,
            :categoryUID,
            :vendorCode,
            :vendorDescription,
            :materialCode,
            :description,
            :fromDate,
            :toDate,
            :dcDsd,
            :dcdsdUID,
            :remarks,
            :filename,
            :filepath,
            :receipeName,
            :FGCode,
            :workFlowRequestUID,
            :requestNo',
                [
                    'PROCTYPE' => 'Initiator',
                    'userUID' => $request->userUID,
                    'businessUnitUID' => $request->businessUnitUID,
                    'businessUnitName' => $request->businessUnitName,
                    'userName' => $request->userName,
                    'userEmail' => $request->userEmail,
                    'approveID' => $request->approveID,
                    'approveName' => $request->approveName,
                    'rejectID' => $request->rejectID,
                    'rejectName' => $request->rejectName,
                    'stageName' => $request->stageName,
                    'stageNo' => $request->stageNo,
                    'workFlowName' => $request->workFlowName,
                    'workFlowUID' => $request->workFlowUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'brandUID' => $request->brandUID,
                    'brand' => $request->brand,
                    'category' => $request->category,
                    'categoryUID' => $request->categoryUID,
                    'vendorCode' => $request->vendorCode,
                    'vendorDescription' => $request->vendorDescription,
                    'materialCode' => $request->materialCode,
                    'description' => $request->description,
                    'fromDate' => $request->fromDate ??  NULL,
                    'toDate' => $request->toDate ?? NULL,
                    'dcDsd' => $request->dcDsd,
                    'dcdsdUID' => $request->dcdsdUID,
                    'remarks' => $request->remarks,
                    'filename' => $combinedFileNames,
                    'filepath' => 'app/public/uploads/tickets',
                    'receipeName' => $request->receipeName,
                    'FGCode' => $request->FGCode ?? NULL,
                    'workFlowRequestUID' => $request->workFlowRequestUID ?? NULL,
                    'requestNo' => $request->requestNo ?? NULL
                ]
            );
        }
    }

    public function SFCreateRC(Request $request)
    {

        if ($request->hasFile('multipleUpload')) {
            $files = $request->file('multipleUpload');
            $fileNames = [];
            foreach ($files as $imgresponse) {
                // Generate a unique file name
                $input_file_name =  $imgresponse->getClientOriginalName();
                $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                $fileName = $file . "_" . time() . '.' .  $imgresponse->extension();
                $imgresponse->move(storage_path('app/public/uploads/tickets'), $fileName);
                $fileNames[] = $fileName;
            }
            $combinedFileNames = implode(',', $fileNames);


            return DB::select(
                'SF_REQUEST_CREATEUPDATE 
            :PROCTYPE,
            :userUID,
            :businessUnitUID,
            :businessUnitName,
            :userName,
            :userEmail,
            :approveID,
            :approveName,
            :rejectID,
            :rejectName,
            :stageName,
            :stageNo,
            :workFlowName,
            :workFlowUID,
            :workFlowStageUID,
            :brandUID,
            :brand,
            :category,
            :categoryUID,
            :vendorCode,
            :vendorDescription,
            :materialCode,
            :description,
            :fromDate,
            :toDate,
            :dcDsd,
            :dcdsdUID,
            :remarks,
            :filename,
            :filepath,
            :receipeName,
            :FGCode,
            :workFlowRequestUID,
            :requestNo',
                [
                    'PROCTYPE' => 'Initiator',
                    'userUID' => $request->userUID,
                    'businessUnitUID' => $request->businessUnitUID,
                    'businessUnitName' => $request->businessUnitName,
                    'userName' => $request->userName,
                    'userEmail' => $request->userEmail,
                    'approveID' => $request->approveID,
                    'approveName' => $request->approveName,
                    'rejectID' => $request->rejectID,
                    'rejectName' => $request->rejectName,
                    'stageName' => $request->stageName,
                    'stageNo' => $request->stageNo,
                    'workFlowName' => $request->workFlowName,
                    'workFlowUID' => $request->workFlowUID,
                    'workFlowStageUID' => $request->workFlowStageUID,
                    'brandUID' => $request->brandUID,
                    'brand' => $request->brand,
                    'category' => $request->category ?? NULL,
                    'categoryUID' => $request->categoryUID ?? NULL,
                    'vendorCode' => $request->vendorCode ?? NULL,
                    'vendorDescription' => $request->vendorDescription ?? NULL,
                    'materialCode' => $request->materialCode ?? NULL,
                    'description' => $request->description ?? NULL,
                    'fromDate' => $request->fromDate ??  NULL,
                    'toDate' => $request->toDate ?? NULL,
                    'dcDsd' => $request->dcDsd ?? NULL,
                    'dcdsdUID' => $request->dcdsdUID ?? NULL,
                    'remarks' => $request->remarks,
                    'filename' => $combinedFileNames,
                    'filepath' => 'app/public/uploads/tickets',
                    'receipeName' => $request->receipeName,
                    'FGCode' => $request->FGCode,
                    'workFlowRequestUID' => $request->workFlowRequestUID ?? NULL,
                    'requestNo' => $request->requestNo ?? NULL
                ]
            );
        }
    }





    public function SFRequestList(Request $request)
    {
        return DB::select('SF_REQUEST_LIST :USER_UID', [
            'USER_UID'        => $request->userUID
        ]);
    }

    public function SFRequestHisotry(Request $request)
    {
        return DB::select('SF_REQUEST_HISTORY :workFlowRequestUID', [
            'workFlowRequestUID'        => $request->workFlowRequestUID
        ]);
    }


    //conclude list
    public function SFApproveList(Request $request)
    {
        return DB::select('SF_APPROVAL_LIST :USER_UID', [
            'USER_UID'        => $request->userUID
        ]);
    }

    public function SFConcludeList(Request $request)
    {
        return DB::select('SF_CONCLUDE_LIST :USER_UID', [
            'USER_UID'        => $request->userUID
        ]);
    }

    public function SFViewHisotry(Request $request)
    {
        return DB::select('SF_VIEW_HISTORY :workFlowRequestUID', [
            'workFlowRequestUID'        => $request->workFlowRequestUID
        ]);
    }

    public function SFUpdateApproval(Request $request)
    {

        return DB::select(
            'SF_APPROVE_UPDATE 
                :PROCTYPE,
                :userUID,
                :workFlowRequestUID,
                :workFlowStageUID,
                :workFlowStageName,
                :approvalID,
                :remarks',
            [
                'PROCTYPE' => 'Approval',
                'userUID' => $request->userUID,
                'workFlowRequestUID' =>  $request->workFlowRequestUID,
                'workFlowStageUID' => $request->workFlowStageUID,
                'workFlowStageName' => $request->workFlowStageName,
                'approvalID' => $request->approvalStatus,
                'remarks' => $request->Remarks
            ]
        );
    }

    public function SFDataEntryApproval(Request $request)
    {
        if ($request->hasFile('multipleUpload')) {
            $files = $request->file('multipleUpload');
            $fileNames = [];
            foreach ($files as $imgresponse) {
                // Generate a unique file name
                $input_file_name =  $imgresponse->getClientOriginalName();
                $file = pathinfo($input_file_name, PATHINFO_FILENAME);
                $fileName = $file . "_" . time() . '.' .  $imgresponse->extension();
                $imgresponse->move(storage_path('app/public/uploads/tickets'), $fileName);
                $fileNames[] = $fileName;
            }
            $combinedFileNames = implode(',', $fileNames);
        }
        return DB::select(
            'SF_DATAENTRY_UPDATE 
                :PROCTYPE,
                :userUID,
                :workFlowRequestUID,
                :workFlowStageUID,
                :workFlowStageName,
                :approvalID,
                :remarks,
                :filename,
                :filepath',

            [
                'PROCTYPE' => 'DataEntry',
                'userUID' => $request->userUID,
                'workFlowRequestUID' =>  $request->workFlowRequestUID,
                'workFlowStageUID' => $request->workFlowStageUID,
                'workFlowStageName' => $request->workFlowStageName,
                'approvalID' => $request->approvalStatus,
                'remarks' => $request->Remarks,
                'filename' => $combinedFileNames,
                'filepath' => 'app/public/uploads/tickets',
            ]
        );
    }
}
