<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mStoreTarget extends Model
{
    use HasFactory;


    protected $table = 'P8_StoreTarget';

    protected $primaryKey = 'StoreTargetUID';


    protected $fillable = [
        'storeId',
        'SMName',
        'RMName',
        'date',
        'NSV',
        'brandCode',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate',
    ];

    public $timestamps = false;
}