<?php

namespace App\Http\Controllers\StoreUser;

use App\Http\Controllers\Controller;

use App\Models\Process\SAP\CardRecon as SAPCardRecon;
use App\Models\Process\SAP\CardReconApproval as SAPCardReconApproval;
use App\Models\Process\SAP\WalletRecon as SAPWalletRecon;
use App\Models\Process\SAP\WalletReconApproval as SAPWalletReconApproval;

use App\Services\GeneralService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class ProcessController extends Controller {



    protected $cashReconpath;
    protected $cardReconpath;
    protected $upiReconpath;
    protected $walletReconpath;
    protected $mposTenderBankReconpath;
    protected $mposBankMisReconpath;


    public function __construct() {
        $this->cashReconpath = storage_path('app/public/reconciliation/cash-reconciliation/store-cash');
        $this->cardReconpath = storage_path('app/public/reconciliation/card-reconciliation/store-card');
        $this->upiReconpath = storage_path('app/public/reconciliation/upi-reconciliation/store-upi');
        $this->walletReconpath = storage_path('app/public/reconciliation/wallet-reconciliation/store-wallet');
        $this->mposTenderBankReconpath = storage_path('app/public/reconciliation/mpos-reconciliation/store-mpos-tender');
        $this->mposBankMisReconpath = storage_path('app/public/reconciliation/mpos-reconciliation/store-mpos-bankmis');

    }


    protected function fileName(string $originalFileName, string $extension) {
        return $originalFileName . "_" . Carbon::now()->format('d-m-Y') . "_" . time() . '.' . $extension;
    }



    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function index(): View {
        return view('app.storeUser.process.index', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    public function cardRecon(): View {
        return view('app.storeUser.process.card-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    public function upiRecon(): View {
        return view('app.storeUser.process.upi-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function walletRecon(): View {
        return view('app.storeUser.process.wallet-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }




    public function mposCashRecon(): View {
        return view('app.storeUser.process.mpos-cash-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }




    public function allCardRecon() {
        return view('app.storeUser.process.all-card-recon', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore(),
        ]);
    }



    public function mposApprovalUpload(Request $request, string $id) {

        try {

            DB::beginTransaction();


            // uploading the file
            $file = $request->file('supportDocupload');
            $filename = $this->fileName($file->getClientOriginalName(), $file->getClientOriginalExtension());
            $file->move($this->mposBankMisReconpath, $filename);

            $_main = \App\Models\Process\MPOS\MPOSCashTenderBankDropCashMISReco::where('CashTenderBkDrpUID', $id)->first();
            $_main->update(['reconStatus' => 'Pending for Approval', 'processDt' => now()]);

            $_approval = [
                ...$request->except(['adjAmount', 'tenderAdj', 'bankAdj']),
                'supportDocupload' => $filename,
                "approveStatus" => 'pending',
                "recoMposDate" => $_main->transactionDate,
                "recoStoreID" => $_main->storeID,
                "recoTenderAmount" => $_main->cardSale,
                "recoDepositAmount" => $_main->depositAmount,
                'createdDate' => now()
            ];

            \App\Models\Process\MPOS\MPOSCashTenderBankDropCashMISRecoApproval::updateOrInsert($_approval);


            DB::commit();
            return response()->json(['message' => 'Success'], 200);

            // commit the transaction
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }




    public function cardApprovalUpload(Request $request, string $id) {

        try {
            DB::beginTransaction();

            $file = $request->file('supportDocupload');
            $filename = $this->fileName($file->getClientOriginalName(), $file->getClientOriginalExtension());
            $file->move($this->cardReconpath, $filename);

            $_main = SAPCardRecon::where('cardSalesRecoUID', $id)->first();
            $_main->update(['reconStatus' => 'Pending for Approval', 'processDt' => now()]);

            $_approval = [
                ...$request->except('adjAmount'),
                'supportDocupload' => $filename,
                "approveStatus" => 'pending',
                "recoSalesDate" => $_main->transactionDate,
                "recoStoreID" => $_main->storeID,
                "recoSalesAmount" => $_main->cardSale,
                "recoDepositAmount" => $_main->depositAmount,
                "corrrectionDate" => now(),
                'createdDate' => now()
            ];

            SAPCardReconApproval::updateOrInsert($_approval);
            DB::commit();
            return response()->json(['message' => 'Success'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }

    }




    public function upiApprovalUpload(Request $request, string $id) {
        try {
            DB::beginTransaction();

            $file = $request->file('supportDocupload');
            $filename = $this->fileName($file->getClientOriginalName(), $file->getClientOriginalExtension());
            $file->move($this->cardReconpath, $filename);

            $_main = SAPCardRecon::where('cardSalesRecoUID', $id)->first();
            $_main->update(['reconStatus' => 'Pending for Approval', 'processDt' => now()]);

            $_approval = [
                ...$request->except('adjAmount'),
                'supportDocupload' => $filename,
                "approveStatus" => 'pending',
                "recoSalesDate" => $_main->transactionDate,
                "recoStoreID" => $_main->storeID,
                "recoSalesAmount" => $_main->cardSale,
                "recoDepositAmount" => $_main->depositAmount,
                "corrrectionDate" => now(),
                'createdDate' => now()
            ];

            SAPCardReconApproval::updateOrInsert($_approval);
            DB::commit();
            return response()->json(['message' => 'Success'], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }




    public function walletApprovalUpload(Request $request, string $id) {

        try {

            DB::beginTransaction();

            $file = $request->file('supportDocupload');
            $filename = $this->fileName($file->getClientOriginalName(), $file->getClientOriginalExtension());
            $file->move($this->walletReconpath, $filename);

            $_main = SAPWalletRecon::where('walletSalesRecoUID', $id)->first();
            $_main->update(['reconStatus' => 'Pending for Approval', 'processDt' => now()]);

            $_approval = [
                ...$request->except('adjAmount'),
                'supportDocupload' => $filename,
                "approveStatus" => 'pending',
                "recoSalesDate" => $_main->transactionDate,
                "recoStoreID" => $_main->storeID,
                "recoSalesAmount" => $_main->walletSale,
                "recoDepositAmount" => $_main->depositAmount,
                "corrrectionDate" => now(),
                'createdDate' => now()
            ];

            SAPWalletReconApproval::updateOrInsert($_approval);
            DB::commit();
            return response()->json(['message' => 'Success'], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }



    /**
     * Summary of allCardApprovalUpload
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function allCardApprovalUpload(Request $request, string $id) {

        dd(1);

        try {
            DB::beginTransaction();
            // only do this when you have a document
            if ($request->hasFile('supportDocupload')) {

                $file = $request->file('supportDocupload');
                $filename = $this->fileName($file->getClientOriginalName(), $file->getClientOriginalExtension());
                $file->move($this->cardReconpath, $filename);

                SAPCardRecon::where('cardSalesRecoUID', $id)->update(['reconStatus' => 'Pending for Approval', 'adjAmount' => $request->adjAmount,
                    'createdBy' => auth()->user()->userUID, 'processDt' => now()]);

                SAPCardReconApproval::updateOrInsert([...$request->except('adjAmount'), 'supportDocupload' => $filename]);
                DB::commit();

                return response()->json(['message' => 'Success'], 200);
            }

            SAPCardRecon::where('cardSalesRecoUID', $id)->update(['reconStatus' => 'Pending for Approval', 'adjAmount' => $request->adjAmount,
                'createdBy' => auth()->user()->userUID, 'processDt' => now()]);

            SAPCardReconApproval::updateOrInsert([...$request->except(['adjAmount']), 'supportDocupload' => '']);
            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }

        return response()->json(['message' => 'Success'], 200);
    }




}