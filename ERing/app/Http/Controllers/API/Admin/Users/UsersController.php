<?php
declare(strict_types=1);
namespace App\Http\Controllers\API\Admin\Users;

//Request
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Users\UsersRequest;

// Response
use Illuminate\Http\JsonResponse;

//Controller
use App\Http\Controllers\Controller;

//Services
use App\Services\Admin\Users\UsersService;

// Exceptions
use Exception;
use App\Exceptions\CustomModelNotFoundException;
use Illuminate\Support\Str;

class UsersController extends Controller
{

  public function __construct(UsersService $service)
  {
      $this->service = $service;
  }

   /**

     * Users Menu API
     *
     * The Purpose of the Users Menu API is to provide registered user details
     *
     * @group Users Menu API
     *
     * @authenticated
     *
     */
    
	public  function getRegisteredUsers(UsersRequest $request) :? JsonResponse
  { 
     try
		{
			$data = $this->service->getRegisteredUsers();
		} 
		catch (CustomModelNotFoundException $exception) 
		{
			return $exception->render($exception);
		}  
      return $this->response(__(trans('user.success')), compact('data'));  
    }
       /**

     * View Users API
     *
     * The Purpose of the View Users API is to provide registered user details
     *
     * @group View Users API
     *
     * @authenticated
     *
     */
    
	public  function viewUser(Request $request,$id) :? JsonResponse
  { 
   
     try
		{
			$data = $this->service->viewUser($id);
      $name = 'ER'.'_'. $data['name'] .'_'. Str::random(6);		
      $pass = Str::random(10);		
      $credentials=[
        'username'=>$name,
        'password'=> $pass
      ];
        
      

    } 
		catch (CustomModelNotFoundException $exception) 
		{
			return $exception->render($exception);
		}  
      return $this->response(__(trans('user.success')), compact('data',"credentials"));  
    }

    public  function getEvent() 
  { 
    $event = $this->service->getEvent();

    $data = [
      'event'  => $event,
    ];
    return $this->response(__(trans('user.success')), compact('data'));
    }

    
    public  function getCustomer() 
  { 
    $customer = $this->service->getCustomer();

    $data = [
      'customer'  => $customer,
    ];
    return $this->response(__(trans('user.success')), compact('data'));
    }

    public  function register(Request $request) 
    { 
      $user = $this->service->register($request);
  
      $data = [
        'event'  => $user,
      ];
      return $this->response(__(trans('user.success')), compact('data'));
      // return view('admin.viewemployee',compact('data'));
      }

      public  function updateUser(Request $request,$id) 
    { 
      $user = $this->service->updateUser($request,$id);

      
      $data = [
        'event'  => $user,
      ];
      return $this->response(__(trans('user.success')), compact('data'));
      // return view('admin.viewemployee',compact('data'));
      }

    public  function approveUser(Request $request,$id) :? JsonResponse
  { 
   
     try
		{
			$data = $this->service->approveUser($id);
		} 
		catch (CustomModelNotFoundException $exception) 
		{
			return $exception->render($exception);
		}  
      return $this->response(__(trans('user.success')), compact('data'));  
     // return view('admin.viewemployee',compact('data'));
    }

    public function emailChecking(Request $request)
    {
      $user = $this->service->checkemail($request);

      $data = [
        "user" =>  $user,
        'Email' => $request->email
      ];
      
      if($user == 1)
      {
        return $this->response(__(trans('user.email_exist')), compact('data'));         
      }
       
      return $this->response(__(trans('user.email_available')), compact('data'));         

      

      
                         
    }
}