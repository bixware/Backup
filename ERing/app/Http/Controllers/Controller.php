<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
/**
 * @OA\Info(
 *     title="ERing API",
 *     version="0.1",
 *      @OA\Contact(
 *          email="info@yeagger.com"
 *      ),
 * ),
 *  @OA\Server(
 *      description="Laravel 9",
 *      url="http://127.0.0.1:8000/"
 *  ),
 */

class Controller extends BaseController
{
   // use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function responseHeader(): array
    {
      return [
        'Cache-Control' => 'no-cache, no-store, max-age=0, must-revalidate',
        'Expires' => 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Pragma' => 'no-cache',
      ];
    }

    public function response(string $msg, array $data = []): JsonResponse
    {
      $output = [
        'status' => true,
        'code' => Response::HTTP_OK,
        'message' => $msg,
      ];


      if (count($data) > 0) {
        foreach ($data as $key => $value) {
          $output[$key] = $value;
        }
      }
      return response()->json($output, Response::HTTP_OK);
    }

}
