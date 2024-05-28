<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use App\Traits\HasInfinityScroll;
use App\Traits\UseOrderBy;
use Livewire\WithPagination;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\M_LEandOP;
use App\Models\mLEandOP;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Validate;
use Livewire\Features\SupportFileUploads\WithFileUploads;
use Illuminate\Pagination\LengthAwarePaginator;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Services\ParseDateService;
use App\Traits\UseDefaults;
use Illuminate\Support\Facades\Schema;
use Livewire\Attributes\Rule;



class LeandOp extends AdminComponent
{

    use HasInfinityScroll, UseOrderBy, WithFileUploads, WithPagination, UseDefaults;

    public $filtering = false;

    public $startDate = null;

    public $endDate = null;

    public $page = 1;



    /**
     * locations list
     * @return void
     */
    public $store_Code = [];


    /**
     * Stores list
     * @var string
     */
    public $store_Name = [];



    /**
     * Store Filter
     * @var string
     */
    public $storeCode = '';



    /**
     * Brand Filter
     * @var string
     */
    public $storeName = '';



    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;



    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('LE & OP', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/LE & OP/' . $getOriginalFilename);

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

        $mismatchedColumns = $this->validateHeader($worksheet, $arrayCount);

        if (!$mismatchedColumns) {

            try {
                for ($i = 2; $i <= $arrayCount; $i++) {


                    $storeCode = trim(str_replace("'", '', $worksheet[$i]["A"]));
                    $storeName = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    // $date = ParseDateService::convertDateFormatUsingDB(trim(str_replace("'", '', $worksheet[$i]["C"])), 'ICICI Cash MIS');
                    $date = '';
                    if ($inputFileTypeFormat == 'csv') {
                        $date = date('Y-m-d', strtotime(preg_replace('/[_\/\.\s]+/', '-', $worksheet[$i]["C"])));
                    } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
                        $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["C"])->format('Y-m-d');
                    }
                    // $date = '';
                    // try {
                    //     $dateTimeObject = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["C"]);
                    //     if ($dateTimeObject !== false) {
                    //         dd($dateTimeObject);
                    //         $date = $dateTimeObject->format('Y-m-d');
                    //     } else {
                    //         throw new \Exception('Invalid date format');
                    //     }
                    // } catch (\Exception $e) {
                    //     $this->dispatch('livewire:message.failure', message: ['response' => "Invalid date format in row $i"]);
                    //     continue; // Skip processing this row
                    // }
                    $OP = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $LE = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $userId = Auth::id();

                    $data = array(
                        "storeCode" => $storeCode,
                        "storeName" => $storeName,
                        'date' => $date,
                        "OP" => $OP,
                        "LE" => $LE,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );

                    // dd($data);
                    $attributes = [
                        "storeCode" => $storeCode,
                        "storeName" => $storeName,
                        'date' => $date,
                        "OP" => $OP,
                        "LE" => $LE,
                        // "createdBy" => $userId,

                    ];
                    if ($storeCode != '' && $storeName != '' && $date != '' && $OP != '' && $LE != '') {
                        //dd($attributes);
                        DB::transaction(function () use ($data, $attributes) {
                            mLEandOP::updateOrInsert($attributes, $data);
                            DB::commit();
                        });
                    }
                }

                $this->dispatch('livewire:message.success', message: ['response' => 'File Uploaded']);
                return true;
            } catch (\Throwable $exception) {
                // $this->dispatch('livewire:message.failure', message: ['response' => explode('.', explode("[SQL Server]", $exception->getMessage())[1])[0]]);
                // $this->dispatch('livewire:message.failure', message: ['response' => $exception->getMessage()]);
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

        $specificColumns = ['storeCode', 'storeName', 'date', 'OP', 'LE'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }


    /**
     * Data source
     * @return array
     */
    public function getData()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_LE_AND_OP :procType,:user,:role,:storecode,:storename,:startDate,:endDate', [
            "procType" => 'ADMIN',
            "user" => Auth::id(),
            "role" => 1,
            "storecode" => $this->storeCode,
            "storename" => $this->storeName,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,

        ],  perPage: $this->perPage, orderBy: $this->orderBy);
    }




    /**
     * Data source
     * @return array
     */
    public function getdropdown()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_LE_AND_OP :procType, :user, :role, :storecode, :storename, :startDate, :endDate', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 1,
            "storecode" => $this->storeCode,
            "storename" => $this->storeName,
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
        $this->store_Code = $this->getdropdown('mStores');
        $this->store_Name = $this->getdropdown('mStores');
    }



    /**
     * Render the main page
     * @return void
     */
    public function render()
    {
        return view('livewire.admin.leand-op', [
            'dataset' => $this->getData()
        ]);
    }
}