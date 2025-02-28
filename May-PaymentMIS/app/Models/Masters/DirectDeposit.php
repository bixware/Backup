<?php

namespace App\Models\Masters;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectDeposit extends Model {
    use HasFactory;

    protected $table = 'tbl_mDirectDeposit';

    /**
     * Primary id is set to
     *
     * @var string
     */

    protected $primaryKey = 'directDepositUID';



    /***
     * Time stamps
     */
    const CREATED_AT = 'createdDt';

    /***
     * Time stamps
     */
    const UPDATED_AT = 'modifiedDate';



    protected $fillable = [
        "storeID",
        "retekCode",
        "depositSlipNo",
        "amount",
        "directDepositDate",
        "bank",
        "accountNo",
        "bankBranch",
        "location",
        "city",
        "state",
        "salesDateFrom",
        "salesDateTo",
        "cashDepositBy",
        "otherRemarks",
        "reason",
        "depositSlipProof",
        "approvalRemarks",
        "status",
        "createdBy",
    ];

}