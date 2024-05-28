<?php

namespace App\Livewire\Commercial;

use App\Models\User;
use App\Traits\UseOrderBy;
use App\Models\InvoiceDetail;
use Livewire\Attributes\Rule;
use App\Traits\HasInfinityScroll;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Livewire\Layouts\CommercialComponent;
use App\Models\InvoiceUpload;
use App\Traits\UseDefaults;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Livewire\Features\SupportFileUploads\WithFileUploads;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Validate;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class UploadInvoice extends CommercialComponent
{
    use HasInfinityScroll, UseOrderBy, WithFileUploads, UseDefaults;

    // public $fileupload = null;
    // #[Rule('required|max:1024|mimes:xlsx,csv')]
    // #[Validate('required|max:1024|mimes:xlsx,csv')]
    // protected $rules = [
    //     'fileupload' => 'required|max:1024|mimes:xlsx,csv',
    // ];
    // public $fileupload;

    // protected $rules = [
    //     'fileupload' => 'required|max:1024|mimes:xlsx,csv',
    // ];

    public $filtering = false;
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

    /**
     * locations list
     * @return void
     */
    public $year = [];

    /**
     * Store Filter
     * @var string
     */
    public $filter_year = '';

    public $fileId;

    public $successMessage = '';
    public $errorMessage = '';

    public $invoiceMonth;
    public $invoiceYear;
    public $publishedDate;
    public $invoiceMonthFileName;
    public $invoiceFilePath;
    /**
     * Data source
     * @return array
     */
    public function getData()
    {

        return DB::withOrderBySelect('Landlord_PROC_SELECT_UPLOAD_INVOICE :procType,:user,:month', [
            "procType" => 'ADMIN',
            "user" => null,
            "month" => $this->filter_month,

        ], perPage: $this->perPage, orderBy: $this->orderBy);

        // dd($result);
    }

    public function getDropdown()
    {
        return DB::withOrderBySelect('Landlord_PROC_SELECT_UPLOAD_INVOICE :procType,:user,:month', [
            "procType" => 'mMonth',
            "user" => Auth::id(),
            "month" => $this->filter_month,

        ], perPage: $this->perPage, orderBy: $this->orderBy)->toArray();

        // dd($result);
    }

    public function getDropdownOne()
    {
        return DB::withOrderBySelect('Landlord_PROC_SELECT_INVOICE_MONTH :procType,:user,:month', [
            "procType" => 'mYear',
            "user" => Auth::id(),
            "month" => '',
        ], perPage: $this->perPage, orderBy: $this->orderBy)->toArray();

        // dd($result);
    }

    /**
     * Initializ the component
     * @return void
     */
    public function mount()
    {
        $this->reset();
        $this->month = $this->getDropdown();
        // $this->year = $this->getDropdownOne();
    }


    public function render()
    {
        return view('livewire.commercial.upload-invoice', [
            'dataset' => $this->getData()
        ]);
    }

    public function show($id)
    {
        $invoice = Invoice::findOrFail($id); // Assuming 'Invoice' is your model name
        return view('view_invoice', compact('invoice'));
    }



    #[Rule('required|max:1024|mimes:xlsx,csv')]
    public $fileupload = null;

    public function save()
    {
        $this->validate();
        $this->fileupload->storeAs('InvoiceMonthUpload', $this->fileupload->getClientOriginalName());
        $getOriginalFilename = $this->fileupload->getClientOriginalName();

        $targetPath = storage_path('app/public/InvoiceMonthUpload/' . $getOriginalFilename);

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
                    $landlordName = trim(str_replace("'", '', $worksheet[$i]["C"]));
                    $amount = trim(str_replace("'", '', $worksheet[$i]["D"]));
                    $userId = Auth::id();

                    $data = array(
                        "storeCode" => $storeCode,
                        "storeName" => $storeName,
                        "landlordName" => $landlordName,
                        "amount" => $amount,
                        "filename" => $getOriginalFilename,
                        "createdBy" => $userId,
                        "createdDate" => Carbon::now()->setTimezone('Asia/Kolkata')->format('Y-m-d H:i:s')
                    );

                    // dd($data);
                    $attributes = [
                        "storeCode" => $storeCode,
                        "storeName" => $storeName,
                        "landlordName" => $landlordName,
                        "amount" => $amount,
                        // "createdBy" => $userId,

                    ];
                    if ($storeCode != '' && $storeName != '' && $landlordName != '' && $amount != '') {
                        //dd($attributes);
                        DB::transaction(function () use ($data, $attributes) {
                            InvoiceDetail::updateOrInsert($attributes, $data);
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

        $specificColumns = ['storeCode', 'storeName', 'landlordName', 'amount'];
        $mismatchedColumns = array_diff($specificColumns, $headerColumns);
        if (!empty($mismatchedColumns)) {

            $errorMessageForDispatch = 'Mismatched columns: ' . implode(', ', $mismatchedColumns);
            // dd($errorMessage);
            $this->dispatch('livewire:message.failure', message: ['response' => $errorMessageForDispatch]);
            return true;
        }
    }
}
