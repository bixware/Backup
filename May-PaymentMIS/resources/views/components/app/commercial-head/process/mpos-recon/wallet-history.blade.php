<section class="d-flex" style="flex-direction: column; padding: 0 .8em;" id="">

    <div class="row cash-pickup">
        <div class="col-lg-2">
            <h5>Item</h5>
        </div>
        <div class="col-lg-2">
            <h5>Bank Name</h5>
        </div>
        <div class="col-lg-2">
            <h5>Credit Date</h5>
        </div>

        <div class="col-lg-2">
            <h5>Ref. No.
            </h5>
        </div>

        <div class="col-lg-2">
            <h5>Amount</h5>
        </div>

        <div class="col-lg-2">
            <h5>Remarks</h5>
        </div>

        <div class="col-lg-2">
            <h5>Supporting Documents</h5>
        </div>
    </div>

    @php
    $mainReconData = DB::table('MLF_Outward_MPOSWalletSalesReco_ApprovalProcess')
    ->where('mposWalletSalesRecoUID' ,$data->mposWalletSalesRecoUID)
    ->get();
    @endphp

    @foreach ($mainReconData as $main)
    <div class="row mainUploadItems cash-pickup-item">
        <div class="col-lg-2">
            {{ $main->item }}
        </div>
        <div class="col-lg-2">
            {{ $main->bankName }}
        </div>
        <div class="col-lg-2">
            {{ Carbon\Carbon::parse($main->creditDate)->format('d-m-Y') }}
        </div>

        <div class="col-lg-2">
            {{ $main->slipnoORReferenceNo }}
        </div>
        <div class="col-lg-2">
            {{ number_format($main->amount, 2) }}
        </div>
        <div class="col-lg-2">
            {{ $main->remarks }}
        </div>

        <div class="col-lg-2 pt-2 d-flex gap-3 justify-content-center">
            @if ($main->supportDocupload && $main->supportDocupload != 'undefined')
            <a download style="text-decoration: none" href="{{ url('/') }}/storage/app/public/reconciliation/card-reconciliation/MPOS/wallet-bank/{{ $main->supportDocupload }}">
                <i class="fa-solid fa-download"></i> Download
            </a>

            @endif

        </div>
    </div>
    @endforeach

    <div class="d-flex justify-content-end mt-4 mb-3 gap-3">
        <div class="form-group">
            <label for="">Sale Amount</label>
            <input disabled type="text" placeholder="Rs. 0.00" id="recon-amount" value="{{ number_format($data->tenderAmount, 2) }}" class="form-control">
        </div>

        {{-- @php
        $depositAmount = DB::table('MLF_Outward_MPOSWalletSalesReco_ApprovalProcess')
        ->where('mposWalletSalesRecoUID' ,$data->mposWalletSalesRecoUID)
        ->sum('differenceAmount');

        @endphp --}}


        <div class="form-group">
            <label for="">Deposit Amount</label>
            <input disabled type="text" placeholder="Rs. 0.00" id="recon-deposit-amount" value="{{ number_format($data->depositAmount, 2) }}" class="form-control">
        </div>


        <div class="form-group">
            <label for="">Store Respons Entry</label>
            <input disabled type="text" placeholder="Rs. 0.00" id="recon-deposit-amount" value="{{ number_format($data->adjAmount, 2) }}" class="form-control">
        </div>
        <div class="form-group">
            <label for="">Approval Status</label>
            <select id="approvalStatus" class="form-control" style="width: 300px">
                <option selected value="">Select Approval Status</option>
                <option value="approve">Approve</option>
                <option value="disapprove">Disapprove</option>
            </select>
        </div>

        <div class="form-group">
            <label for="">Remarks</label>
            <textarea id="remarks" style="width: 400px; height: 15vh;" type="text" placeholder="Enter the comments" class="form-control"></textarea>
        </div>
    </div>
</section>