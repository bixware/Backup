<?php

namespace App\Http\Livewire\CommercialHead\ApprovalProcess;

use App\Interface\Excel\UseExcelDataset;
use App\Interface\Excel\WithFormatting;
use App\Interface\Excel\WithHeaders;
use App\Interface\UseTabs;
use App\Traits\HasTabs;
use Livewire\Component;
use App\Traits\HasInfinityScroll;
use App\Traits\StreamExcelDownload;
use App\Traits\WithExportDate;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;



class MposReconProcess extends Component implements UseExcelDataset, WithFormatting, WithHeaders {

    use HasInfinityScroll, HasTabs, WithExportDate;


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
     * Filename for Excel Export
     * @var string
     */
    public $export_file_name = 'Payment_MIS_Approved_Process_Cash_Reconciliation';



    /**
     * Display the Back arrow for filtering items
     * @var 
     */
    public $filtering = false;






    /**
     * Store id filter for cash mis
     * @var array
     */
    public $storesM = [];






    /**
     * Store FIlter Dataset
     * @var string
     */
    public $store = '';








    /**
     * Initialize the filters
     * @return void
     */
    public function mount() {
        $this->resetExcept('activeTab');
        $this->storesM = $this->filters('main');
        // $this->codesM = $this->filters('main', 'codes');
    }





    /**
     * return filtered datasets
     * @param mixed $type
     * @return mixed
     */
    public function filters(string $tab = 'cash', string $type = 'stores') {
        return DB::select('PaymentMIS_PROC_COMMERCIALHEAD_SELECT_Tracker_Process_Filters :procType', [
            'procType' => 'mpos-' . $tab . '-' . $type,
        ]);
    }




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


    public function export() {

        $data = $this->download('');
        $headers = $this->headers();


        if (count($data) < 1) {
            $this->emit('no-data');
            return false;
        }



        $filePath = public_path() . '/' . $this->export_file_name . '.csv';
        $file = fopen($filePath, 'w'); // open the filePath - create if not exists

        

        fputcsv($file, $headers); // adding headers to the excel

        foreach ($data as $row) {
            $row = (array) $row;
            fputcsv($file, $row);
        }

        fclose($file);

        return response()->stream(
            function () use ($filePath) {
                echo file_get_contents($filePath);
            },
            200,
            [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment;filename="' . $this->export_file_name . '"',
            ]
        );
    }

    public function download($value = ''): Collection|bool {

        // Parameters to pass to the Query
        $params = [
            'procType' => 'export',
            'storeId' => $this->store,
            'from' => $this->startDate,
            'to' => $this->endDate
        ];

        // Procedure Instance
        return DB::infinite(
            storedProcedure: 'PaymentMIS_PROC_SELECT_COMMERCIALHEAD_Tracker_MPOS_Reconciliation_Approved_Process :procType, :storeId, :from, :to',
            params: $params,
            perPage: $this->perPage
        );
    }



    public function headers(): array {
        return [
            "Sales Date",
            "Deposit Date",
            "Store ID",
            "Retek Code",
            "Brand Name",
            "Tender to BankDrop",
            "Tender to BankMIS",
            "Bank Drop ID",
            "Deposit SlipNo",
            "Tender Amount",
            "BankDrop Amount",
            "Deposit Amount",
            "Tender BankDrop Diff [Tender - BankDrop]",
            "Tender to CashMIS Diff [Tender - Deposit]",
            "Approved By",
            "Approval Date",
            "Recon Status",
            "Store Respons Entry",
            "Recon Difference",
            "Process Date",
            "Approval Remarks",


        ];
    }

    /**
     * Formatter
     * @param \App\Interface\Excel\SpreadSheet $spreadSheet
     * @param mixed $dataset
     * @return void
     */
    public function formatter(\App\Interface\Excel\SpreadSheet $spreadSheet, $dataset): void {
        $spreadSheet->setStartFrom(1);
        $spreadSheet->setFilename($this->_useToday($this->export_file_name, now()->format('d-m-Y')));
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

        return view('livewire.commercial-head.approval-process.mpos-recon-process ', [
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
            'storeId' => $this->store,
            'from' => $this->startDate,
            'to' => $this->endDate
        ];

        // Procedure Instance
        return DB::infinite(
            storedProcedure: 'PaymentMIS_PROC_SELECT_COMMERCIALHEAD_Tracker_MPOS_Reconciliation_Approved_Process :procType, :storeId, :from, :to',
            params: $params,
            perPage: $this->perPage
        );
    }
}
