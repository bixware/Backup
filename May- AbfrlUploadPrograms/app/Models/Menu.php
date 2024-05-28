<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $table = 'tbl_mMenu';

    /**
     * Primary id is set to
     *
     * @var string
     */

    protected $primaryKey = 'menuUID';




    protected $fillable = [
        "menuUID",
        "userUID",
        "menuName",
        "menuURL",
        "menuclass",
        "menuIcon",
        "menuTitle",
        "parentMenu",
        "isActive",
        "createdBy"
    ];



    /***
     * Time stamps
     */
    const CREATED_AT = 'createdDate';

    /***
     * Time stamps
     */
    const UPDATED_AT = 'modifiedDate';
}