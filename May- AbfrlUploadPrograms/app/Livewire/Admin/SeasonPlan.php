<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use App\Models\M_SeasonPlan;
use App\Models\mSeasonPlan;
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

class SeasonPlan extends AdminComponent
{
    use HasInfinityScroll, UseOrderBy, WithFileUploads, UseDefaults;

    public $filtering = false;
    /**
     * locations list
     * @return void
     */
    public $SAP_Code = [];


    /**
     * Stores list
     * @var string
     */
    public $store_Name = [];



    /**
     * Store Filter
     * @var string
     */
    public $SAPCode = '';



    /**
     * Brand Filter
     * @var string
     */
    public $storeName = '';

    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;

    /**
     * Data source
     * @return array
     */
    public function getData()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SEASON_PLAN :procType,:user, :role,:sapcode,:storename', [
            "procType" => 'ADMIN',
            "user" => Auth::id(),
            "role" => 1,
            "sapcode" => $this->SAPCode,
            "storename" => $this->storeName,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    /**
     * Data source
     * @return array
     */
    public function getdropdown()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SEASON_PLAN :procType,:user,:role,:sapcode,:storename', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 1,
            "sapcode" => $this->SAPCode,
            "storename" => $this->storeName,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    /**
     * Initializ the component
     * @return void
     */
    public function mount()
    {
        $this->reset();
        $this->SAP_Code = $this->getdropdown('mStores');
        $this->store_Name = $this->getdropdown('mStores');
    }


    public function render()
    {
        return view('livewire.admin.season-plan', [
            'dataset' => $this->getData()
        ]);
    }

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Season Plan', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Season Plan/' . $getOriginalFilename);

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

                    $storeCode = trim(str_replace("'", '', $worksheet[$i]["A"]));
                    $SAPCode = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $storeName = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    $month = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $day = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $WKNo = trim(str_replace("'", '', $worksheet[$i]["F"]));
                    $storeTGT = trim(str_replace("'", '', $worksheet[$i]["G"]));
                    $TCMBDepartment = trim(str_replace("'", '', $worksheet[$i]["H"]));
                    $departMentTGT = trim(str_replace("'", '', $worksheet[$i]["I"]));
                    $subBrand = trim(str_replace("'", '', $worksheet[$i]["J"]));
                    $subBrandTGT = trim(str_replace("'", '', $worksheet[$i]["K"]));
                    $monthYear = trim(str_replace("'", '', $worksheet[$i]["L"]));
                    $class = trim(str_replace("'", '', $worksheet[$i]["M"]));
                    $classTGT = trim(str_replace("'", '', $worksheet[$i]["N"]));
                    $userId = Auth::id();

                    $data = array(
                        "storeCode" => $storeCode,
                        "SAPCode" => $SAPCode,
                        'storeName' => $storeName,
                        "month" => $month,
                        "day" => $day,
                        "WKNo" => $WKNo,
                        'storeTGT' => $storeTGT,
                        'TCMBDepartment' => $TCMBDepartment,
                        'departMentTGT' => $departMentTGT,
                        "subBrand" => $subBrand,
                        "subBrandTGT" => $subBrandTGT,
                        'monthYear' => $monthYear,
                        'class' => $class,
                        'classTGT' => $classTGT,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );


                    $attributes = [
                        "storeCode" => $storeCode,
                        "SAPCode" => $SAPCode,
                        'storeName' => $storeName,
                        "month" => $month,
                        "day" => $day,
                        "WKNo" => $WKNo,
                        'storeTGT' => $storeTGT,
                        'TCMBDepartment' => $TCMBDepartment,
                        'departMentTGT' => $departMentTGT,
                        "subBrand" => $subBrand,
                        "subBrandTGT" => $subBrandTGT,
                        'monthYear' => $monthYear,
                        'class' => $class,
                        'classTGT' => $classTGT,
                        // "createdBy" => $userId,

                    ];
                    if ($storeCode != '' && $SAPCode != '' && $storeName != '' && $month != '' && $day != '' && $WKNo != '' && $storeTGT != '' && $TCMBDepartment != '' && $departMentTGT != '' && $subBrand != '' && $subBrandTGT != '' && $monthYear != '' && $class != '' && $classTGT != '' && $userId != '') {

                        DB::transaction(function () use ($data, $attributes) {
                            mSeasonPlan::updateOrInsert($attributes, $data);
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

        $specificColumns = ['storeCode', 'SAPCode', 'storeName', 'month', 'day', 'WKNo', 'storeTGT', 'TCMBDepartment', 'departMentTGT', 'subBrand', 'subBrandTGT', 'monthYear', 'class', 'classTGT'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}