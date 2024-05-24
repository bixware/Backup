<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowStage extends Model
{
    use HasFactory;

    protected $table = "tbl_mWorkFlowStage";
    protected $primaryKey = 'workFlowStageUID';

    public $timestamps = false;

    protected $fillable = [
        'workFlowUID',
        'workFlowName',
        'stageNo',
        'stageName',
        'businessUnitUID',
        'businessUnitName',
        'approveID',
        'approveName',
        'rejectID',
        'rejectName',
        'previousStageNo',
        'nextStageNo',
        'mailSubject',
        'isActive'

    ];

    public function businessunit()
    {
        return $this->belongsTo(BusinessUnit::class, 'businessUnitUID', 'businessUnitUID');
    }

    public static function generateApprovalID()
    {
        $lastStage = WorkflowStage::orderBy('approveID', 'desc')->first();

        if ($lastStage->rejectID == null) {
            $lastApprovalID = $lastStage->approveID;

            $newApprovalID = $lastApprovalID + 1;
        } else if ($lastStage->rejectID) {
            $lastApprovalID = $lastStage->approveID;
            $newApprovalID = $lastApprovalID + 2;
        } else {
            $newApprovalID = 1;
        }

        return $newApprovalID;
    }
}
