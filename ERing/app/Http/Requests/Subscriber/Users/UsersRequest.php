<?php
declare(strict_types=1);

// Request
namespace App\Http\Requests\Subscriber\Users;
use App\Http\Requests\BaseRequest;

class UsersRequest extends BaseRequest
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
            
            ];
    }
	
 public function messages()
    {
        return [
		   
        ];
    }

    
}


