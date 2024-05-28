<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mGTMTarget extends Model
{
    use HasFactory;


    protected $table = 'P4_GTMTarget';

    protected $primaryKey = 'GTMTargetUID';



    protected $fillable = [
        'SAPCode',
        'storeName',
        'date',
        'day',
        'WKNO',
        'OPNSVTarget',
        'walkins',
        'bills',
        'mensVol',
        'womensVol',
        'totalVol',
        'GSV',
        'MRP',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate'
    ];

    public $timestamps = false;
}