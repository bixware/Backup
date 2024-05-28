<?php

namespace App\Livewire\User;

use App\Livewire\Layouts\UserComponent;
use App\Models\M_StaffCommunication;
use App\Models\mStaffCommunication;
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

class StaffCommunication extends UserComponent
{
    use HasInfinityScroll, UseOrderBy, WithFileUploads, UseDefaults;


    /**
     * locations list
     * @return void
     */
    public $store_Code = [];


    /**
     * Stores list
     * @var string
     */
    public $brands = [];



    /**
     * Store Filter
     * @var string
     */
    public $storeCode = '';



    /**
     * Brand Filter
     * @var string
     */
    public $_brand = '';

    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;

    /**
     * Data source
     * @return array
     */
    public function getData()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_STAFF_COMMUNICATION :procType,:user,:role,:storecode,:brand', [
            "procType" => 'USER',
            "user" => Auth::id(),
            "role" => 2,
            "storecode" => $this->storeCode,
            "brand" => $this->_brand,
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }


    /**
     * Data source
     * @return array
     */
    public function getdropdown()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_STAFF_COMMUNICATION :procType,:user,:role,:storecode,:brand', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 2,
            "storecode" => $this->storeCode,
            "brand" => $this->_brand,
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
        $this->brands = $this->getdropdown('mStores');
    }


    public function render()
    {

        return view('livewire.user.staff-communication', [
            'dataset' => $this->getData()
        ]);
    }

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Staff Communication', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Staff Communication/' . $getOriginalFilename);

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
                    $newStoreCode = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $brand = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    $name = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $storeNorms = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $storeManager = trim(str_replace("'", '', $worksheet[$i]["F"]));
                    $storeCrew = trim(str_replace("'", '', $worksheet[$i]["G"]));
                    $coach = trim(str_replace("'", '', $worksheet[$i]["H"]));
                    $ASM = trim(str_replace("'", '', $worksheet[$i]["I"]));
                    $PRM = trim(str_replace("'", '', $worksheet[$i]["J"]));
                    $userId = Auth::id();

                    $data = array(
                        "storeCode" => $storeCode,
                        "newStoreCode" => $newStoreCode,
                        'brand' => $brand,
                        "name" => $name,
                        "storeNorms" => $storeNorms,
                        "storeManager" => $storeManager,
                        'storeCrew' => $storeCrew,
                        'coach' => $coach,
                        'ASM' => $ASM,
                        "PRM" => $PRM,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );


                    $attributes = [
                        "storeCode" => $storeCode,
                        "newStoreCode" => $newStoreCode,
                        'brand' => $brand,
                        "name" => $name,
                        "storeNorms" => $storeNorms,
                        "storeManager" => $storeManager,
                        'storeCrew' => $storeCrew,
                        'coach' => $coach,
                        'ASM' => $ASM,
                        "PRM" => $PRM,
                        // "createdBy" => $userId,

                    ];
                    if ($storeCode != '' && $newStoreCode != '' && $brand != '' && $name != '' && $storeNorms != '' && $storeManager != '' && $storeCrew != '' && $coach != '' && $ASM != '' && $PRM != '' && $userId != '') {

                        DB::transaction(function () use ($data, $attributes) {
                            mStaffCommunication::updateOrInsert($attributes, $data);
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

        $specificColumns = ['storeCode', 'newStoreCode', 'brand', 'name', 'storeNorms', 'storeManager', 'storeCrew', 'coach', 'ASM', 'PRM'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}