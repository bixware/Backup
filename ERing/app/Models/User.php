<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $primaryKey = 'userUID';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
       
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    const UPDATED_AT = 'ModifiedDate';
	
	const CREATED_AT = 'createdDate';

    public static function getUserByUserName($userName)
    {
        $details=User::where('Email','=',$userName)->first();
        return $details;
    }   
    

    
     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

     /**
     * Return a key value array, containing Registered user details.
     *
     * @return array
     */
    public static function getRegisteredUsers()
	{
		return User::leftjoin('customerType','customerType.custUID','=','users.custUID')
        ->select('customerType.customerType as customerType','users.*')
        ->orderBy('userUID', 'DESC')->get();
    }
    /**
     * Return a key value array, containing user details.
     *
     * @return array
     */
    public static function viewUser($id)
	{
		return  User::leftjoin('customerType','customerType.custUID','=','users.custUID')
        ->select('customerType.customerType as customerType','users.*')
        ->where('userUID','=',$id)->first();
    }

    public static function approveUser($id)
	{
        return User::where('userUID',$id)->update(['status' => 1]);
    }

    public static function checkEmail($request)
    {
        $user_exits =  User::where('Email', '=', $request->email)->count();

        return $user_exits;
    }   
    
}
