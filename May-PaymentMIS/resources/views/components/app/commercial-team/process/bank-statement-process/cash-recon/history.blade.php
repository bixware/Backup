{{-- History tab for store user process --}}
<div>
    @php
    $historyRecords = DB::table('MLF_Outward_CashMISBankStReco_ApprovalProcess')
    ->where('cashMisBkStRecoUID',$data->cashMisBkStRecoUID)
    ->get();
    @endphp

    @forelse ($historyRecords as $item)

    <div style="background: rgba(211, 211, 211, 0.151); padding: 1em">

        <div class="p-3">
            <div class="d-flex justify-content-between align-items-center  mb-2">
                <h5 type="text" class="text-dark" data-name="item">{{$item->item}}</h5>
            </div>

            <div class="d-flex justify-content-center align-items-start gap-3 mb-1 pt-2" style="border-top: 2px solid #00000023; flex-wrap: nowrap">

                <div class="w-100">
                    <label for="">Bank Name</label>
                    <p class="text-black" style="font-weight: 700">{{ $item->bankName }}</p>
                </div>
                <div class="w-100">
                    <label for="">Credit Date</label>
                    <p class="text-black" style="font-weight: 700">{{ Carbon\Carbon::parse($item->creditDate)->format('d-m-Y')}}</p>
                </div>

                <div class="w-100">
                    <label for="">TID/MID / Ref. no.</label>
                    <p class="text-black" style="font-weight: 700">{{ $item->slipnoORReferenceNo }}</p>
                </div>


                <div class="w-100">
                    <label for="">Amount</label>
                    <p class="text-black" style="font-weight: 700">₹ {{ number_format($item->amount, 2) }}</p>
                </div>

                <div class="w-100">
                    <label for="">Remarks</label>
                    <p class="text-black" style="font-weight: 700">{{ $item->remarks }}</p>
                </div>
            </div>

            <div class="d-flex justify-content-center align-items-start gap-3 mb-1 pt-2" style=" border-bottom: 2px solid #00000023; flex-wrap: nowrap">


                <div class="w-100">
                    <label for="">Approval Status</label>
                    <p class="text-black" style="font-weight: 700">{{ $data->reconStatus}}</p>
                </div>
                <div class="w-100">
                    <label for="">Support Document</label>
                    <a download style="text-decoration: none; display: block;" href="{{ url('/') }}/storage/app/public/reconciliation/cash-reconciliation/cash-bank/{{ $item->supportDocupload }}">
                        <i class="fa-solid fa-download"></i> Download
                    </a>
                </div>
                <div class="w-100">
                    <label for="">Store Respons Entry</label>
                    <p class="text-black" style="font-weight: 700">₹ {{ number_format($data->adjAmount, 2) }}</p>
                </div>

                <div class="w-100">

                </div>
                <div class="w-100">

                </div>
            </div>
        </div>
    </div>

    @empty
    <p class="text-center text-black mt-3">History Not Found</p>
    @endforelse
</div>
