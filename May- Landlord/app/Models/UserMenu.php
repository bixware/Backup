<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMenu extends Model {
    use HasFactory;

    /**
     * Table name on the BD
     * @var string
     */
    protected $table = 'xUserMenu';



    protected $fillable = [
        "roleName",
        "isActive",
        "userUID",
        "menuUID",
        "roleUID",
        "menuOrder",
    ];



    /**
     * Time stamps
     * @var string
     */
    const CREATED_AT = 'createdDate';

    /**
     * Time stamps
     * @var string
     */
    const UPDATED_AT = 'modifiedDate';
}