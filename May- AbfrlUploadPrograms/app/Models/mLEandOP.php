<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mLEandOP extends Model
{
    use HasFactory;


    protected $table = 'P1_leop';

    protected $primaryKey = 'leopUID';


    protected $fillable = [
        'storeCode',
        'storeName',
        'date',
        'OP',
        'LE',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate',
    ];

    public $timestamps = false;
}
