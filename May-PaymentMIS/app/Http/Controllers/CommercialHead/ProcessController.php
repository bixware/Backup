<?php

namespace App\Http\Controllers\CommercialHead;

use App\Http\Controllers\Controller;
use App\Models\Process\MPOS\Cash\CashBankRecon;
use App\Models\Process\MPOS\Cash\CashBankReconApproval;
use App\Models\Process\MPOS\Cash\CashRecon;
use App\Models\Process\MPOS\Cash\CashReconApproval;
use App\Models\Process\MPOS\MPOSCashTenderBankDropCashMISReco;
use App\Models\Process\MPOS\MPOSCashTenderBankDropCashMISRecoApproval;
use App\Models\Process\SAP\CardRecon;
use App\Models\Process\SAP\CardReconApproval;
use App\Models\Process\SAP\WalletRecon;
use App\Models\Process\SAP\WalletReconApproval;
use App\Services\GeneralService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;


class ProcessController extends Controller {



    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function index(): View {
        return view('app.commercial-head.process.index', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }



    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function MPOSRecon(): View {
        return view('app.commercial-head.process.mpos-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function CardRecon(): View {
        return view('app.commercial-head.process.card-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function UPIRecon(): View {
        return view('app.commercial-head.process.upi-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }


    /**
     * Process
     * @return \Illuminate\View\View
     */
    public function WalletRecon(): View {
        return view('app.commercial-head.process.wallet-recon-process', [
            'menus' => (new GeneralService)->menus(),
            'tabs' => (new GeneralService)->tabs(),
            'brandAndStore' => (new GeneralService)->brandAndStore()
        ]);
    }







    public function MPOSMainReconApproval(Request $request, string $id) {

        try {

            DB::beginTransaction();
            // creating a builder
            $builder = MPOSCashTenderBankDropCashMISReco::where('CashTenderBkDrpUID', $id);

            // createing a sub builder for approval process
            $_records = MPOSCashTenderBankDropCashMISRecoApproval::where('CashTenderBkDrpUID', $id)
                ->where('approveStatus', '!=', 'disapprove');

            $records = MPOSCashTenderBankDropCashMISRecoApproval::where('CashTenderBkDrpUID', $id)
                ->where('approveStatus', '!=', 'disapprove')
                ->where('approveStatus', 'pending');


            // updating the status manually
            $records->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now(),
                'modifiedDate' => now(),
                'cheadRemarks' => $request->remarks
            ]);


            // if the approval status is rejected 
            if ($request->approvalStatus != 'approve') {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);

                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }


            // getting the totals from the records
            $reconItem = $builder->first();
            $storeID = $reconItem->storeID;
            $creditDate = $reconItem->mposDate;

            $summedAdjustment = $_records->sum('amount');
            $isDifferenceMatchedSummedAdjustment = $reconItem->bankCashDifference == $summedAdjustment;

            // updating the main table
            if ($isDifferenceMatchedSummedAdjustment == true) {

                // updating the main column
                $builder->update([
                    'cashMISStatus' => 'Matched',
                    'adjAmount' => $summedAdjustment,
                    'reconStatus' => "approve",
                    'approvalRemarks' => $request->remarks
                ]);

                DB::statement('RECON_ALLTENDER_Reconciliation_UPDATE_FROMRECO_TABLES_Recalcualte_Difference :store, :date', [
                    'store' => $storeID,
                    'date' => $creditDate
                ]);
            } else {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Success'], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }






    public function cardReconApproval(Request $request, string $id) {
        try {
            DB::beginTransaction();

            // creating a builder
            $builder = CardRecon::where('cardSalesRecoUID', $id);

            // createing a sub builder for approval process
            $_records = CardReconApproval::where('cardSalesRecoUID', $id)
                ->where('approveStatus', '!=', 'disapprove');

            $records = CardReconApproval::where('cardSalesRecoUID', $id)
                ->where('approveStatus', '!=', 'disapprove')
                ->where('approveStatus', 'pending');


            // updating the records which are common
            $records->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now(),
                'modifiedDate' => now(),
                'cheadRemarks' => $request->remarks
            ]);

            // if the approval status is rejected 
            if ($request->approvalStatus != 'approve') {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);

                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            // getting the totals from the records
            $reconItem = $builder->first();
            $storeID = $reconItem->storeID;
            $creditDate = $reconItem->transactionDate;

            $summedAdjustment = $_records->sum('saleAmount');
            $isDifferenceMatchedSummedAdjustment = $reconItem->diffSaleDeposit == $summedAdjustment;

            // updating the main table
            if ($isDifferenceMatchedSummedAdjustment == true) {
                // updating the main column
                $builder->update([
                    'status' => 'Matched',
                    'adjAmount' => $summedAdjustment,
                    'approvedBy' => auth()->user()->userUID,
                    'approvedDate' => now()->format('d-m-Y'),
                    'reconStatus' => "approve",
                    'approvalRemarks' => $request->remarks
                ]);

                DB::statement('RECON_ALLTENDER_Reconciliation_UPDATE_FROMRECO_TABLES_Recalcualte_Difference :store, :date', [
                    'store' => $storeID,
                    'date' => $creditDate
                ]);

            } else {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Success'], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }




    public function upiReconApproval(Request $request, string $id) {
        try {
            DB::beginTransaction();

            // creating a builder
            $builder = CardRecon::where('cardSalesRecoUID', $id);

            // createing a sub builder for approval process
            $_records = CardReconApproval::where('cardSalesRecoUID', $id)
                ->where('approveStatus', '!=', 'disapprove');

            $records = CardReconApproval::where('cardSalesRecoUID', $id)
                ->where('approveStatus', '!=', 'disapprove')
                ->where('approveStatus', 'pending');


            // updating the records which are common
            $records->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now(),
                'modifiedDate' => now(),
                'cheadRemarks' => $request->remarks
            ]);

            // if the approval status is rejected 
            if ($request->approvalStatus != 'approve') {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);

                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            // getting the totals from the records
            $reconItem = $builder->first();
            $storeID = $reconItem->storeID;
            $creditDate = $reconItem->transactionDate;

            $summedAdjustment = $_records->sum('saleAmount');
            $isDifferenceMatchedSummedAdjustment = $reconItem->diffSaleDeposit == $summedAdjustment;

            // updating the main table
            if ($isDifferenceMatchedSummedAdjustment == true) {
                // updating the main column
                $builder->update([
                    'status' => 'Matched',
                    'adjAmount' => $summedAdjustment,
                    'approvedBy' => auth()->user()->userUID,
                    'approvedDate' => now()->format('d-m-Y'),
                    'reconStatus' => "approve",
                    'approvalRemarks' => $request->remarks
                ]);

                DB::statement('RECON_ALLTENDER_Reconciliation_UPDATE_FROMRECO_TABLES_Recalcualte_Difference :store, :date', [
                    'store' => $storeID,
                    'date' => $creditDate
                ]);

            } else {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Success'], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }






    public function walletReconApproval(Request $request, string $id) {

        try {

            DB::beginTransaction();



            // creating a builder
            $builder = WalletRecon::where('walletSalesRecoUID', $id);

            // createing a sub builder for approval process
            $_records = WalletReconApproval::where('walletSalesRecoUID', $id)
                ->where('approveStatus', '!=', 'disapprove');

            $records = WalletReconApproval::where('walletSalesRecoUID', $id)
                ->where('approveStatus', '!=', 'disapprove')
                ->where('approveStatus', 'pending');


            // updating the status manually
            $records->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now(),
                'modifiedDate' => now(),
                'cheadRemarks' => $request->remarks
            ]);


            // if the approval status is rejected 
            if ($request->approvalStatus != 'approve') {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);

                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            // getting the totals from the records
            $reconItem = $builder->first();
            $storeID = $reconItem->storeID;
            $creditDate = $reconItem->transactionDate;

            $summedAdjustment = $_records->sum('saleAmount');
            $isDifferenceMatchedSummedAdjustment = $reconItem->diffSaleDeposit == $summedAdjustment;

            // updating the main table
            if ($isDifferenceMatchedSummedAdjustment == true) {
                // updating the main column
                $builder->update([
                    'status' => 'Matched',
                    'adjAmount' => $summedAdjustment,
                    'approvedBy' => auth()->user()->userUID,
                    'approvedDate' => now()->format('d-m-Y'),
                    'reconStatus' => "approve",
                    'approvalRemarks' => $request->remarks
                ]);

                DB::statement('RECON_ALLTENDER_Reconciliation_UPDATE_FROMRECO_TABLES_Recalcualte_Difference :store, :date', [
                    'store' => $storeID,
                    'date' => $creditDate
                ]);

            } else {
                $builder->update([
                    "reconStatus" => "Pending"
                ]);
            }

            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
        return response()->json(['message' => 'Success'], 200);
    }




    public function cashBankReconApproval(Request $request, string $id) {

        try {

            DB::beginTransaction();
            // creating a builder
            $builder = DB::table('MFL_Outward_CashMISBkStReco')
                ->where('cashMisBkStRecoUID', $id);



            // createing a sub builder for approval process
            $subBuiled = DB::table('MLF_Outward_CashMISBankStReco_ApprovalProcess')
                ->where('cashMisBkStRecoUID', $id);


            // updating the status manually
            $subBuiled->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now()
            ]);


            // updating the main table
            $builder->update([
                'approvalRemarks' => $request->remarks,
                'status' => $request->approvalStatus == 'approve' ? 'Matched' : 'Not Matched',
                'reconStatus' => $request->approvalStatus
            ]);


            if ($request->approvalStatus != 'approve') {
                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }


            // getting the sales amount
            $cashSale = $builder->first();


            // get Adj amount from builder
            $adjustmentAmount = $cashSale->adjAmount;


            // sum the difference and adj amount 
            $reconDifference = $cashSale->creditAmount - ($cashSale->depositAmount + $adjustmentAmount);


            $builder->update([
                'reconDifference' => $reconDifference
            ]);

            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }

        // main return
        return response()->json(['message' => 'Success'], 200);
    }


    /**
     * UPI Reconciliation
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return JsonResponse|mixed
     */
    public function UPIBankReconApproval(Request $request, string $id) {

        try {

            DB::beginTransaction();
            // creating a builder
            $builder = DB::table('MFL_Outward_CardMISBankStReco')
                ->where('cardMisBankStRecoUID', $id);

            // createing a sub builder for approval process
            $subBuiled = DB::table('MLF_Outward_CardMISBankStReco_ApprovalProcess')
                ->where('cardMisBkStRecoUID', $id);

            // updating the status manually
            $subBuiled->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now()
            ]);

            // updating the main table
            $builder->update([
                'status' => $request->approvalStatus == 'approve' ? 'Matched' : 'Not Matched',
                'reconStatus' => $request->approvalStatus,
                'approvalRemarks' => $request->remarks
            ]);


            if ($request->approvalStatus != 'approve') {
                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            // getting the sales amount
            $cashSale = $builder->first();

            $adjustmentAmount = floatval($cashSale->adjAmount);
            // sum the difference and adj amount 
            $reconDifference = floatval($cashSale->creditAmount) - (floatval($cashSale->depositAmount) + floatval($adjustmentAmount));

            $builder->update([
                'reconDifference' => $reconDifference ? floatval(number_format($reconDifference, 2, null, null)) : 0
            ]);

            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
        // main return
        return response()->json(['message' => 'Success'], 200);
    }




    public function walletBankReconApproval(Request $request, string $id) {

        try {

            DB::beginTransaction();
            // creating a builder
            $builder = DB::table('MFL_Outward_WalletMISBankStReco')
                ->where('walletMisBankStRecoUID', $id);

            // createing a sub builder for approval process
            $subBuiled = DB::table('MLF_Outward_WalletMISBankStReco_ApprovalProcess')
                ->where('walletMisBkStRecoUID', $id);

            // updating the status manually
            $subBuiled->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now()
            ]);



            // updating the main table
            $builder->update([
                'status' => $request->approvalStatus == 'approve' ? 'Matched' : 'Not Matched',
                'reconStatus' => $request->approvalStatus,
                'approvalRemarks' => $request->remarks
            ]);


            if ($request->approvalStatus != 'approve') {
                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            // getting the sales amount
            $cashSale = $builder->first();

            $adjustmentAmount = floatval($cashSale->adjAmount);
            // sum the difference and adj amount 
            $reconDifference = floatval($cashSale->creditAmount) - (floatval($cashSale->depositAmount) + floatval($adjustmentAmount));

            $builder->update([
                'reconDifference' => $reconDifference ? floatval(number_format($reconDifference, 2, null, null)) : 0
            ]);

            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
        // main return
        return response()->json(['message' => 'Success'], 200);
    }



    public function cardBankReconApproval(Request $request, string $id) {

        try {

            DB::beginTransaction();
            // creating a builder
            $builder = DB::table('MFL_Outward_CardMISBankStReco')
                ->where('cardMisBankStRecoUID', $id);



            // createing a sub builder for approval process
            $subBuiled = DB::table('MLF_Outward_CardMISBankStReco_ApprovalProcess')
                ->where('cardMisBkStRecoUID', $id);


            // dd($builder->get(), $subBuiled->get());
            // updating the status manually
            $subBuiled->update([
                'approveStatus' => $request->approvalStatus,
                'approvedBy' => auth()->user()->userUID,
                'approvalDate' => now(),
                'modifiedDate' => now(),
                'cheadRemarks' => $request->remarks
            ]);

            // updating the main table
            $builder->update([
                'status' => $request->approvalStatus == 'approve' ? 'Matched' : 'Not Matched',
                'reconStatus' => $request->approvalStatus,
                'approvalRemarks' => $request->remarks
            ]);


            if ($request->approvalStatus != 'approve') {
                DB::commit();
                return response()->json(['message' => 'Success'], 200);
            }

            // getting the sales amount
            $cashSale = $builder->first();

            // get Adj amount from builder
            $adjustmentAmount = floatval($cashSale->adjAmount);

            // sum the difference and adj amount 
            $reconDifference = floatval($cashSale->creditAmount) - (floatval($cashSale->depositAmount) + floatval($adjustmentAmount));

            $builder->update([
                'reconDifference' => $reconDifference ? floatval(number_format($reconDifference, 2, null, null)) : 0
            ]);

            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['message' => $th->getMessage()], 500);
        }
        // main return
        return response()->json(['message' => 'Success'], 200);
    }

}