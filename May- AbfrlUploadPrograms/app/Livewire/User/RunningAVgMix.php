<?php

namespace App\Livewire\User;

use App\Livewire\Layouts\UserComponent;
use App\Models\M_RunningAvgMix;
use App\Models\mRunningAvgMix;
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

class RunningAVgMix extends UserComponent
{

    use HasInfinityScroll, UseOrderBy, WithFileUploads, UseDefaults;

    /**
     * locations list
     * @return void
     */
    public $store_code = [];


    /**
     * Stores list
     * @var string
     */
    public $crew_StaffName = [];



    /**
     * Store Filter
     * @var string
     */
    public $storecode = '';



    /**
     * Brand Filter
     * @var string
     */
    public $crewStaffName = '';


    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;

    /**
     * Data source
     * @return array
     */
    public function getData()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_RUNNING_AVG_MIX :procType,:user,:role,:storecode,:crewStaffName', [
            "procType" => 'USER',
            "user" => Auth::id(),
            "role" => 2,
            "storecode" => $this->storecode,
            "crewStaffName" => $this->crewStaffName,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    /**
     * Data source
     * @return array
     */
    public function getdropdown()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_RUNNING_AVG_MIX :procType,:user,:role,:storecode,:crewStaffName', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 2,
            "storecode" => $this->storecode,
            "crewStaffName" => $this->crewStaffName,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }


    /**
     * Initializ the component
     * @return void
     */
    public function mount()
    {
        $this->reset();
        $this->store_code = $this->getdropdown('mStores');
        $this->crew_StaffName = $this->getdropdown('mStores');
    }


    public function render()
    {
        return view('livewire.user.running-a-vg-mix', [
            'dataset' => $this->getData()
        ]);
    }

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Running Avg Mix', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Running Avg Mix/' . $getOriginalFilename);

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
                    $employeeId = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $crewStaffName = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    $runningAverageMix = trim(str_replace("'", '', $worksheet[$i]["D"]));

                    $userId = Auth::id();

                    $data = array(
                        "storeCode" => $storeCode,
                        "employeeId" => $employeeId,
                        'crewStaffName' => $crewStaffName,
                        "runningAverageMix" => $runningAverageMix,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );

                    $attributes = [
                        "storeCode" => $storeCode,
                        "employeeId" => $employeeId,
                        'crewStaffName' => $crewStaffName,
                        "runningAverageMix" => $runningAverageMix,
                        // "createdBy" => $userId,

                    ];
                    if ($storeCode != '' && $employeeId != '' && $crewStaffName != '' && $runningAverageMix != '' && $userId != '') {

                        DB::transaction(function () use ($data, $attributes) {
                            mRunningAvgMix::updateOrInsert($attributes, $data);
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

        $specificColumns = ['storeCode', 'employeeId', 'crewStaffName', 'runningAverageMix'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}