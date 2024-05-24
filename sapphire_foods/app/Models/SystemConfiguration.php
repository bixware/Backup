<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemConfiguration extends Model
{
    use HasFactory;

    protected $table = "tbl_mSystemConfiguration";
    protected $primaryKey = 'sysConfigUID';
    public $timestamps = false;

    protected $fillable = [
        'configValue'
    ];
}
