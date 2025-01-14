<?php

namespace App\Exports\CommercialHead\Process;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SAPProcessExport implements FromCollection, WithHeadings {



    public function __construct(
        public Collection $data,
        public string $type
    ) {
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection() {
        return $this->data;
    }



    public function headings(): array {

        if ($this->type == 'wallet') {
            return [
                'walletSalesRecoUID',
                'exDepDate',
                'amount',
                'pickupBank',
                'createdBy',
                'storeID',
                'retekCode',
                'brand',
                'locationstore',
                'Store Name',
                'depositAmount',
                'cashDirectDep',
                'diffSaleDeposit',
                'status',
                'adjAmount'
            ];
        }


        return [
            'CardSalesRecoUID',
            'ExDepDate',
            'Amount',
            'PickupBank',
            'CreatedBy',
            'StoreID',
            'RetekCode',
            'Brand',
            'Locationstore',
            'Store Name',
            'DepositAmount',
            'CashDirectDep',
            'DiffSaleDeposit',
            'Status',
            'ReconStatus',
            'AdjAmount'
        ];
    }
}
