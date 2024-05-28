<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mFranchisee extends Model
{
    use HasFactory;


    protected $table = 'Franchisee';

    protected $primaryKey = 'UID';



    protected $fillable = [
        'storeCode',
        'vendorCode',
        'franchiseeName',
        'franchiseeDOB',
        'FOFOCompanyName',
        'franchiseePrimaryPhno',
        'franchiseeSecondarPhno',
        'FOFOEmailId',
        'FOFOAddress',
        'filename',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate'
    ];

    public $timestamps = false;
}
