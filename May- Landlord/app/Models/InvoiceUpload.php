<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceUpload extends Model
{
    use HasFactory;


    protected $table = 'tbl_mInvoiceUpload';

    protected $primaryKey = 'invoiceFileUID';


    protected $fillable = [
        'invoiceMonth',
        'invoiceYear',
        'invoiceMonthFileName',
        'invoiceFilePath',
        'isPublished',
        'publishedDate',
        'isActive',
        'createdBy',
        'createdDate',
        'modifiedBy',
        'modifiedDate',
        'userUID'

    ];

    public $timestamps = false;
}