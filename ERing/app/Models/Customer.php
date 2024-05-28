<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Customer extends Model
{
    protected $table = "customerType";
	protected $primaryKey = 'custUID';

	protected $fillable = ['customerType','isActive'];
	protected $hidden = [
       
        'createdDate',
    ];
   

    public static function getCustomer()
	{
		return  Customer::where('isActive',1)->get();
    }

}
