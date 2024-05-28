<?php

declare(strict_types=1);

namespace App\Services\Subscriber\Login;

//Models
use App\Models\User;

// Request
use Illuminate\Http\Request;
//Controller
use App\Http\Controllers\Controller;
//Facades
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class LoginService
{
    public static function getUserByUserName($userName)
    {
        $details=User::where('userName','=',$userName)->first();
        return $details;
    }   
}
