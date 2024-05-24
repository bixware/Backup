<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlow extends Model
{
    use HasFactory;
    protected $table = "tbl_mWorkFlow";
    protected $primaryKey = 'workFlowUID';
    public $timestamps = false;

    protected $fillable = [
        'workFlowName',
        'noOfStage',
        'isActive'
    ];

    public function otherTable()
    {
        return $this->hasMany(WorkFlowStageUser::class, 'workFlowUID', 'workFlowUID');
    }
}
