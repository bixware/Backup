<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessUnit extends Model
{
    // use HasFactory;

    protected $table = "tbl_mBusinessUnit";
    protected $primaryKey = 'businessUnitUID';
    public $timestamps = false;

    protected $fillable = [
        'businessUnitName',
        'isActive'
    ];

    public function workflows()
    {
        return $this->hasMany(Workflow::class, 'businessUnitUID', 'businessUnitUID');
    }
}
