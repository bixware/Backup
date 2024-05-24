<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowRemarksFile extends Model
{
    use HasFactory;
    protected $table = "tbl_xWorkFlowRemarksFiles";
    protected $primaryKey = 'workFlowRemarksUID';

    public $timestamps = false;

    protected $fillable = [
        'userUID',
        'workFlowRequestUID',
        'workFlowUID',
        'workFlowStageUID',
        'remarksFileName'
    ];
}
