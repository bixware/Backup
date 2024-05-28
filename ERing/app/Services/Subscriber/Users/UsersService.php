<?php

declare(strict_types=1);

namespace App\Services\Subscriber\Users;

//Enums
use App\Enums\ReturnCode;
use App\Enums\ReturnMessage;

//Models
use App\Models\User;
use App\Models\Event;

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

	public static function register($request)
	{

		$user = new User();

		$user->name = $request->input('name');
		$user->email = $request->input('email');
		$user->mobile = $request->input('contact');
		$user->company_name = $request->input('company');
		$user->event_type = $request->input('event');
		$user->subscription = $request->input('subscription');
		$user->address = $request->input('address');
		$user->status = $request->input('status');
		$user->save();
		
        $id= User::max('roleUID');

		return  User::where('roleUID','=',$id)->first();

		
	}

	public static function updateUser($request ,$id)
	{
		$company_name = $request->input('company');
		$event_type = $request->input('event');
		$subscription = $request->input('subscription');
		$address = $request->input('address');
		$username = $request->input('username');
		$password = $request->input('password');
		 User::where('roleUID',$id)->update([
			'company_name' => $company_name,
			'event_type' => $event_type,
			'subscription' => $subscription,
			'address' => $address,
			'username' => $username,
			'password' => $password,
			'status' => 1
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
	   \Mail::to($request['email'])->send(new \App\Mail\SendMail($request));
   

		return  User::where('roleUID','=',$id)->get();
		
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
