<?php

namespace App\Models\Process\Cash;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CashBankReconApproval extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'MFL_Outward_MPOSCashBankMISSalesReco_ApprovalProcess';


    /**
     * Table primary key
     * @var string
     */

    protected $primaryKey = 'mposCashBankMISSalesRecoUID';




    /**
     * Set the Fillable to prevent mass assignment
     * @var array
     */
    protected $fillable = [
        //
    ];


    /**
     * Relations: Process
     * @description
     * Has Many Process Records Items
     * @return void
     */
    public function process(): BelongsTo {
        return $this->belongsTo(CashBankRecon::class, 'mposCashBankMISSalesRecoUID', 'mposCashBankMISSalesRecoUID');
    }
}