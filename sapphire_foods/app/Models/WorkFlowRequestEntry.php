<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowRequestEntry extends Model
{
    use HasFactory;
    protected $table = 'tbl_tWorkFlow';
    protected $primaryKey = 'workFlowRequestUID';

    public $timestamps = false;
    protected $fillable = [
        'requestNo',
        'brandUID',
        'brand',
        'workFlowUID',
        'workFlowName',
        'categoryUID',
        'category',
        'dcdsdUID',
        'dcdsdName',
        'vendorCode',
        'vendorDescription',
        'materialCode',
        'description',
        'fromDate',
        'toDate',
        'workFlowStageUID',
        'workFlowStageName',
        'currentStageUserID',
        'nextStageUserID',
        'approvalStatus',
        'Remarks',
        'createdBy',
        'isActive'

    ];

    public function uploadFile()
    {
        return $this->hasMany(WorkFlowFile::class, 'workFlowRequestUID', 'workFlowRequestUID');
    }

    public function remarksFile()
    {
        return $this->hasMany(WorkFlowRemarksFile::class, 'workFlowRequestUID', 'workFlowRequestUID');
    }

    public function statusRemarks()
    {
        return $this->hasMany(WorkFlowStatusRemarks::class, 'workFlowRequestUID', 'workFlowRequestUID');
    }

    public function noOfStage()
    {
        return $this->hasOne(WorkFlow::class, 'workFlowUID', 'workFlowUID');
    }
}
