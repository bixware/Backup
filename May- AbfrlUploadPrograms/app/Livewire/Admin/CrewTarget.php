<?php

namespace App\Livewire\Admin;

use Livewire\Component;
use App\Livewire\Layouts\AdminComponent;
use App\Models\M_CrewTarget;
use App\Traits\HasInfinityScroll;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\M_LEandOP;
use App\Models\mCrewTarget;
use App\Traits\UseDefaults;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Livewire\Attributes\Validate;
use Livewire\Attributes\Rule;
use Livewire\Features\SupportFileUploads\WithFileUploads;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


class CrewTarget extends AdminComponent
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
    public $store_Code = [];


    /**
     * Stores list
     * @var string
     */
    public $brand_Code = [];



    /**
     * Store Filter
     * @var string
     */
    public $storeCode = '';



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
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_CREW_TARGET :procType,:user, :role, :storecode, :brandcode, :startDate, :endDate', [
            "procType" => 'ADMIN',
            "user" => Auth::id(),
            "role" => 1,
            "storecode" => $this->storeCode,
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
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_CREW_TARGET :procType,:user, :role, :storecode, :brandcode, :startDate, :endDate', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 1,
            "storecode" => $this->storeCode,
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
        $this->store_Code = $this->getdropdown('mStores');
        $this->brand_Code = $this->getdropdown('mStores');
    }



    public function render()
    {

        return view('livewire.admin.crew-target', [
            'dataset' => $this->getData()
        ]);
    }

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Crew Target', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Crew Target/' . $getOriginalFilename);

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




        // dd($worksheet);
        $arrayCount = count($worksheet);

        //validate Header column
        $mismatchedColumns = $this->validateHeader($worksheet, $arrayCount);


        if (!$mismatchedColumns) {
            try {
                for ($i = 2; $i <= $arrayCount; $i++) {

                    $storeCode = trim(str_replace("'", '', $worksheet[$i]["A"]));
                    $salesPersonCode = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $employeeId = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    $crewStaffName = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $coachName = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $date = '';
                    if ($inputFileTypeFormat == 'csv') {
                        $date = date('Y-m-d', strtotime(preg_replace('/[_\/\.\s]+/', '-', $worksheet[$i]["F"])));
                    } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
                        $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["F"])->format('Y-m-d');
                    }
                    $NSV = trim(str_replace("'", '', $worksheet[$i]["G"]));
                    // $date = ParseDateService::convertDateFormatUsingDB(trim(str_replace("'", '', $worksheet[$i]["C"])), 'ICICI Cash MIS');
                    $brandCode = trim(str_replace("'", '', $worksheet[$i]["H"]));
                    $runningAverageMix = trim(str_replace("'", '', $worksheet[$i]["I"]));
                    $userId = Auth::id();
                    // dd($storeCode);
                    $data = array(
                        "storeCode" => $storeCode,
                        "salesPersonCode" => $salesPersonCode,
                        'employeeId' => $employeeId,
                        "crewStaffName" => $crewStaffName,
                        "coachName" => $coachName,
                        "date" => $date,
                        'NSV' => $NSV,
                        'brandCode' => $brandCode,
                        'runningAverageMix' => $runningAverageMix,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );


                    $attributes = [
                        "storeCode" => $storeCode,
                        "salesPersonCode" => $salesPersonCode,
                        'employeeId' => $employeeId,
                        "crewStaffName" => $crewStaffName,
                        "coachName" => $coachName,
                        "date" => $date,
                        'NSV' => $NSV,
                        'brandCode' => $brandCode,
                        'runningAverageMix' => $runningAverageMix,
                        // "createdBy" => $userId,


                    ];
                    if ($storeCode != '' && $salesPersonCode != '' && $employeeId != '' && $crewStaffName != '' && $coachName != '' && $date != '' && $NSV != '' && $brandCode != '' && $runningAverageMix != '' && $userId != '') {

                        DB::transaction(function () use ($data, $attributes) {
                            mCrewTarget::updateOrInsert($attributes, $data);
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
            };
        }
    }

    private function validateHeader($worksheet)
    {
        $headerColumns = $worksheet[1]; // Assuming the header row is the first row
        $tableColumns = Schema::getColumnListing('P2_CrewTarget');

        $specificColumns = ['storeCode', 'salesPersonCode', 'employeeId', 'crewStaffName', 'coachName', 'date', 'NSV', 'brandCode', 'runningAverageMix'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}