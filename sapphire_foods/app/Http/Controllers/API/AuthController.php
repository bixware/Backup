<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\WorkFlow;
use Illuminate\Http\Request;
use App\Models\WorkFlowStageUser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register']]);
    }




    public function login(Request $request)
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);



        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $validator->validated();

        $user = User::where('email', $credentials['email'])->where('isActive', 1)->first();

        if (!$user) {
            return response()->json([
                'status' => 400,
                'error' => 'User not found',
            ]);
        }

        if (!$token = auth('api')->attempt($validator->validated())) {
            return response()->json([
                "status" => 200,
                "error" => "Password Mismatch"
            ]);
        }
        return $this->createToken($token);
    }




    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tbl_mUsers,email',
            'password' => 'required|string|min:8',
            'roleUID' => 'required|exists:tbl_mRole,roleUID', // Assuming you have a roles table
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // dd("h");
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'roleUID' => $request->roleUID,
            'businessUnitUID' => $request->businessUnitUID,
            'isActive' => 1
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }



    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }




    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    protected function createToken($token)
    {

        $user = auth('api')->user();
        // $user->load('getWorkFlowStatgeUser');
        $user = auth('api')->user()->load([
            'getWorkFlowStatgeUser' => function ($query) {
                $query->where('isActive', 1);
            },
            'getWorkFlowStatgeUser.workFlow' => function ($query) {
                $query->where('isActive', 1)
                    ->select('workFlowUID', 'workFlowName', 'noOfStage');
            },
        ]);
        // dd($user);
        return response()->json([
            'User' => $user,
            'token_type' => 'bearer',
            'token' => $token
        ]);
    }

    public function getAllUser()
    {
        $users = User::all();
        return response()->json($users);
    }
}
