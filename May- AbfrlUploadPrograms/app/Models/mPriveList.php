<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mPriveList extends Model
{
    use HasFactory;


    protected $table = 'P7_Privelist';

    protected $primaryKey = 'PriveUID';


    protected $fillable = [
        'store',
        'storeCode',
        'date',
        'phoneNo',
        'name',
        'RM',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate',
    ];

    public $timestamps = false;
}
