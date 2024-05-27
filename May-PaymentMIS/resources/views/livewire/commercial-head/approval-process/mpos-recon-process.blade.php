<div>

    <x-app.commercial-head.approval-process.mpos-recon-process.filters>
        <x-app.commercial-head.approval-process.mpos-recon-process.main-filters storeId="select100-dropdown" show="main" :activeTab="$activeTab" :filtering="$filtering" :stores="$storesM" />

    </x-app.commercial-head.approval-process.mpos-recon-process.filters>
    {{-- counts --}}
    <section>
        <x-app.commercial-head.approval-process.mpos-recon-process.counts :activeTab="$activeTab" :cashRecons="$cashRecons" />
    </section>

    <div class="col-lg-12">
        {{-- Main sales table --}}
        <x-scrollable.scrollable :dataset="$cashRecons">
            <x-scrollable.scroll-head>

                @if($activeTab == 'main')
                <tr>
                    <th class="left">Sales Date</th>
                    <th class="left">Desposit Date</th>
                    <th class="left">Store ID</th>
                    <th class="left">Retek Code</th>
                    <th class="left">Brand Name</th>
                    <th class="left">Tender to BankDrop</th>
                    <th class="left">Tender to BankMIS</th>
                    <th class="left">Bank Drop ID</th>
                    <th class="left" style="text-align: right !important">BankDrop Amount</th>
                    <th class="left">Desposit SlipNo</th>
                    <th class="left" style="text-align: right !important">Tender Amount</th>
                    <th class="left" style="text-align: right !important">Deposit Amount</th>
                    <th class="left" style="text-align: right !important">Tender BankDrop Diff <br>[Tender - BankDrop]</th>
                    <th class="left" style="text-align: right !important">Tender to CashMIS Diff <br>[Tender - Deposit]</th>


                    <th class="left">Approved By</th>
                    <th class="left">Approved Date</th>
                    <th class="left">Recon Status</th>
                    <th class="left" style="text-align: right !important">Store Response Entry</th>
                    <th class="left" style="text-align: right !important">Recon Difference</th>
                    <th class="left">Process Date</th>
                    <th class="left">Approval Remarks</th>


                    <th class="left">History</th>
                </tr>
                @endif

            </x-scrollable.scroll-head>
            <x-scrollable.scroll-body>

                @if($activeTab == 'main')
                @foreach ($cashRecons as $data)
                <tr>
                    <td class="right">{{ !$data->mposDate ? '' : Carbon\Carbon::parse($data->mposDate)->format('d-m-Y') }}</td>
                    <td class="right">{{ !$data->depositDate ? '' : Carbon\Carbon::parse($data->depositDate)->format('d-m-Y') }}</td>
                    <td class="right">{{ $data->storeID }}</td>
                    <td class="right">{{ $data->retekCode }}</td>
                    <td class="right">{{ $data->brand }}</td>

                    <td class="right"> @if( $data->cashTenderStatus == "Not Matched") <span style="font-weight: 700; color: red;">{{ $data->cashTenderStatus }}</span> @else <span style="font-weight: 700; color: green;">{{ $data->cashTenderStatus }}</span> @endif </td>
                    <td class="right"> @if( $data->cashBankStatus == "Not Matched") <span style="font-weight: 700; color: red;">{{ $data->cashBankStatus }}</span> @else <span style="font-weight: 700; color: green;">{{ $data->cashBankStatus }}</span> @endif </td>

                    <td class="right">{{ $data->bankDropID }}</td>
                    <td class="right">{{ $data->bankDropAmountS }}</td>
                    <td class="right">{{ $data->depositSlipNo }}</td>
                    <td class="right">{{ $data->tenderAmountS }}</td>
                    <td class="right">{{ $data->depositAmountS }}</td>
                    <td class="right">{{ $data->tender_bank_differenceS }}</td>
                    <td class="right">{{ $data->bank_cash_differenceS }}</td>

                    <td class="right">{{ $data->approvedBy }}</td>
                    <td class="right">{{ Carbon\Carbon::parse($data->approvalDate)->format('d-m-Y') }}</td>
                    <td class="right">{{ $data->reconStatus }}</td>
                    <td class="right">{{ $data->adjAmount }}</td>
                    <td class="right">{{ $data->reconDifference }}</td>
                    <td class="right">{{ Carbon\Carbon::parse($data->processDt)->format('d-m-Y') }}</td>
                    <td class="right">{{ $data->approvalRemarks }}</td>

                    <td class="right"><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModalCenter_{{ $data->CashTenderBkDrpUID }}">View</a></td>

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

                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Bank Drop ID : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->bankDropID }}</h5>
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="col-lg-3">
                                                <div class="form-group">
                                                    <label for="exampleInputUsername1">
                                                        <h5>Bank Drop Amount : </h5>
                                                    </label>
                                                    <label for="exampleInputUsername1">
                                                        <h5>{{ $data->bankDropAmount }}</h5>
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
                                                <h5>Bank Drop Amount</h5>
                                            </div>
                                            <div class="col-lg-2">
                                                <h5>Collection Amount</h5>
                                            </div>
                                            <div class="col-lg-2">
                                                <h5>Difference [Sale-Collection]</h5>
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
                                                {{ $data->bankDropAmount }}
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
                                                <h5>Amount</h5>
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
                                        ->orderBy('mposBkMISSalesUID', 'desc')
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
                                                {{ !$item->creditDate ? '' : Carbon\Carbon::parse($item->creditDate)->format('d-m-Y') }}
                                            </div>
                                            <div class="col-lg-2  ">
                                                {{$item->slipnoORReferenceNo}}
                                            </div>

                                            <div class="col-lg-2 ">
                                                {{ $item->amount }}
                                            </div>

                                            <div class="col-lg-2">
                                                @if ($item->supportDocupload)
                                                <a href="{{ url('/') }}/storage/app/public/reconciliation/mpos-reconciliation/store-mpos-bankmis/{{ $item->supportDocupload }}" download><i class="fa fa-download"></i> Download</a>
                                                @else
                                                <p>NO FILE</p>
                                                @endif
                                            </div>

                                            <div class="col-lg-2 text-start">
                                                {{ $item->remarks }}
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
