<?php
declare(strict_types=1);

// Request
namespace App\Http\Requests\Admin\Login;
use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;


class LoginRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
 public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
 public function rules()
    {
		 return  [
            'userName' => 'required|string|max:255',
            'password' => 'required|string|min:6|max:255',
            ];
    }
	
 public function messages()
    {
        return [
		   'userName.required' => __('logincustomer.userName.required'),
           'userName.string' => __('logincustomer.userName.string'),
           'userName.max' => __('logincustomer.userName.max'),
		   'password.required' => __('logincustomer.password.required'),
           'password.string' => __('logincustomer.password.string'),
           'password.min' => __('logincustomer.password.min'),
           'password.max' => __('logincustomer.password.max'),
        ];
    }

    
}


