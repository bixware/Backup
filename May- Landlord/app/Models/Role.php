<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model {
    use HasFactory;

    protected $table = 'tbl_mRole';

    /**
     * Primary id is set to
     *
     * @var string
     */



    protected $fillable = [
        "roleName",
        "roleUID",
        "isActive"
    ];

    protected $primaryKey = 'roleUID';

    /***
     * Time stamps
     */
    const CREATED_AT = 'createdDate';

    /***
     * Time stamps
     */
    const UPDATED_AT = 'modifiedDate';

}