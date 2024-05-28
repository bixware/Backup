<?php

namespace App\Livewire\Landlord;

use App\Traits\UseOrderBy;
use App\Models\InvoiceDetail;
use Livewire\Attributes\Rule;
use App\Traits\HasInfinityScroll;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Livewire\Layouts\LandlordComponent;
use Illuminate\Support\Facades\Storage;
use Livewire\Features\SupportFileUploads\WithFileUploads;

class Invoice extends LandlordComponent
{
    use HasInfinityScroll, UseOrderBy, WithFileUploads;
    public $invoiceNo;
    public $invoiceDate;
    public $invoiceFileName;
    public $invoiceUID;
    public $pageAccess = ['10']; // Default value for checkboxes
    public $errors = [];

    /**
     * locations list
     * @return void
     */
    public $month = [];

    /**
     * Store Filter
     * @var string
     */
    public $filter_month = '';

    public $successMessage = '';

    #[Rule('required|max:1024|mimes:xlsx,csv')]

    public $fileupload = null;



    protected $listeners = ['setInvoiceUID'];


    public function getData()
    {

        return DB::withOrderBySelect('Landlord_PROC_SELECT_UPLOAD_INVOICE :procType,:user,:month', [
            "procType" => 'USER',
            "user" => Auth::id(),
            "month" =>  $this->filter_month
        ], perPage: $this->perPage, orderBy: $this->orderBy);
    }

    public function getDropdown()
    {
        return DB::withOrderBySelect('Landlord_PROC_SELECT_UPLOAD_INVOICE :procType,:user,:month', [
            "procType" => 'mMonth',
            "user" => Auth::id(),
            "month" => $this->filter_month
        ], perPage: $this->perPage, orderBy: $this->orderBy)->toArray();
    }





    /**
     * Initializ the component
     * @return void
     */
    public function mount()
    {
        $this->reset();
        $this->month = $this->getDropdown();
    }


    public function render()
    {
        return view('livewire.landlord.invoice', [
            'dataset' => $this->getData()
        ]);
    }

    public function uploadInvoice($invoiceUID)
    {

        $this->invoiceUID = $invoiceUID;
        $dataValid = $this->validate([
            'invoiceNo' => 'required',
            'invoiceDate' => 'required|date',
            'invoiceFileName' => 'required|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);
        $input_file_name =  $this->invoiceFileName->getClientOriginalName();
        $rename_file_name = str_replace(['\\', '/', ':', '*', '?', '"', '<', '>', '|',  '&', '%', '#', '$'], '_', $input_file_name);
        $file = pathinfo($rename_file_name, PATHINFO_FILENAME);
        $fileName = $file . "_" . time() . '.' .  $this->invoiceFileName->extension();
        $dataValid['invoiceFileName'] = $this->invoiceFileName->storeAs('Inovice', $fileName, 'public');
        $filePath = $this->invoiceFileName->storeAs('Inovice', $fileName, 'public');
        // dd($filePath);
        // Get the full file path
        $fullFilePath = storage_path('app/public/invoice/' . $fileName);
        // dd($fullFilePath);
        $update = InvoiceDetail::where('invoiceUID', $this->invoiceUID)->update([
            'invoiceNo' => $this->invoiceNo,
            'invoiceDate' => $this->invoiceDate,
            'invoiceFileName' => $fileName,
            'invoiceFilePath' => $fullFilePath
        ]);
        $this->successMessage = 'Invoice uploaded successfully!';
        $this->reset(['invoiceNo', 'invoiceDate', 'invoiceFileName', 'pageAccess', 'invoiceUID']);
        $this->dispatch('invoice:modal_closed', $invoiceUID);
    }

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('Invoice', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();
        $targetPath = storage_path('app/Invoice/' . $getOriginalFilename);
        // dd($targetPath);

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
        // dd($arrayCount);
        $error_msgs_arr = array();


        try {
            for ($i = 2; $i <= $arrayCount; $i++) {

                $invoiceNo = trim(str_replace("'", '', $worksheet[$i]["A"]));
                $storeCode = trim(str_replace("'", '', $worksheet[$i]["B"]));
                $storeName = trim(str_replace("'", '', $worksheet[$i]["C"]));
                $landlordName = trim(str_replace("'", '', $worksheet[$i]["D"]));
                $amount = trim(str_replace("'", '', $worksheet[$i]["E"]));
                // $date = '';
                // if ($inputFileTypeFormat == 'csv') {
                //     $date = date('Y-m-d', strtotime(preg_replace('/[_\/\.\s]+/', '-', $worksheet[$i]["F"])));
                // } else if ($inputFileTypeFormat == 'xls' || $inputFileTypeFormat == 'xlsx') {
                //     $date = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($worksheet[$i]["F"])->format('Y-m-d');
                // }
                // $NSV = trim(str_replace("'", '', $worksheet[$i]["G"]));
                // $date = ParseDateService::convertDateFormatUsingDB(trim(str_replace("'", '', $worksheet[$i]["C"])), 'ICICI Cash MIS');
                // $brandCode = trim(str_replace("'", '', $worksheet[$i]["H"]));
                // $runningAverageMix = trim(str_replace("'", '', $worksheet[$i]["I"]));
                $userId = Auth::id();

                $data = array(
                    "invoiceNo" => $invoiceNo,
                    "storeCode" => $storeCode,
                    'storeName' => $storeName,
                    "landlordName" => $landlordName,
                    "amount" => $amount,
                    'filePath' => $targetPath,
                    "filename" => $getOriginalFilename,
                    "createdBy" => $userId,
                    "createdDate" => now(),
                    "userUID" => $userId,
                );


                $attributes = [
                    "invoiceNo" => $invoiceNo,
                    "storeCode" => $storeCode,
                    'storeName' => $storeName,
                    "landlordName" => $landlordName,
                    "amount" => $amount,
                    'filePath' => $targetPath,
                    "filename" => $getOriginalFilename,
                    "createdBy" => $userId,
                    "createdDate" => now(),
                    "userUID" => $userId,

                ];


                DB::transaction(function () use ($data, $attributes) {
                    InvoiceDetail::updateOrInsert($attributes, $data);
                    DB::commit();
                });
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
