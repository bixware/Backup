<?php
declare(strict_types=1);
namespace App\Http\Controllers\API\Admin\Dashboard;

//Request
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Dashboard\DashboardRequest;

// Response
use Illuminate\Http\JsonResponse;

//Controller
use App\Http\Controllers\Controller;

//Services
use App\Services\Admin\Dashboard\DashboardService;

use App\Models\User;


class DashboardController extends Controller
{

  public function __construct(DashboardService $service)
  {
      $this->service = $service;
  }

   /**

     * Dashboard API
     *
     * The Purpose of the Dashboard API is to provide system config details of the console
     *
     * @group Dashboard API
     *
     * @authenticated
     *
     */
    
	public  function dashboard(DashboardRequest $request) :? JsonResponse
  { 
    $Users = User::getRegisteredUsers();

       $data = [
       'dasboard'=> [[
          "Title" => "Available Events",
          "value" => "5",
        ],
        [

          "Title" => "Upcoming Events",
          "value" => "7",

        ],
        [
          "Title" => "Completed Events",
          "value" => "15",
        ],
        [
          "Title" => "Number of Users",
          "value" => count($Users),
        ]]

             
                ];
       return $this->response(__(trans('dashboard.success')), compact('data'));  
    }

     /**

     * Menu API
     *
     * The Purpose of the Menu API is to list all the menus
     *
     * @group Dashboard API
     *
     * @authenticated
     *
     */

    public  function getMenu(Request $request) :? JsonResponse
    {
      $roleid=auth()->user()->roleUID;
      if($roleid==1)
      {
        $logout = '#/admin/logout';
      }
      if($roleid == 2)
      {
        $logout = '#/subscriber/logout';
      }
      $menu= $this->service->getMenu($roleid);
      $data = [
      'footer' => [
        [
          "menuName" => "About Us",
          "menuURL" => "/",
        ],
        [

          "menuName" => "Help",
          "menuURL" => "/",

        ],
        [
          "menuName" => "Contact Us",
          "menuURL" => "/",
        ],
      
      ],
      'menu'=>$menu,
      'logout' => $logout
    ];
              
         return $this->response(__(trans('dashboard.success')), compact('data'));  
      }
}