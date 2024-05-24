<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponseTrait
{
    public function successResponse($data, $message = 'Success', $statusCode = 200): JsonResponse
    {
        return response()->json([
            'status' => $statusCode,
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    public function errorResponse($message, $statusCode): JsonResponse
    {
        return response()->json([
            'status' => $statusCode,
            'message' => $message,
            'data' => null,
        ], $statusCode);
    }

    // Add other response handling methods as needed
}
