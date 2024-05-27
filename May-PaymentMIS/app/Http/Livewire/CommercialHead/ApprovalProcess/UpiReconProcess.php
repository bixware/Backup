<?php

namespace App\Http\Livewire\CommercialHead\ApprovalProcess;

use App\Interface\Excel\UseExcelDataset;
use App\Interface\Excel\WithFormatting;
use App\Interface\Excel\WithHeaders;
use App\Interface\UseTabs;
use App\Traits\HasTabs;
use Livewire\Component;
use App\Traits\HasInfinityScroll;
use Illuminate\Support\Facades\DB;
use App\Traits\StreamExcelDownload;
use App\Traits\WithExportDate;
use Illuminate\Support\Collection;



class UpiReconProcess extends Component implements UseExcelDataset, WithFormatting, WithHeaders {

    use HasInfinityScroll, HasTabs, WithExportDate;


    protected $queryString = [
        'activeTab' => ['as' => 'tab'],
        'startDate' => ['as' => 'from', 'except' => ''],
        'endDate' => ['as' => 'to', 'except' => ''],
    ];



    public $activeTab = 'upi';






    public $startDate = null;






    public $endDate = null;



    /**
     * Filename for Excel Export
     * @var string
     */
    public $export_file_name = 'Payment_MIS_Approved_Process_UPI_Reconciliation';







    public $filtering = false;






    /**
     * Store Id filter for card mis
     * @var array
     */
    public $card_stores = [];






    public $store = '';







    public function mount() {
        $this->resetExcept('activeTab');
        $this->card_stores = $this->filters('upi');
    }





    /**
     * return filtered datasets
     * @param mixed $type
     * @return mixed
     */
    public function filters(string $tab = 'cash', string $type = 'stores') {
        return DB::select('PaymentMIS_PROC_COMMERCIALHEAD_SELECT_Tracker_Process_Filters :procType', [
            'procType' => 'sap-' . $tab . '-' . $type,
        ]);
    }



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





    /**
     * Render main views
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function render() {

        $cashRecon = $this->getData();

        return view('livewire.commercial-head.approval-process.upi-recon-process ', [
            'cashRecons' => $cashRecon
        ]);
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
            'procType' => "export",
            'store' => $this->store,
            'from' => $this->startDate,
            'to' => $this->endDate
        ];

        // Procedure Instance
        return DB::infinite(
            storedProcedure: 'PaymentMIS_PROC_SELECT_COMMERCIALHEAD_Tracker_UPI_Reconciliation_Approved_Process :procType, :store, :from, :to',
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
            "Brand",
            "Collection Bank",
            // "Location",
            "Status",
            "Store UPI Sale",
            "Deposit Amount",
            "Difference",
            "Approved Date",
            "Approved By",
            // "Sale Reco Difference Amount",
            "Recon Status",
            "Store Respons Entry",
            "Recon Difference",
            "Process Date",
            "Approval Remarks"
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
     * Data source
     * @return array
     */
    public function getData() {

        // Parameters to pass to the Query
        $params = [
            'procType' => $this->activeTab,
            'store' => $this->store,
            'from' => $this->startDate,
            'to' => $this->endDate
        ];

        // Procedure Instance
        return DB::infinite(
            storedProcedure: 'PaymentMIS_PROC_SELECT_COMMERCIALHEAD_Tracker_UPI_Reconciliation_Approved_Process :procType, :store, :from, :to',
            params: $params,
            perPage: $this->perPage
        );
    }
}
