<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;


    protected $table = 'tbl_tInvoiceDetails';

    protected $primaryKey = 'invoiceUID';


    protected $fillable = [
        'invoiceNo',
        'storeCode',
        'storeName',
        'landlordName',
        'landlordUserUID',
        'amount',
        'invoiceDate',
        'month',
        'year',
        'publishedDate',
        'invoiceFileName',
        'invoiceFilePath',
        'filename',
        'filePath',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate',
        'userUID'

    ];

    public $timestamps = false;
}
