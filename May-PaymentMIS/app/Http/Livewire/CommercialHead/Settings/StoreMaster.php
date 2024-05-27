<?php

namespace App\Http\Livewire\CommercialHead\Settings;

use App\Models\Store;
use App\Traits\HasInfinityScroll;
use Carbon\Carbon;
use DateException;
use DateTime;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\TemporaryUploadedFile;
use Livewire\WithFileUploads;


class StoreMaster extends Component
{

    use HasInfinityScroll, WithFileUploads;




    /**
     * File for Upload 
     * @var 
     */
    public $file = null;



    /**
     * File for import 
     * @var 
     */
    public $importFile = null;



    /**
     * Validation rules
     * @var array
     */
    protected $rules = [
        'file' => 'required|file|mimes:csv,xlsx|max:10240',
        'importFile' => 'required|file|mimes:csv,xlsx|max:10240'
    ];





    /**
     * Validating file upload
     * @param \Livewire\TemporaryUploadedFile $request
     * @return void
     */
    public function updatedImportFile(TemporaryUploadedFile $request)
    {
        $this->validateOnly('importFile');
    }



    /**
     * Validating file upload
     * @param \Livewire\TemporaryUploadedFile $request
     * @return void
     */
    public function updatedFile(TemporaryUploadedFile $request)
    {
        $this->validateOnly('file');
    }



    /**
     * File Upload
     * @return bool
     */
    public function importUploadFile()
    {

        $this->validateOnly('importFile');
        $this->importFile->storeAs(path: 'Upload/StoreMaster/Uploaded', name: $this->importFile->getClientOriginalName());

        $targetPath = storage_path('app/public/Upload/StoreMaster/Uploaded/') . $this->importFile->getClientOriginalName();

        // find the file type
        $inputFileTypeIdentify = \PhpOffice\PhpSpreadsheet\IOFactory::identify($targetPath);
        $inputFileTypeFormat = ucwords($inputFileTypeIdentify);

        // creating a reader for the provided filetype
        if ($inputFileTypeFormat == 'csv' || $inputFileTypeFormat == 'CSV' || $inputFileTypeFormat == 'Csv') {
            $inputFileType = 'Csv';
        } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'XLS' || $inputFileTypeFormat == 'Xls') {
            $inputFileType = 'Xls';
        } else if ($inputFileTypeFormat == 'xlsx' || $inputFileTypeFormat == 'XLSX' || $inputFileTypeFormat == 'Xlsx') {
            $inputFileType = 'Xlsx';
        }

