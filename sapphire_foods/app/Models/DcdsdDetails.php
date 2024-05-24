<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DcdsdDetails extends Model
{
    use HasFactory;

    protected $table = "tbl_mDcdsd";
    protected $primaryKey = 'dcdsdUID';
    public $timestamps = false;

    protected $fillable = [
        'Name',
        'isActive'
    ];
}
