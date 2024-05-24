<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkFlowFile extends Model
{
    // use HasFactory;
    protected $table = 'tbl_xWorkFlowFiles';
    protected $primaryKey = 'workFlowFileUID';

    public $timestamps = false;
    protected $fillable = [
        'workFlowRequestUID',
        'requestFileName',
        'requestFilePath',
        // 'createdDate', 'modifiedDate'
    ];

    const created_at = "createdDate";
    const updated_at = "modifiedDate";
}
