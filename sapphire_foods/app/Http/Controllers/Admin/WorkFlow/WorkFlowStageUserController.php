<?php

namespace App\Http\Controllers\Admin\WorkFlow;

use App\Models\User;
use App\Models\WorkFlow;
use App\Models\BusinessUnit;
use Illuminate\Http\Request;
use App\Models\WorkFlowStageUser;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\WorkFlowStageUserValidation;
use App\Models\WorkFlowStage;

class WorkFlowStageUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workflowdetailuser = WorkFlowStageUser::where('isActive', 1)->get();
        return response()->json($workflowdetailuser);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(WorkFlowStageUserValidation $request)
    {
        $workflow = WorkFlow::where([['workFlowUID', '=', $request->workFlowUID], ['isActive', '=', 1]])->first();

        $existworkflow = WorkflowStageUser::where([['workFlowUID', '=', $request->workFlowUID], ['isActive', '=', 1]])->get();

        if (!$existworkflow->isEmpty()) {
            return response()->json(['message' => 'Users have already been added to this workflow'], 404);
        }

        $stagesData = $request->input('stages');

        $workflowdstageuser = [];

        if ($workflow) {
            foreach ($stagesData as $stageData) {
                $workflowstage = WorkFlowStage::where('workFlowStageUID', $stageData['workFlowStageUID'])->first();

                $business = BusinessUnit::where('businessUnitUID', $stageData['businessUnitUID'])->first();

                if ($business) {
                    foreach ($stageData['userUID'] as $userUID) {
                        $user = User::where('userID', $userUID)->first();
                        //Insert the new record
                        $stage =  WorkflowStageUser::Create([
                            'workFlowUID' =>  $request->workFlowUID,
                            'workFlowName' => $workflow->workFlowName,
                            'workFlowStageUID' =>  $workflowstage->workFlowStageUID,
                            'stageNo' => $workflowstage->stageNo,
                            'stageName' => $workflowstage->stageName,
                            'businessUnitUID' => $business->businessUnitUID,
                            'businessUnitName' => $business->businessUnitName,
                            'userUID' => $user->userID,
                            'userName' => $user->name,
                            'userEmail' =>  $user->email,
                            'isActive' => 1
                        ]);
                        $stage->save();
                        $workflowdstageuser[] = $stage;
                    }
                } else {
                    return response()->json(['message' => 'BusinessUnit not found'], 404);
                }
            }
        }


        return response()->json($workflowdstageuser);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workflowdetailuser = WorkFlowStageUser::where([['workFlowUID', '=', $id], ['isActive', '=', 1]])->first();
        return response()->json($workflowdetailuser);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(WorkFlowStageUserValidation $request, string $id)
    {
        $workflow = WorkFlow::where([['workFlowUID', '=', $request->workFlowUID], ['isActive', '=', 1]])->first();

        if (!$workflow) {
            return response()->json(['message' => 'Workflow not found'], 404);
        }

        $stagesData = $request->input('stages');
        $workflowdetail = [];
        foreach ($stagesData as $stageData) {
            $stage = WorkflowStageUser::where('workFlowStageUID', $stageData['workFlowStageUID'])->first();

            // Check if the stage exists
            if (!$stage) {
                // Create a new stage if it doesn't exist
                $stage = new WorkflowStageUser();
            }
            // Update the stage attributes
            $stage->workFlowUID = $request->workFlowUID;
            $stage->workFlowName = $workflow->workFlowName;
            $stage->stageNo = $stageData['stageNo'];
            $stage->stageName = $stageData['stageName'];
            $stage->businessUnitUID = $stageData['businessUnitUID'];
            $stage->businessUnitName = $stageData['businessUnitName'];
            $stage->userUID = $stageData['userUID'];
            $stage->userName = $stageData['userName'];
            $stage->userEmail = $stageData['userEmail'];

            $stage->save();
            $workflowdetail[] = $stage;
        }

        return response()->json($workflowdetail);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $workflowdetailuser = WorkFlowStageUser::where('workFlowDetailsUserUID', $id)->delete();
        return response()->json($workflowdetailuser);
    }

    public function editStageUser(Request $request)
    {
        $workflowstageuser = WorkFlowStageUser::where([['workFlowStageUserUID', '=', $request->workFlowStageUserUID], ['isActive', '=', 1]])->first();

        if ($workflowstageuser) {
            $userdetails = User::where('userID', $request->userUID)->first();
            WorkFlowStageUser::where([['workFlowStageUserUID', '=', $workflowstageuser->workFlowStageUserUID], ['isActive', '=', 1]])->update([
                'userUID' => $userdetails->userID,
                'userName' => $userdetails->name,
                'userEmail' => $userdetails->email
            ]);

            return response()->json($userdetails);
        }
    }
}
