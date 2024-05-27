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

class MposReconProcess extends Component implements WithHeaders, WithFormatting, UseExcelDataset {

    use HasInfinityScroll, HasTabs, ParseMonths, StreamExcelDownload, WithExportDate, UseOrderBy;


    /**
     * Show Query string
     * @var array
     */
    protected $queryString = [
        'activeTab' => ['as' => 'tab']
    ];



    /**
     * (Main) Display tab
     * @var string
     */
    public $activeTab = 'main';





    /**
     * From date for filter
     * @var 
     */
    public $startDate = null;





    /**
     * To date for filter
     * @var 
     */
    public $endDate = null;







    /**
     * Display the Back arrow for filtering items
     * @var 
     */
    public $filtering = false;


    /** f
     * Filenameor export
     * @var string
     */
    public $export_file_name = 'Payment_MIS_Approved_Cash_Reconciliation';


    /**
     * Apply filters
     * @param mixed $request
     * @return void
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
     * Go Back 
     * @return void
     */
    public function back() {
        $this->filtering = false;
        $this->emit('resetAll');
        $this->resetExcept(['activeTab']);
    }





    /**
     * Render main views
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function render() {
        $cashRecon = $this->getData();

        return view('livewire.store-user.approval-process.mpos-recon-process ', [
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
            'storeId' => auth()->user()->storeUID,
            'from' => $this->startDate,
            'to' => $this->endDate
        ];

        // Procedure Instance
        return DB::withOrderBySelect(
            storedProcedure: 'PaymentMIS_PROC_SELECT_STOREUSER_Approved_Process_MPOS_Reconciliation :procType, :storeId, :from, :to',
            params: $params,
            perPage: $this->perPage,
            orderBy: $this->orderBy,

        );
    }


    public function download(string $type = ''): Collection|bool {
        return DB::withOrderBySelect(
            'PaymentMIS_PROC_SELECT_STOREUSER_Approved_Process_MPOS_Reconciliation :procType, :storeId, :from, :to',
            [
                'procType' => 'export',
                'storeId' => auth()->user()->storeUID,
                'from' => $this->startDate,
                'to' => $this->endDate
            ],
            $this->perPage,
            $this->orderBy,
        );
    }

    public function headers(): array {

        return [
            "Sales Date",
            "Deposit Date",
            "Bank Drop ID",
            "Deposit SlipNo",
            "Tender Amount",
            "Deposit Amount",
            "Tender to CashMIS Diff [Tender-Deposit]",
            "Reconciled Amount",
            "Status",
        ];
    }
}
