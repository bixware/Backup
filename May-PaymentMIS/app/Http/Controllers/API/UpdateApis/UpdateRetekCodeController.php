<?php

namespace App\Http\Controllers\API\UpdateApis;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UpdateRetekCodeController extends Controller
{
    public function SalestableRetekcode(Request $request)
    {
        try {
            // Begin the transaction
            DB::beginTransaction();

            // Call the stored procedure
            DB::statement('UpdateRetekCodeForSalesETL');

            // Commit the transaction
            DB::commit();

            // Return success response
            return response()->json([
                'status' => 201,
                'message' => "Executed successful"
            ], 201);
        } catch (\Throwable $th) {
            // Rollback the transaction in case of error
            DB::rollBack();

            // Return error response
            return response()->json([
                'status' => $th->getCode(),
                'message' => "Query failed"
            ], 500);
        }
    }


    public function BankdropStatus(Request $request)
    {
        try {
            // Begin the transaction
            DB::beginTransaction();

            // Call the stored procedure
            DB::statement('UpdateBankDropStatus');

            // Commit the transaction
            DB::commit();

            // Return success response
            return response()->json([
                'status' => 201,
                'message' => "Executed successful"
            ], 201);
        } catch (\Throwable $th) {
            // Rollback the transaction in case of error
            DB::rollBack();

            // Return error response
            return response()->json([
                'status' => $th->getCode(),
                'message' => "Query failed"
            ], 500);
        }
    }

    public function BrandMissingRemarks(Request $request)
    {


        $validate = Validator::make($request->only(['Banktype']), [
            "Banktype" => 'required',
        ]);

        // failed validation
        if ($validate->fails()) {
            // returning failed validation response
            return response()->json([
                'status' => 409,
                'message' => $validate->errors()
            ], 409);
        }


        try {




            // Begin the transaction
            DB::beginTransaction();

            // Call the stored procedure
            DB::statement('UpdateBrandDescAndMissingRemarks :Banktype', [
                'Banktype' => $request->Banktype
            ]);

            // Commit the transaction
            DB::commit();

            // Return success response
            return response()->json([
                'status' => 201,
                'message' => "Executed successful"
            ], 201);
        } catch (\Throwable $th) {
            // Rollback the transaction in case of error
            DB::rollBack();
            // Return error response
            return response()->json([
                'status' => $th->getCode(),
                'message' => "Query failed"
            ], 500);
        }
    }

    public function UpdateRetekcode(Request $request)
    {
        try {
            // Begin the transaction
            DB::beginTransaction();

            // Call the stored procedure
            DB::statement('UpdateRetekCode');

            // Commit the transaction
            DB::commit();

            // Return success response
            return response()->json([
                'status' => 201,
                'message' => "Executed successful"
            ], 201);
        } catch (\Throwable $th) {
            // Rollback the transaction in case of error
            DB::rollBack();
            // Return error response
            return response()->json([
                'status' => $th->getCode(),
                'message' => "Query failed"
            ], 500);
        }
    }
}
