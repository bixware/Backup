<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mSeasonPlan extends Model
{
    use HasFactory;


    protected $table = 'P9_SeasonPlan';

    protected $primaryKey = 'SeasonUID';


    protected $fillable = [
        'storeCode',
        'SAPCode',
        'storeName',
        'month',
        'day',
        'WKNo',
        'storeTGT',
        'TCMBDepartment',
        'departMentTGT',
        'subBrand',
        'subBrandTGT',
        'monthYear',
        'class',
        'classTGT',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate'
    ];

    public $timestamps = false;
}
