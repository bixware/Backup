<?php

declare(strict_types=1);

namespace App\Services\Admin\Users;

//Enums
use App\Enums\ReturnCode;
use App\Enums\ReturnMessage;

//Models
use App\Models\User;
use App\Models\Event;
use App\Models\Customer;

use Illuminate\Database\Eloquent\Collection;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

use Log;
class UsersService
{
    public  function getRegisteredUsers()
	{
         return User::getRegisteredUsers();
	}

    public  function viewUser($id)
	{
        return User::viewUser($id);
		
	}

	public static function getEvent():? Collection
	{
        return  Event::getEvent();
		
	}

	public static function getCustomer():? Collection
	{
        return  Customer::getCustomer();
		
	}

	public static function register($request)
	{

		$user = new User();

		$user->Name = $request->input('name');
		$user->Email = $request->input('email');
		$user->Mobile = $request->input('contact');
		$user->companyName = $request->input('company');
		$user->eventCount = $request->input('event');
		$user->custUID = $request->input('custUID');
		$user->Address = $request->input('address');
		$user->Status = $request->input('status');
		$user->roleUID = 2;
		$user->save();
		
        $id= User::max('userUID');

		$mail = new PHPMailer(true);
		$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
		$mail->isSMTP();                                            //Send using SMTP
		$mail->Host       = env('MAIL_HOST');                     //Set the SMTP server to send through
		$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
		$mail->Username   = env('MAIL_USERNAME');                     //SMTP username
		$mail->Password   = env('MAIL_PASSWORD');                               //SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
		$mail->Port       = env('MAIL_PORT');                           // port - 587/465
  
		  //Recipients
	   $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
	  // $mail->addAddress('shanmugakani@bixware.com', 'Backiraj');
	   $mail->SMTPDebug = 0;
  
	   //Content
	   $mail->isHTML(true);                                  //Set email format to HTML

  
	 
	   \Mail::to($request['email'])->send(new \App\Mail\userRegisterMail($request));
   


		return  User::where('userUID','=',$id)->first();

		
	}

	public static function updateUser($request ,$id)
	{
		$company_name = $request->input('company');
		$event = $request->input('event');
		$custUID = $request->input('custUID');
		$address = $request->input('address');
		$username = $request->input('username');
		$password = $request->input('password');
		 User::where('userUID',$id)->update([
			'companyName' => $company_name,
			'eventCount' => $event,
			'custUID' => $custUID,
			'Address' => $address,
			'userName' => $username,
			'Password' => $password,
			'Status' => 1
		 ]);

		$mail = new PHPMailer(true);
		$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
		$mail->isSMTP();                                            //Send using SMTP
		$mail->Host       = env('MAIL_HOST');                     //Set the SMTP server to send through
		$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
		$mail->Username   = env('MAIL_USERNAME');                     //SMTP username
		$mail->Password   = env('MAIL_PASSWORD');                               //SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
		$mail->Port       = env('MAIL_PORT');                           // port - 587/465
  
		  //Recipients
	   $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
	  // $mail->addAddress('shanmugakani@bixware.com', 'Backiraj');
	   $mail->SMTPDebug = 0;
  
	   //Content
	   $mail->isHTML(true);                                  //Set email format to HTML
  
	   Log::Info("OTP details of user to login");
	   Log::Info($request);
  
	   //$mail->Subject = 'Mail From Bixware';
	  // $mail->Body    = 'OTP message';
	 //  $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
	   \Mail::to($request['email'])->send(new \App\Mail\userRegisterMail($request));
   

		return  User::where('userUID','=',$id)->get();
		
	}

	public  function approveUser($id)
	{
        $Users = User::approveUser($id);
		if($Users)
		{
			 $data['return_code']=ReturnCode::Success;
			 $data['err_message']="";
			 $data['success_message']=ReturnMessage::SuccessMsg;
			 $data['data']=$Users;
		}
		else
		{
			 $data['return_code']=ReturnCode::Failure;  
			 $data['err_message']=ReturnMessage::FailureMsg;
		}
		return $data;
	}

	public static function checkEmail($request)
	{
        return  User::checkEmail($request);
		
	}

}
