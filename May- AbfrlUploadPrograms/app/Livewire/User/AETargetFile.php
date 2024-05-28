<?php

namespace App\Livewire\User;

use App\Livewire\Layouts\UserComponent;
use App\Models\mAETargetFile;
use App\Traits\HasInfinityScroll;
use App\Traits\UseDefaults;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Rule;
use Livewire\Attributes\Validate;
use Livewire\Features\SupportFileUploads\WithFileUploads;


class AETargetFile extends UserComponent
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
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_AE_TARGET_FILE :procType,:user, :role,:sapcode,:storename,:startDate,:endDate', [
            "procType" => 'USER',
            "user" => Auth::id(),
            "role" => 2,
            "sapcode" => $this->SAPCode,
            "storename" => $this->storeName,
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
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_AE_TARGET_FILE :procType,:user,:role,:sapcode,:storename,:startDate,:endDate', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 2,
            "sapcode" => $this->SAPCode,
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
        $this->SAP_Code = $this->getdropdown('mStores');
        $this->store_Name = $this->getdropdown('mStores');
    }


    public function render()
    {
        return view('livewire.user.a-e-target-file', [
            'dataset' => $this->getData()
        ]);
    }

    public function save()
    {

        $this->validate();
        $this->fileupload->storeAs('AE Target File', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/AE Target File/' . $getOriginalFilename);

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

                    $SAPCode = trim(str_replace("'", '', $worksheet[$i]["A"]));
                    $storeName = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $date = '';
                    if ($inputFileTypeFormat == 'csv') {
                        $date = date('Y-m-d', strtotime(preg_replace('/[_\/\.\s]+/', '-', $worksheet[$i]["C"])));
                    } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
                        $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["C"])->format('Y-m-d');
                    }
                    $day = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $WKNO = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $OPNSVTarget = trim(str_replace("'", '', $worksheet[$i]["F"]));
                    $walkins = trim(str_replace("'", '', $worksheet[$i]["G"]));
                    $bills = trim(str_replace("'", '', $worksheet[$i]["H"]));
                    $mensVol = trim(str_replace("'", '', $worksheet[$i]["I"]));
                    $womensVol = trim(str_replace("'", '', $worksheet[$i]["J"]));
                    $totalVol = trim(str_replace("'", '', $worksheet[$i]["K"]));
                    $GSV = trim(str_replace("'", '', $worksheet[$i]["L"]));
                    $MRP = trim(str_replace("'", '', $worksheet[$i]["M"]));
                    $userId = Auth::id();

                    $data = array(
                        "SAPCode" => $SAPCode,
                        "storeName" => $storeName,
                        "date" => $date,
                        'day' => $day,
                        "WKNO" => $WKNO,
                        "OPNSVTarget" => $OPNSVTarget,
                        'walkins' => $walkins,
                        'bills' => $bills,
                        'mensVol' => $mensVol,
                        "womensVol" => $womensVol,
                        "totalVol" => $totalVol,
                        'GSV' => $GSV,
                        'MRP' => $MRP,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );


                    $attributes = [
                        "SAPCode" => $SAPCode,
                        "storeName" => $storeName,
                        "date" => $date,
                        'day' => $day,
                        "WKNO" => $WKNO,
                        "OPNSVTarget" => $OPNSVTarget,
                        'walkins' => $walkins,
                        'bills' => $bills,
                        'mensVol' => $mensVol,
                        "womensVol" => $womensVol,
                        "totalVol" => $totalVol,
                        'GSV' => $GSV,
                        'MRP' => $MRP,
                        // "createdBy" => $userId,


                    ];
                    if ($SAPCode != '' && $storeName != '' && $date != '' && $day != '' && $WKNO != '' && $OPNSVTarget != '' && $walkins != '' && $bills != '' && $mensVol != '' && $womensVol != '' && $totalVol != '' && $GSV != '' && $MRP != '' && $userId != '') {
                        DB::transaction(function () use ($data, $attributes) {
                            mAETargetFile::updateOrInsert($attributes, $data);
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

        $specificColumns = ['SAPCode', 'storeName', 'date', 'day', 'WKNO', 'OPNSVTarget', 'walkins', 'bills', 'mensVol', 'womensVol', 'totalVol', 'GSV', 'MRP'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}