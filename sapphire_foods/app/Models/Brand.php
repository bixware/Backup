<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    // use HasFactory;
    protected $table = "tbl_mBrand";
    protected $primaryKey = 'brandUID';
    public $timestamps = false;

    protected $fillable = [
        'cosePriceUpdateUID',
        'fileName',
        'filePath'
    ];

    public function workflows()
    {
        return $this->hasMany(Workflow::class, 'businessUnitUID', 'businessUnitUID');
    }
}
