<?php
declare(strict_types=1);
namespace App\Http\Controllers\API\Admin\Login;

//Request
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Login\LoginRequest;

// Response
use Illuminate\Http\JsonResponse;

//Controller
use App\Http\Controllers\Controller;

//Models
use App\Models\User; 

//Services
use App\Services\Admin\Login\LoginService;

// Exceptions
use Exception;
use App\Exceptions\CustomModelNotFoundException;

//Others
use Illuminate\Support\Facades\Auth; 
use Carbon\Carbon;
use Hash;

class LoginController extends Controller
{

    public function __construct(LoginService $service)
    {
        $this->service = $service;
    }

    /**
     * Login API
     * 
     * The Purpose of the Login API is to log into the console by generating a token that provides authentication to all the other API's
     * 
     * @group Login API
     *
     * @unauthenticated  
     *
     * @bodyParam userName email required The email id of the user Example backiaraj@bixware.com
     * @bodyParam password string required Enter your Password Example 123456
     */
        

    public function login(LoginRequest $request)  :? JsonResponse   {
        
       $user = User::getUserByUserName($request->input('userName'));
       
       
        if (!$user) {  // If user is not found
          throw new CustomModelNotFoundException(__(trans('logincustomer.UserNotFound')));
        }
        if($user)       // If the user is found
        {
            if ($request->input('password') == $user->nonHash) {

              $token = Auth::login($user); 
                           
              $data = [
                'user' => $user,
                'authorisation' =>[
                    'token' => $token,
                    'type' => 'bearer',
                    'expires_in' => auth('api')->factory()->getTTL() * 60,
                ]
              ];
             
              return $this->response(__(trans('logincustomer.success')), compact('data'));
                          
              } else {

                $data="";  
                return $this->response(__(trans('logincustomer.pass_missmatch')), compact('data'));
            }

          }
      
    }


    /**
    * Logout API
    * 
    * Logout API logs you out of the console application
    * 
    * @group Logout API
    *
    */


        public function logout(Request $request)
        {
          if (!(Auth::user())) {  // If user is not foundvb
            throw new CustomModelNotFoundException(__(trans('logincustomer.UserNotFound')));
          }
          
            Auth::logout();
            $data=[''];
            return $this->response(__(trans('logincustomer.logout')), compact('data'));
        } 

    /**
    * Refresh API
    * 
    * Refresh API refreshes the generated token
    * 
    * @group Login/Logout API
    *
    */

        public function refresh()
        {
            $data = [
               
                'user' => Auth::user(),
                'authorisation' => [
                    'token' => Auth::refresh(),
                    'type' => 'bearer',
                ]
            ];

            return $this->response(__(trans('logincustomer.success')), compact('data'));

        }
}
