<?php

namespace App\Http\Livewire\StoreUser\ApprovalProcess;

use App\Traits\HasTabs;
use Livewire\Component;
use App\Interface\UseTabs;
use App\Traits\ParseMonths;
use App\Traits\WithExportDate;
use App\Traits\HasInfinityScroll;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Traits\StreamExcelDownload;
use App\Interface\Excel\SpreadSheet;
use App\Interface\Excel\WithHeaders;
use App\Interface\Excel\WithFormatting;
use App\Interface\Excel\UseExcelDataset;
use App\Traits\UseOrderBy;

class WalletReconProcess extends Component implements WithHeaders, WithFormatting, UseExcelDataset {

    use HasInfinityScroll, HasTabs, ParseMonths, StreamExcelDownload, WithExportDate, UseOrderBy;


    protected $queryString = [
        'activeTab' => ['as' => 'tab'],
        'startDate' => ['as' => 'from', 'except' => ''],
        'endDate' => ['as' => 'to', 'except' => ''],
    ];








    public $activeTab = 'wallet';








    public $startDate = null;







    public $endDate = null;








    public $filtering = false;


    /** f
     * Filenameor export
     * @var string
     */
    public $export_file_name = 'Payment_MIS_Approved_Wallet_Reconciliation';



    public function back() {
        $this->filtering = false;
        $this->emit('resetAll');
        $this->resetExcept(['activeTab']);
    }




    /**
     *Filters
     */
    public function filterDate($request) {
        $this->filtering = true;
        $this->startDate = $request['start'];
        $this->endDate = $request['end'];
    }


    public function formatter(SpreadSheet $worksheet, $dataset): void {

        $worksheet->setStartFrom(7);
        $worksheet->setFilename($this->_useToday($this->export_file_name, now()->format('d-m-Y')));

        $worksheet->spreadsheet->getActiveSheet()->setCellValue('A' . 1, 'Store ID: ' . auth()->user()->main()['Store ID']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('A' . 2, 'Retek Code: ' . auth()->user()->main()['RETEK Code']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('A' . 3, 'Store Type: ' . auth()->user()->main()['StoreTypeasperBrand']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('A' . 4, 'Brand: ' . auth()->user()->main()['Brand Desc']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('D' . 1, 'Region: ' . auth()->user()->main()['Region']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('D' . 2, 'Location: ' . auth()->user()->main()['Location']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('D' . 3, 'City: ' . auth()->user()->main()['City']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('D' . 4, 'State: ' . auth()->user()->main()['State']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('H' . 1, 'Franchisee Name: ' . auth()->user()->main()['franchiseeName']);
        $worksheet->spreadsheet->getActiveSheet()->setCellValue('H' . 2, 'Report Name: ' . 'Cash Reconciliation');
    }


    /**
     * Render main views
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function render() {

        $cashRecon = $this->getData();
        $this->emitTo($this->getName(), 'tabs');

        return view('livewire.store-user.approval-process.wallet-recon-process ', [
            'cashRecons' => $cashRecon
        ]);
    }



    /**
     * Data source
     * @return array
     */
    public function getData() {

        // Parameters to pass to the Query
        $params = [
            'procType' => $this->activeTab,
            'store' => auth()->user()->storeUID,
            'from' => $this->startDate,
            'to' => $this->endDate
        ];

        // Procedure Instance
        return DB::withOrderBySelect(
            storedProcedure: 'PaymentMIS_PROC_SELECT_STOREUSER_Approved_Process_Wallet_Reconciliation :procType, :store, :from, :to',
            params: $params,
            perPage: $this->perPage,
            orderBy: $this->orderBy,

        );
    }

    public function download(string $type = ''): Collection|bool {
        return DB::withOrderBySelect(
            'PaymentMIS_PROC_SELECT_STOREUSER_Approved_Process_Wallet_Reconciliation :procType, :store, :from, :to',
            [
                'procType' => 'export',
                'store' => auth()->user()->storeUID,
                'from' => $this->startDate,
                'to' => $this->endDate
            ],
            $this->perPage,
            $this->orderBy
        );
    }

    public function headers(): array {

        return [
            "Sales Date",
            "Deposit Date",
            "Approved Date",
            "Approved By",
            "Sale Amount",
            "Collection Amount",
            "Difference Amount",
            "Reconciled Amount",
            "Status"


        ];
    }
}
