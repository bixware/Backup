<div class="row mb-4">
    <div class="col-lg-9">
        <ul class="nav nav-tabs justify-content-start" role="tablist">
            {{-- <li class="nav-item">
                <a wire:click="switchTab('store2wallet')" class="nav-link @if($activeTab === 'store2wallet') active tab-active @endif" data-bs-toggle="tab" href="#" role="tab" style="font-size: .8em !important">STORE SALE TO WALLET MIS RECON
                </a>
            </li> --}}
            <li class="nav-item">
                <a wire:click="switchTab('wallet2bank')" class="nav-link @if($activeTab === 'wallet2bank') active tab-active @endif" data-bs-toggle="
                        tab" href="#" role="tab" style="font-size: .8em !important">
                    WALLET MIS TO BANK STATEMENT RECON
                </a>
            </li>
        </ul>
    </div>
    <div class="col-lg-3 d-flex align-items-center justify-content-end">
        <div class="btn-group mb-1">
        </div>
    </div>
</div>