        // main reader
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputFileType);
        $reader->setReadDataOnly(true);
        $reader->setReadEmptyCells(false);

        // loading the file
        $spreadsheet = $reader->load($targetPath);
        $worksheet = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
        $arrayCount = count($worksheet);

        try {

            DB::statement('InsertDataIntoDynamicTable :proctype', [
                "proctype" => 'mStore'
            ]);
              
            for ($i = 2; $i <= $arrayCount; $i++) {

                $openingDate = null;
                $closingDate = null;

                try {
                    if (!empty($worksheet[$i]["K"])) {
                        $openingDate = Carbon::parse($worksheet[$i]["K"])->format('Y-m-d');
                    }

                    if (!empty($worksheet[$i]["M"])) {
                        $closingDate = Carbon::parse($worksheet[$i]["M"])->format('Y-m-d');
                    }
                } catch (\Throwable $th) {
                    if (!empty($worksheet[$i]["K"])) {
                        $openingDate = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["K"])->format('Y-m-d');
                    }

                    if (!empty($worksheet[$i]["M"])) {
                        $closingDate = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["M"])->format('Y-m-d');
                    }
                }


                $attributes = [
                    "MGP SAP code" => intval($worksheet[$i]["B"]),
                    "Store ID" => intval($worksheet[$i]["C"]),
                    "RETEK Code" => intval($worksheet[$i]["D"]),
                    // "Brand Desc" => $worksheet[$i]["F"],
                    // "StoreTypeasperBrand" => $worksheet[$i]["H"],
                    // "Channel" => $worksheet[$i]["I"],
                    // "Store Name" => $worksheet[$i]["J"],
                    // "Store opening Date" => $openingDate,
                    // "SStatus" => $worksheet[$i]["L"],
                    // "Store Closing Date" => $closingDate,
                    // "Location" => $worksheet[$i]["N"],
                    // "City" => $worksheet[$i]["O"],
                    // "State" => $worksheet[$i]["P"],
                    // "Address" => $worksheet[$i]["Q"],
                    // "Pin code" => intval($worksheet[$i]["R"]),
                    // "Region" => $worksheet[$i]["U"],
                    // "Store Manager Name" => $worksheet[$i]["V"],
                    // "Contact no" => $worksheet[$i]["W"],
                    // "Basement occupied (Y/No)" => $worksheet[$i]["X"],
                    // "ARM email id" => $worksheet[$i]["Y"],
                    // "RM email id" => $worksheet[$i]["Z"],
                    // "NROM email id" => $worksheet[$i]["AA"],
                    // "RCM mail" => $worksheet[$i]["AB"],
                    // "Correct store email id" => $worksheet[$i]["AC"],
                    // "HO contact" => $worksheet[$i]["AD"],
                    // "RD email id" => $worksheet[$i]["AE"]
                ];


                $dataset = [
                    "MGP SAP code" => intval($worksheet[$i]["B"]),
                    "Store ID" => intval($worksheet[$i]["C"]),
                    "RETEK Code" => intval($worksheet[$i]["D"]),
                    "Brand Desc" => $worksheet[$i]["F"],
                    "StoreTypeasperBrand" => $worksheet[$i]["H"],
                    "Channel" => $worksheet[$i]["I"],
                    "Store Name" => $worksheet[$i]["J"],
                    "Store opening Date" => $openingDate,
                    "SStatus" => !trim($worksheet[$i]["L"]) ? null : $worksheet[$i]["L"],
                    "Store Closing Date" => $closingDate,
                    "Location" => $worksheet[$i]["N"],
                    "City" => $worksheet[$i]["O"],
                    "State" => $worksheet[$i]["P"],
                    "Address" => $worksheet[$i]["Q"],
                    "Pin code" => intval($worksheet[$i]["R"]),
                    "Region" => $worksheet[$i]["U"],
                    "Store Manager Name" => $worksheet[$i]["V"],
                    "Contact no" => $worksheet[$i]["W"],
                    "Basement occupied (Y/No)" => $worksheet[$i]["X"],
                    "ARM email id" => $worksheet[$i]["Y"],
                    "RM email id" => $worksheet[$i]["Z"],
                    "NROM email id" => $worksheet[$i]["AA"],
                    "RCM mail" => $worksheet[$i]["AB"],
                    "Correct store email id" => $worksheet[$i]["AC"],
                    "HO contact" => $worksheet[$i]["AD"],
                    "RD email id" => $worksheet[$i]["AE"],
                    "createdBys" => auth()->user()->userUID,
                    "isActives" => 1
                ];

           
                  
                 

                Store::updateOrInsert($attributes, $dataset);
            }

            $this->emit('livewire:message.success', [
                "message" => "Upload Successful"
            ]);

            $this->importFile = null;
            return true;
        } catch (\Throwable $exception) {
            $this->emit('livewire:message.failure', [
                "message" => $exception->getMessage()
            ]);
            return false;
        }
    }






    /**
     * File Upload
     * @return bool
     */
    public function uploadFile()
    {

        $this->validateOnly('file');

        $this->file->storeAs(path: 'public/Upload/StoreMaster/Import/', name: $this->file->getClientOriginalName());
        $this->emit('livewire:message.success', [
            "message" => "Upload Successful"
        ]);

        $this->file = null;
        return true;
    }




    /**
     * Get the aMain reports
     * @return array
     */
    public function getData()
    {
        return DB::infinite('PaymentMIS_PROC_SELECT_COMMERCIALHEAD_StoreMaster :PROC_TYPE', [
            'PROC_TYPE' => 'NEWSTOREMASTER',
        ], $this->perPage);
    }



    /**
     * Render the main Page
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function render()
    {
        return view('livewire.commercial-head.settings.store-master', [
            'datas' => $this->getData(),
        ]);
    }
}
