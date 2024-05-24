<?php

namespace App\Providers;

use GuzzleHttp\Psr7\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        JsonResponse::macro('errorResponse', function ($dataset = null) {
            return response()->json([
                "statusCode" => response()->getStatusCode(),
                "message" => "Error",
                "data" => $dataset
            ]);
        });


        JsonResponse::macro('successResponse', function ($dataset = null) {
            return response()->json([
                "statusCode" => 200,
                "message" => "Success",
                "data" => $dataset
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
