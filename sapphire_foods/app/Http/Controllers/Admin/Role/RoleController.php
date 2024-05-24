<?php

namespace App\Http\Controllers\Admin\Role;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\RoleValidationRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
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
    public function store(RoleValidationRequest $request)
    {
        $roles = Role::create([
            'roleName' => $request->roleName,
            'isActive' => 1
        ]);

        return response()->json($roles);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $roles = Role::where('roleUID', $id)->first();
        return response()->json($roles);
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
            'roleName' => 'required|max:255'
        ]);

        $roles = Role::where('roleUID', $id)->update(['roleName' => $request->roleName, 'isActive' => $request->isActive]);
        return response()->json($roles);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $roles = Role::where('roleUID', $id)->delete();
        return response()->json($roles);
    }
}
