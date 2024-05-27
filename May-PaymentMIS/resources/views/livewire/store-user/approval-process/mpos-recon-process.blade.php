<div>
    {{--
    <x-app.store-user.approval-process.mpos-recon-process.tabs :activeTab="$activeTab" /> --}}

    {{-- Filter --}}
    <x-app.store-user.approval-process.mpos-recon-process.filters>
        <x-app.store-user.approval-process.mpos-recon-process.main-filters show="main" :activeTab="$activeTab" :filtering="$filtering" :months="$_months" />
    </x-app.store-user.approval-process.mpos-recon-process.filters>
    {{-- counts --}}
    <section>
        <x-app.store-user.approval-process.mpos-recon-process.counts :activeTab="$activeTab" :cashRecons="$cashRecons" />
    </section>

    <div class="col-lg-12">
        {{-- Main sales table --}}
        <x-scrollable.scrollable :dataset="$cashRecons">
            <x-scrollable.scroll-head>

                @if($activeTab == 'main')
                <tr>
                    <th>Sales Date</th>
                    <th>Desposit Date</th>
                    <th>Bank Drop ID</th>
                    <th>Desposit SlipNo</th>
                    <th style="text-align: right !important">Tender Amount</th>
                    <th style="text-align: right !important">Deposit Amount</th>
                    <th style="text-align: right !important">Tender to CashMIS Diff <br>[Tender - Deposit]</th>
                    <th>Reconciled Amount</th>
                    <th>Status</th>
                    <th>History</th>
                </tr>
                @endif

            </x-scrollable.scroll-head>
            <x-scrollable.scroll-body>

                @if($activeTab == 'main')
                @foreach ($cashRecons as $data)
                <tr>
                    <td>{{ Carbon\Carbon::parse($data->mposDate)->format('d-m-Y') }}</td>
                    <td>{{ Carbon\Carbon::parse($data->depositDate)->format('d-m-Y') }}</td>
                    <td>{{ $data->bankDropID }}</td>
                    <td>{{ $data->depositSlipNo }}</td>
                    <td style="text-align: right !important">{{ $data->tenderAmount }}</td>
                    <td style="text-align: right !important">{{ $data->depositAmount }}</td>
                    <td style="text-align: right !important">{{ $data->bank_cash_difference }}</td>
                    <td>{{ $data->amount }}</td>
                    <td> @if( $data->cashBankStatus == "Not Matched") <span style="font-weight: 700; color: red;">{{ $data->cashBankStatus }}</span> @else <span style="font-weight: 700; color: green;">{{ $data->cashBankStatus }}</span> @endif </td>
                    <td><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModalCenter_{{ $data->CashTenderBkDrpUID }}">View</a></td>

                    <div class="modal fade" id="exampleModalCenter_{{ $data->CashTenderBkDrpUID }}" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered " role="document" style="max-width:90%;">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Cash Reconciliation History</h5>
                                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form class="forms-sample">
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Store ID : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->storeID }} </h5>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Retek Code : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->retekCode }}</h5>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Brand : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->brand }}</h5>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Location : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->Location }}</h5>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3" style="margin-top: -20px">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Reconciliation Date : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ Carbon\Carbon::parse($data->processDt)->format('d-m-Y')
                                                            }}</h5>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3" style="margin-top: -20px">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Bank Drop ID : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->bankDropID }}</h5>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <h5>Reconciliation Window </h5>
                                    <section class="d-flex" style="flex-direction: column; padding: 0 .8em;" id="">

                                        <div class="row cash-pickup">
                                            <div class="col-lg-3">
                                                <h5>Deposit Date</h5>
                                            </div>
                                            <div class="col-lg-2">
                                                <h5>Tender Amount</h5>
                                            </div>
                                            <div class="col-lg-2">
                                                <h5>Collection Amount</h5>
                                            </div>
                                            <div class="col-lg-2">
                                                <h5 style="text-align: left !important">Difference [Sale-Collection]</h5>
                                            </div>
                                            <div class="col-lg-3">
                                                <h5>Approval Remarks</h5>
                                            </div>
                                        </div>

                                        <div class="row cash-pickup-item">
                                            <div class="col-lg-3">
                                                {{ Carbon\Carbon::parse($data->depositDate)->format('d-m-Y') }}
                                            </div>
                                            <div class="col-lg-2">
                                                {{ $data->tenderAmountF }}
                                            </div>
                                            <div class="col-lg-2">
                                                {{ $data->depositAmount }}
                                            </div>
                                            <div id="difference" class="col-lg-2">
                                                {{ $data->bank_cash_differenceF }}
                                            </div>
                                            <div id="difference" class="col-lg-3">
                                                {{ $data->approvalRemarks }}
                                            </div>
                                        </div>
                                    </section>
                                    <br>


                                    <h5>History</h5>

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
                                                <h5>Reference No.</h5>
                                            </div>

                                            <div class="col-lg-2">
                                                <h5>Reconciled Amount</h5>
                                            </div>


                                            <div class="col-lg-2">
                                                <h5>Support Document</h5>
                                            </div>

                                            <div class="col-lg-2">
                                                <h5>Store Remarks</h5>
                                            </div>

                                            <div class="col-lg-3">
                                                <h5>Approval Status</h5>
                                            </div>
                                        </div>

                                        @php

                                        $historyRecords =
                                        \App\Models\Process\MPOS\MPOSCashTenderBankDropCashMISRecoApproval::where('CashTenderBkDrpUID',$data->CashTenderBkDrpUID)
                                        ->get();

                                        @endphp

                                        @foreach ($historyRecords as $item)

                                        <div class="row mainUploadItems cash-pickup-item">
                                            {{-- style="border-bottom: 1px solid #000" --}}

                                            <div class="col-lg-2 text-start">
                                                {{$item->item}}
                                            </div>
                                            <div class="col-lg-2  ">
                                                {{$item->bankName}}
                                            </div>
                                            <div class="col-lg-2  ">
                                                {{$item->creditDate}}
                                            </div>
                                            <div class="col-lg-2  ">
                                                {{$item->slipnoORReferenceNo}}
                                            </div>

                                            <div class="col-lg-2 ">
                                                {{ $item->amount}}
                                            </div>

                                            <div class="col-lg-2">
                                                @if ($item->supportDocupload)
                                                <a href="{{ url('/') }}/storage/app/public/reconciliation/mpos-reconciliation/store-mpos-bankmis/{{ $item->supportDocupload }}" download><i class="fa fa-download"></i> Download</a>
                                                @else
                                                <p>NO FILE</p>
                                                @endif
                                            </div>

                                            <div class="col-lg-2 text-start">
                                                {{ $item->remarks}}
                                            </div>

                                            <div class="col-lg-3 ">
                                                {{ ucfirst($data->reconStatus) }}
                                            </div>
                                        </div>
                                        @endforeach
                                    </section>
                                    <br>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn grey" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </tr>
                @endforeach
                @endif

            </x-scrollable.scroll-body>
        </x-scrollable.scrollable>


        <script>
            var $j = jQuery.noConflict();
            $j('.searchField').select2();


            document.addEventListener('livewire:load', function() {
                $j('#select100-dropdown').on('change', function(e) {
                    @this.set('filtering', true);
                    @this.set('store', e.target.value);
                });
            });

        </script>

    </div>
