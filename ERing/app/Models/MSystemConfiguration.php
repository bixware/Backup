<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Log;
use DB;

class MSystemConfiguration extends Model
{
   
	protected $table = "mSystemConfiguration";
	protected $primaryKey = 'sysConfigUID';

	protected $fillable = ['configName','configValue','configDescription','helpText','roleUID','isActive', 'createdBy', 'createdDate', 'modifiedBy', 'modifiedDate'];

    const UPDATED_AT = 'modifiedDate';
	const CREATED_AT = 'createdDate';
	
	public static function getDescription()
	{
		$details=MSystemConfiguration::where('isActive',1)->get();
		log::info($details);
	    return $details;
    }	

}
