<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;


//Request
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AdminController extends Controller
{
    public function index()
    {
        return response()->json(['hello' => 'admin_dashboard']);
    }
    public function getAllUser()
    {
        $data = User::all();
        return response()->json($data);
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
