<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mCrewTarget extends Model
{
    use HasFactory;


    protected $table = 'P2_CrewTarget';

    protected $primaryKey = 'CrewTargetUID';


    protected $fillable = [
        'storeCode',
        'salesPersonCode',
        'employeeId',
        'crewStaffName',
        'coachName',
        'date',
        'NSV',
        'brandCode',
        'runningAverageMix',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate'
    ];

    public $timestamps = false;
}