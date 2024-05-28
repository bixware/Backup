<?php
declare(strict_types=1);
namespace App\Http\Controllers\API;

// Response
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

//Controller
use App\Http\Controllers\Controller;

//Services
use App\Services\DescriptionService;

// Exceptions
use Exception;
use App\Exceptions\CustomModelNotFoundException;
use App\Exceptions\CustomLibraryException;

//Others
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Hash;
use Validator;

/**
 * @OA\Post(
 *     path="/backend",
 *     @OA\Response(response="200", description="Display a listing of projects.")
 * )
 */

class DescriptionController extends Controller
{

     public function __construct(DescriptionService $service)
    {
        $this->service = $service;
    }
    /**
     * Configuration API
     * 
     * The Purpose of the Configuration API is to provide system config details of the console
     * 
     * @group Configuration API
     *
           * @OA\Post(
        * path="/api/description",
        * operationId="authDescription",
        * tags={"Description"},
        * summary="Description",
        * description="Description",
        *     @OA\RequestBody(
        *         @OA\JsonContent(),
        *         @OA\MediaType(
        *            mediaType="multipart/form-data",
        *            @OA\Schema(
        *               type="object",
        *               required={},
        *             
        *            ),
        *        ),
        *    ),
        *    
        *      @OA\Response(
        *          response=200,
        *          description="Login Successfully",
        *          @OA\JsonContent()
        *       ),
        *      @OA\Response(
        *          response=422,
        *          description="Unprocessable Entity",
        *          @OA\JsonContent()
        *       ),
        *      @OA\Response(response=400, description="Bad request"),
        *      @OA\Response(response=404, description="Resource Not Found"),
        * )
        */

public function description()
{

       $configuration = $this->service->getDescription();

      
      $data = [
        'configuration'  => $configuration,
      ];

      return $this->response(__(trans('msystem_configuration.success')), compact('data'));

    }
}
