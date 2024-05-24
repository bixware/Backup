<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowStageUser extends Model
{
    use HasFactory;
    protected $table = "tbl_mWorkFlowStageUser";
    protected $primaryKey = 'workFlowStageUserUID';

    public $timestamps = false;

    protected $fillable = [
        'workFlowUID',
        'workFlowName',
        'workFlowStageUID',
        'stageNo',
        'stageName',
        'businessUnitUID',
        'businessUnitName',
        'userUID',
        'userName',
        'userEmail',
        'approveID',
        'approveName',
        'rejectID',
        'rejectName'
    ];

    public function workFlow()
    {
        return $this->belongsTo(WorkFlow::class, 'workFlowUID', 'workFlowUID');
    }
}
