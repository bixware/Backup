<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model {
    use HasFactory;

    protected $table = 'tbl_mPages';

    /**
     * Primary id is set to
     *
     * @var string
     */

    protected $primaryKey = 'pageUID';




    protected $fillable = [
        "pageUID",
        "pageName",
        "pageDesc"
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