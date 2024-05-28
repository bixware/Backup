<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mStaffCommunication extends Model
{
    use HasFactory;


    protected $table = 'P5_StaffCommunication';

    protected $primaryKey = 'StaffComUID';


    protected $fillable = [
        'storeCode',
        'newStoreCode',
        'brand',
        'name',
        'storeNorms',
        'storeManager',
        'storeCrew',
        'coach',
        'ASM',
        'PRM',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate'
    ];

    public $timestamps = false;
}
