<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;

//Model
use App\Http\Controllers\Controller;

//Request
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function store(LoginRequest $request)
    {
        if ($request->roleUID == 2 && $request->businessUnitUID == null) {
            return response()->json(['message' => 'Select your business unit'], 500);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'businessUnitUID' => $request->businessUnitUID ?? 0,
            'roleUID' => $request->roleUID,
            'isActive' => 1
        ]);

        return response()->json(['user' => $user], 200);
    }

    public function getAllUser()
    {
        //Extract the user information from the user table.
        // $users = User::where('roleUID', 2)->get();
        $users = User::where([
            ['tbl_mUsers.roleUID', '=', 2],
            ['tbl_mUsers.isActive', '=', 1]
        ])
            ->leftJoin('tbl_mBusinessUnit', 'tbl_mBusinessUnit.businessUnitUID', '=', 'tbl_mUsers.businessUnitUID')
            ->select('tbl_mUsers.*', 'tbl_mBusinessUnit.businessUnitName')
            ->get();


        return response()->json(['users' => $users], 200);
    }

    public function getBusinessUser(Request $request)
    {
        //Extract the user information from the user table.

        $users = User::where([['roleUID', 2], ['businessUnitUID', $request->businessUnitUID], ['isActive', 1]])->get();
        return response()->json(['users' => $users], 200);
    }

    public function updateUser(LoginRequest $request, $id)
    {
        //update the user in user table
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->has('password')) {
            $user->password = bcrypt($request->password);
        }
        $user->roleUID = $request->roleUID;
        $user->save();

        return response()->json(['user' => $user], 200);
    }

    public function deleteUser($id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        //delete user in user table
        $user->delete();
        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function viewUser($id)
    {
        //View the user details from user table 
        $user = User::where('isActive', 1)->find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user], 200);
    }

    public function ResetPassword(Request $request)
    {
        //View the user details from user table 


        $user = User::where('userID', $request->userUID)->update(
            [
                'password' => bcrypt($request->password)
            ]
        );
        $user = User::find($request->userUID);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 200);
        }

        return response()->json(['user' => $user], 200);
    }

    public function ChangePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'currentPassword' => 'required',
            'newPassword' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            // Check if the error is related to the "currentPassword" field
            if ($validator->errors()->has('currentPassword')) {
                return response()->json(['error' => 'Incorrect old password'], 200);
            }

            // For other validation errors, return a generic message
            return response()->json(['error' => 'Please your input min 8.'], 200);
        }

        $user = User::where('userID', Auth::id())->first();


        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['error' => 'Incorrect old password'], 200);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json(['user' => $user], 200);
    }
}
