<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mRunningAvgMix extends Model
{
    use HasFactory;


    protected $table = 'P6_RunningAvgMix';

    protected $primaryKey = 'AVGUID';


    protected $fillable = [
        'storeCode',
        'employeeId',
        'crewStaffName',
        'runningAverageMix',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate',
    ];

    public $timestamps = false;
}
