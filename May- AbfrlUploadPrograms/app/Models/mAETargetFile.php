<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mAETargetFile extends Model
{
    use HasFactory;


    protected $table = 'P3_AETargetFile';

    protected $primaryKey = 'AETargetUID';


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