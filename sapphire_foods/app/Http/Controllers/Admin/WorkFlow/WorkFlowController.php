<?php

namespace App\Http\Controllers\Admin\WorkFlow;

use App\Models\WorkFlow;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\WorkFlowValidation;
// use Illuminate\Support\Facades\Validator;

class WorkFlowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workflow = WorkFlow::where('isActive', 1)->get();
        return response()->json($workflow);
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
    public function store(WorkFlowValidation $request)
    {
        $workflow = WorkFlow::create([
            'workFlowName' => $request->workFlowName,
            'noOfStage' =>  $request->noOfStage,
            'isActive' => 1

        ]);

        return response()->json($workflow);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workflow = WorkFlow::where([['workFlowUID', $id], ['isActive', 1]])->first();
        return response()->json($workflow);
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
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|max:255'
        ]);

        $workflow = WorkFlow::where([['workFlowUID', $id], ['isActive', 1]])->update(['name' => $request->name, 'isActive' => $request->isActive]);
        return response()->json($workflow);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $workflow = WorkFlow::where('workFlowUID', $id)->delete();
        return response()->json($workflow);
    }
}
