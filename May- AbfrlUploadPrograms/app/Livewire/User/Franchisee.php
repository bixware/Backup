<?php

namespace App\Livewire\User;

use App\Livewire\Layouts\UserComponent;
use App\Traits\HasInfinityScroll;
use App\Traits\UseOrderBy;
use Livewire\WithPagination;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\M_LEandOP;
use App\Models\mFranchisee;
use App\Models\mLEandOP;
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
use Livewire\Attributes\Rule;



class Franchisee extends UserComponent
{

    use HasInfinityScroll, UseOrderBy, WithFileUploads, WithPagination, UseDefaults;

    public $filtering = false;



    /**
     * locations list
     * @return void
     */
    public $store_Code = [];


    /**
     * Stores list
     * @var string
     */
    public $vendor_Code = [];



    /**
     * Store Filter
     * @var string
     */
    public $storeCode = '';



    /**
     * Brand Filter
     * @var string
     */
    public $vendorCode = '';



    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;



    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Franchisee', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Franchisee/' . $getOriginalFilename);

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
                    $vendorCode = trim(str_replace("'", '', $worksheet[$i]["B"]));
                    $franchiseeName = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    // $franchiseeDOB = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $franchiseeDOB = '';
                    if ($inputFileTypeFormat == 'csv') {
                        $franchiseeDOB = date('Y-m-d', strtotime(preg_replace('/[_\/\.\s]+/', '-', $worksheet[$i]["D"])));
                    } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
                        $franchiseeDOB = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["D"])->format('Y-m-d');
                    }
                    $FOFOCompanyName = trim(str_replace("'", '', $worksheet[$i]["E"]));
                    $franchiseePrimaryPhno = trim(str_replace("'", '', $worksheet[$i]["F"]));
                    $franchiseeSecondarPhno = trim(str_replace("'", '', $worksheet[$i]["G"]));
                    $FOFOEmailId = trim(str_replace("'", '', $worksheet[$i]["H"]));
                    $FOFOAddress = trim(str_replace("'", '', $worksheet[$i]["I"]));
                    $userId = Auth::id();

                    $data = array(
                        "storeCode" => $storeCode,
                        "vendorCode" => $vendorCode,
                        'franchiseeName' => $franchiseeName,
                        "franchiseeDOB" => $franchiseeDOB,
                        "FOFOCompanyName" => $FOFOCompanyName,
                        "franchiseePrimaryPhno" => $franchiseePrimaryPhno,
                        "franchiseeSecondarPhno" => $franchiseeSecondarPhno,
                        "FOFOEmailId" => $FOFOEmailId,
                        "FOFOAddress" => $FOFOAddress,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );


                    $attributes = [
                        "storeCode" => $storeCode,
                        "vendorCode" => $vendorCode,
                        'franchiseeName' => $franchiseeName,
                        "franchiseeDOB" => $franchiseeDOB,
                        "FOFOCompanyName" => $FOFOCompanyName,
                        "franchiseePrimaryPhno" => $franchiseePrimaryPhno,
                        "franchiseeSecondarPhno" => $franchiseeSecondarPhno,
                        "FOFOEmailId" => $FOFOEmailId,
                        "FOFOAddress" => $FOFOAddress,
                        "filename" => $getOriginalFilename,
                        // "createdBy" => $userId,
                        // "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('d-m-Y H:i:s')

                    ];

                    //dd($data);
                    if ($storeCode != '' && $vendorCode != '' && $franchiseeName != '' && $franchiseeDOB != '' && $FOFOCompanyName != '' &&  $franchiseePrimaryPhno != '' && $franchiseeSecondarPhno != '' && $FOFOEmailId != '' && $FOFOAddress != '') {
                        //dd($attributes);
                        DB::transaction(function () use ($data, $attributes) {
                            mFranchisee::updateOrInsert($attributes, $data);
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

        $specificColumns = ['storeCode', 'vendorCode', 'franchiseeName', 'franchiseeDOB', 'FOFOCompanyName', 'franchiseePrimaryPhno', 'franchiseeSecondarPhno', 'FOFOEmailId', 'FOFOAddress'];
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
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_FRANCHISEE :procType,:user, :role,:storecode,:vendorcode', [
            "procType" => 'USER',
            "user" => Auth::id(),
            "role" => 2,
            "storecode" => $this->storeCode,
            "vendorcode" => $this->vendorCode,

        ],  perPage: $this->perPage, orderBy: $this->orderBy);
    }




    /**
     * Data source
     * @return array
     */
    public function getdropdown()
    {
        return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_FRANCHISEE :procType, :user, :role,:storecode, :vendorcode', [
            "procType" => 'mStores',
            "user" => Auth::id(),
            "role" => 2,
            "storecode" => $this->storeCode,
            "vendorcode" => $this->vendorCode,
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
        $this->vendor_Code = $this->getdropdown('mStores');
    }



    /**
     * Render the main page
     * @return void
     */
    public function render()
    {
        return view('livewire.user.franchisee', [
            'dataset' => $this->getData()
        ]);
    }
}