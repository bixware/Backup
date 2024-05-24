<?php

namespace App\Http\Controllers\WorkFlowRequest;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SFReportsController extends Controller
{
    public function filterReportList(Request $request)
    {
        // dd($request->all());
        $workFlowJSON = json_encode($request->workFlowUID);
        $brandJSON = json_encode($request->brand);
        $statusJSON = json_encode($request->status);

        return DB::select('SF_FILTERS_LIST :PROC_TYPE,:workFlowUID,:brand,:status,:fromdate,:todate', [
            'PROC_TYPE' => "FILTERS",
            'workFlowUID'        => $workFlowJSON,
            'brand'  => $brandJSON,
            'status' => $statusJSON,
            'fromdate'  => $request->fromdate,
            'todate'  => $request->todate

        ]);
    }

    public function allReportList(Request $request)
    {
        if ($request->fromDate && $request->toDate) {
            $parsedfromDate = Carbon::createFromFormat('d/m/Y', $request->fromDate)->format('Y-m-d');
            $parsedtoDate = Carbon::createFromFormat('d/m/Y', $request->toDate)->format('Y-m-d');
        }

        return DB::select('SF_REPORT_ALL :status,:fromDate,:toDate', [
            'status' => $request->status ?? null,
            'fromDate'  => $parsedfromDate ?? null,
            'toDate'  => $parsedtoDate ?? null

        ]);
    }

    public function getReportView(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'workFlowRequestUID' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        return DB::select('SF_REPORT_SINGLE_VIEW :workFlowRequestUID', [
            'workFlowRequestUID'        => $request->workFlowRequestUID
        ]);
    }
}
