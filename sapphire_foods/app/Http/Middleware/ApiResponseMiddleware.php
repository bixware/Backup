<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Execute the request
        $response = $next($request);

        // Set default status code and message
        $statusCode = $response->getStatusCode();
        $message = 'Success'; // Default message

        $exception = $response->exception;

        if ($exception && isset($exception->validator)) {
            // Validator instance exists in the exception
            $validator = $exception->validator;

            $statusCode = $exception->status;

            if ($validator instanceof \Illuminate\Validation\Validator) {
                // Extract error messages from the validator
                $errors = $validator->errors()->getMessages();

                if (!empty($errors)) {
                    // Return validation errors in the JSON response
                    return response()->json([
                        'status' => $statusCode,
                        'message' => 'Validation error',
                        'errors' => $errors,
                    ], $statusCode);
                }
            }
        }

        // Customize the default message and status code based on response
        if ($statusCode == 404) {
            $message = 'Resource not found';
        } elseif ($statusCode == 500) {
            $message = 'Internal Server Error';
        }

        // Create a new response with default structure
        $data = [
            'status' => $statusCode,
            'message' => $message,
            'data' => $response->original,
        ];

        return response()->json($data, $statusCode);
    }
}
