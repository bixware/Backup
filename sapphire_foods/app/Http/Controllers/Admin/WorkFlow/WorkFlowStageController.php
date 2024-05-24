<?php

namespace App\Http\Controllers\Admin\WorkFlow;

use Illuminate\Http\Request;
use App\Models\WorkFlowStage;
use App\Http\Controllers\Controller;
use App\Http\Requests\WorkFlowStageValidation;
use App\Models\BusinessUnit;
use App\Models\WorkFlow;
use Illuminate\Support\Facades\Validator;
use Termwind\Components\Dd;

class WorkFlowStageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workflowdetail = WorkFlowStage::where('isActive', 1)->get();
        return response()->json($workflowdetail);
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
    public function store(WorkFlowStageValidation $request)
    {
        $workflow = WorkFlow::where([['workFlowUID', '=', $request->workFlowUID], ['isActive', '=', 1]])->first();

        $stagesData = $request->input('stages');

        if (count($stagesData) == 0) {
            return response()->json(['message' => 'Enter the Stagename in the Workflow']);
        }

        $workflowdetail = [];

        foreach ($stagesData as $index => $stageData) {
            $business = BusinessUnit::where('businessUnitUID', $stageData['businessUnitUID'])->first();

            $approvalID = WorkflowStage::generateApprovalID();

            if ($business->businessUnitUID !== 5 && $approvalID && $index !== 0 &&  $index !== count($stagesData) - 1) {
                $rejectID = $approvalID + 1;
            } else {
                $rejectID = null;
            }
            $rejectName = $rejectID ? "Rejected" : null;

            $previousStageNo = null;
            $nextStageNo = null;

            if ($index > 0) {
                $previousStageNo = $stagesData[$index - 1]["stageNo"];
            }

            if ($index < count($stagesData) - 1) {
                $nextStageNo = $stagesData[$index + 1]["stageNo"];
            }

            $stage =  WorkflowStage::Create([
                'workFlowUID' => $workflow->workFlowUID,
                'workFlowName' => $workflow->workFlowName,
                'stageNo' => $stageData['stageNo'],
                'stageName' => $stageData['stageName'],
                'businessUnitUID' => $stageData['businessUnitUID'],
                'businessUnitName' => $business->businessUnitName,
                'approveID' => $approvalID,
                'approveName' => "Approved",
                'rejectID' => $rejectID ?? null,
                'rejectName' => $rejectName,
                'previousStageNo' => $previousStageNo,
                'nextStageNo' => $nextStageNo,
                'isActive' => 1
            ]);

            $stage->workFlowName = $workflow->workFlowName;
            // $stage->save();
            $workflowdetail[] = $stage;
        }

        return response()->json($workflowdetail);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workflowdetail = WorkFlowStage::where('workFlowUID', $id)->first();
        return response()->json($workflowdetail);
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
    public function update(WorkFlowStageValidation $request, string $id)
    {

        $workflow = WorkFlow::where('workFlowUID', $request->workFlowUID)->first();

        if (!$workflow) {
            return response()->json(['message' => 'Workflow not found'], 404);
        }

        $stagesData = $request->input('stages');
        $workflowdetail = [];
        foreach ($stagesData as $stageData) {
            $stage = WorkflowStage::where('workFlowStageUID', $stageData['workFlowStageUID'])->first();

            // Check if the stage exists
            if (!$stage) {
                // Create a new stage if it doesn't exist
                $stage = new WorkflowStage();
            }
            // Update the stage attributes
            $stage->workFlowUID = $request->workFlowUID;
            $stage->workFlowName = $workflow->workFlowName;
            $stage->stageNo = $stageData['stageNo'];
            $stage->stageName = $stageData['stageName'];
            $stage->businessUnitUID = $stageData['businessUnitUID'];
            $stage->businessUnitName = $stageData['businessUnitName'];
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
        $workflowdetail = WorkFlowStage::where('workFlowDetailsUID', $id)->delete();
        return response()->json($workflowdetail);
    }

    public function getAllMailContent(Request $request)
    {
        $mailcontent = WorkFlowStage::where('isActive', 1)->select('workFlowUID', 'stageName', 'workFlowName', 'mailSubject', 'mailContent')->get();
        return response()->json($mailcontent);
    }

    public function updateMailContent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mailSubject' => 'required',
            'mailContent' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stage = WorkflowStage::where('workFlowStageUID', $request->workFlowStageUID)->update([
            'mailSubject' => $request->mailSubject,
            'mailContent' => $request->mailContent,
        ]);
        return response()->json($stage);
    }

    public function getworkflowstatus(Request $request)
    {
        $workflowdetail = WorkFlowStage::select('stageName')
            ->where('isActive', 1)
            ->groupBy('stageName')
            ->orderByRaw('MAX(stageNo)')
            ->get()
            ->map(function ($item, $key) {
                $item['serialNo'] = $key + 1;
                return $item;
            });
        return response()->json($workflowdetail);
    }
}
