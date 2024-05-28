<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Log;
use DB;

class MMenu extends Model
{
   
	protected $table = "tbl_mMenu";
	protected $primaryKey = 'menuUID';

	protected $fillable = ['menuName','menuURL','menuIcon','isActive'];

    public static function getMenu($id)
	{
        return MMenu::join('xUserMenu','xUserMenu.menuUID','=','tbl_mMenu.menuUID')
        ->where('xUserMenu.userUID',$id)
        ->where('tbl_mMenu.isActive',1)
        ->get();
           
        } 
		
	}



