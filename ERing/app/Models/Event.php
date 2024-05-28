<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Event extends Model
{
    protected $table = "eventmaster";
	protected $primaryKey = 'id';

	protected $fillable = ['eventID','eventName','isActive'];

   

    public static function getEvent()
	{
		return  Event::where('isActive',1)->get();
    }

}
