<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowStatusRemarks extends Model
{
    use HasFactory;
    protected $table = "tbl_xWorkFlowStatusRemarks";
    protected $primaryKey = 'workFlowStatusUID';

    public $timestamps = false;

    protected $fillable = [
        'workFlowRequestUID',
        'workFlowStageUID',
        'workFlowStageName',
        'status',
        'statusDescription',
        'remarks',
        'isActive',
        'createdBy',
        'createdDate'
    ];
}
