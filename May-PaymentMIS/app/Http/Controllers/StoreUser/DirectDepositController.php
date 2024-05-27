<?php

namespace App\Http\Controllers\StoreUser;

use App\Http\Controllers\Controller;
use App\Models\Masters\DirectDeposit;
use App\Models\Process\SAP\CardRecon as SAPCardRecon;
use App\Models\Process\SAP\CardReconApproval as SAPCardReconApproval;
use App\Models\Process\SAP\WalletRecon as SAPWalletRecon;
use App\Models\Process\SAP\WalletReconApproval as SAPWalletReconApproval;
use App\Models\Store;
use App\Services\GeneralService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class DirectDepositController extends Controller {





    protected function fileName(string $originalFileName, string $extension) {
        return $originalFileName . "_" . Carbon::now()->format('d-m-Y') . "_" . time() . '.' . $extension;
    }


    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function index(): View {
        return view('app.storeUser.direct-deposit.index', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    public function create(Request $request) {


        try {

            DB::beginTransaction();

            // $store = Store::where('Store ID', auth());

            if ($request->hasFile('depositSlipProof')) {
                // uploading the file
                $file = $request->file('depositSlipProof');
                $filename = $this->fileName($file->getClientOriginalName(), $file->getClientOriginalExtension());
                $file->move(storage_path('app/public/direct-deposit'), $filename);


                DirectDeposit::insert([
                    ...$request->except(['depositSlipProof']),
                    'storeID' => auth()->user()->store()['storeUID'],
                    'retekCode' => auth()->user()->store()['SAP'],
                    'status' => 'Pending for Approval',
                    'depositSlipProof' => $filename,
                    'createdDate' => now()->format('Y-m-d'),
                ]);

                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            DirectDeposit::insert([
                ...$request->except(['depositSlipProof']),
                'storeID' => auth()->user()->store()['storeUID'],
                'retekCode' => auth()->user()->store()['SAP'],
                'status' => 'Pending for Approval',
                'depositSlipProof' => null,
                'createdDate' => now()->format('Y-m-d'),
            ]);

            DB::commit();
            // commit the transaction
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }

        // return the main transaction
        return response()->json(['message' => 'Success'], 200);

    }
}