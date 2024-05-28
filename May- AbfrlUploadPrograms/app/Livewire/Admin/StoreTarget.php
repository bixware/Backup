<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use App\Models\M_StoreTarget;
use App\Models\mStoreTarget;
use App\Traits\HasInfinityScroll;
use App\Traits\UseDefaults;
use App\Traits\UseOrderBy;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Livewire\Attributes\Validate;
use Livewire\Features\SupportFileUploads\WithFileUploads;
use Livewire\Attributes\Rule;

class StoreTarget extends AdminComponent
{

    use HasInfinityScroll, UseOrderBy, WithFileUploads, UseDefaults;

    public $filtering = false;

    public $startDate = null;

    public $endDate = null;

    public $page = 1;



    /**
     * locations list
     * @return void
     */
    public $store_Id = [];


    /**
     * Stores list
     * @var string
     */
    public $brand_Code = [];



    /**
     * Store Filter
     * @var string
     */
    public $storeId = '';



    /**
     * Brand Filter
     * @var string
     */
    public $brandCode = '';

    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;

    /**
     * Data source
     * @return array
     */
    public function getData()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_STORE_TARGET :procType,:user,:role, :storeId, :brandcode, :startDate, :endDate', [
            "procType" => 'ADMIN',
            "user" => Auth::id(),
            "role" => 1,
            "storeId" => $this->storeId,
            "brandcode" => $this->brandCode,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    /**
     * Data source
     * @return array
     */
    public function getdropdown()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_STORE_TARGET :procType,:user,:role, :storeId, :brandcode, :startDate, :endDate', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 1,
            "storeId" => $this->storeId,
            "brandcode" => $this->brandCode,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }


    /**
     * Initializ the component
     * @return void
     */
    public function mount()
    {
        $this->reset();
        $this->store_Id = $this->getdropdown('mStores');
        $this->brand_Code = $this->getdropdown('mStores');
    }


    public function render()
    {
        return view('livewire.admin.store-target', [
            'dataset' => $this->getData()
        ]);
    }

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Store Target', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Store Target/' . $getOriginalFilename);

        $inputFileTypeIdentify = \PhpOffice\PhpSpreadsheet\IOFactory::identify($targetPath);
        $inputFileTypeFormat = strtolower($inputFileTypeIdentify);

        if ($inputFileTypeFormat == 'csv') {
            $inputFileType = 'Csv';
        } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
            $inputFileType = 'Xlsx';
        } else {
            return response()->json(['message' => 'Invalid file format. Only CSV and Excel files are allowed.'], 400);
        }

        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader($inputFileType);
        $reader->setReadDataOnly(true);
        $reader->setReadEmptyCells(false);

        $spreadsheet = $reader->load($targetPath);
        $worksheet = $spreadsheet->getActiveSheet()->toArray(null, true, true, true);


        $arrayCount = count($worksheet);

        $error_msgs_arr = array();

        $mismatchedColumns = $this->validateHeader($worksheet, $arrayCount);

        if (!$mismatchedColumns) {
            try {
                for ($i = 2; $i <= $arrayCount; $i++) {

                    $storeId = trim(str_replace("'", '', $worksheet[$i]["A"]));
                    $SMName = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $RMName = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    $date = '';
                    if ($inputFileTypeFormat == 'csv') {
                        $date = date('Y-m-d', strtotime(preg_replace('/[_\/\.\s]+/', '-', $worksheet[$i]["D"])));
                    } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
                        $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["D"])->format('Y-m-d');
                    }
                    $NSV = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $brandCode = trim(str_replace("'", '', $worksheet[$i]["F"]));
                    $userId = Auth::id();

                    $data = array(
                        "storeId" => $storeId,
                        "SMName" => $SMName,
                        'RMName' => $RMName,
                        "date" => $date,
                        'NSV' => $NSV,
                        "brandCode" => $brandCode,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );


                    $attributes = [
                        "storeId" => $storeId,
                        "SMName" => $SMName,
                        'RMName' => $RMName,
                        "date" => $date,
                        'NSV' => $NSV,
                        "brandCode" => $brandCode,
                        // "createdBy" => $userId,

                    ];
                    if ($storeId != '' && $SMName != '' && $RMName != '' && $NSV != '' && $brandCode != '' && $userId != '') {

                        DB::transaction(function () use ($data, $attributes) {
                            mStoreTarget::updateOrInsert($attributes, $data);
                            DB::commit();
                        });
                    }
                }

                $this->dispatch('livewire:message.success', message: ['response' => 'File Uploaded']);
                return true;
            } catch (\Throwable $exception) {
                // $this->dispatch('livewire:message.failure', message: ['response' => explode('.', explode("[SQL Server]", $exception->getMessage())[1])[0]]);
                $errorMessage = $exception->getMessage();
                $errorDetails = explode("[SQL Server]", $errorMessage);

                if (count($errorDetails) > 1) {
                    $errorDetails = explode("[SQL Server]", $errorMessage)[1];

                    if (preg_match('/\[([^\]]+)\] = ([^\s]+)\s/', $errorDetails, $matches)) {
                        $columnName = $matches[1];
                        $problematicValue = $matches[2];
                        $errorMessageForDispatch = "Conversion failed in column '$columnName' for value '$problematicValue'";

                        $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
                    } else {
                        $this->dispatch('livewire:message.failure', message: ['response' => 'Data conversion error occurred. Please check the log for details.']);
                    }
                } else {
                    // If the expected structure is not found, use a default error message
                    $errorMessageForDispatch = 'Error occurred. Please check the log for details.';
                    $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
                }
                return false;
            }
        }
    }

    private function validateHeader($worksheet)
    {
        $headerColumns = $worksheet[1]; // Assuming the header row is the first row

        $specificColumns = ['storeId', 'SMName', 'RMName', 'date', 'NSV', 'brandCode'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}