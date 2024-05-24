<?php

namespace App\Http\Controllers\Admin\BusinessUnit;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\BusinessUnit;

//Validator
use App\Http\Requests\BusinessUnitRequest;

class BusinessUnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workflow = BusinessUnit::all();
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
    public function store(BusinessUnitRequest $request)
    {
        $businessunit = BusinessUnit::create([
            'businessUnitName' => $request->businessUnitName,
            'isActive' => 1
        ]);

        return response()->json($businessunit);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $businessunit = BusinessUnit::where('businessUnitUID', $id)->first();
        return response()->json($businessunit);
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
            'businessUnitName' => 'required|max:255'
        ]);

        $businessunit = BusinessUnit::where('roleUID', $id)->update(['businessUnitName' => $request->businessUnitName, 'isActive' => $request->isActive]);
        return response()->json($businessunit);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $businessunit = BusinessUnit::where('businessUnitUID', $id)->delete();
        return response()->json($businessunit);
    }
}
