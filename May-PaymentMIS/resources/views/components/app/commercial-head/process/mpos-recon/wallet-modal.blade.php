<div class="modal fade" id="exampleModalCenterSecondTab_{{ $data->mposWalletSalesRecoUID }}" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered " role="document" style="max-width:90%;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">MPOS Wallet Reconciliation</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <x-app.commercial-head.process.mpos-recon.wallet-popup-headers :data="$data" />
                <br>
                {{-- Recon window --}}
                <h5>Reconciliation Window </h5>
                 <x-app.commercial-head.process.mpos-recon.wallet-recon-window :data="$data" /> 
                <br>

                {{-- History --}}
                <h5>Manual Entry By Store for reconciliation</h5>
                <x-app.commercial-head.process.mpos-recon.wallet-history :data="$data" />
            </div>
            <div class="modal-footer">

                <div class="footer-loading-btn" style="display: none; text-align:left; margin: 0 1em; flex: 1; color: #000">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <span>Loading ...</span>
                </div>

                <button x-data @click="(e) => handleWalletFormData(e, 'exampleModalCenterSecondTab_{{ $data->mposWalletSalesRecoUID }}')" style="" data-id="{{ $data->mposWalletSalesRecoUID }}" type="button" id="modalSubmitButton" class="btn btn-success green">Save</button>

                <button type="button" class="btn grey" data-bs-dismiss="modal">Cancel</button>
            </div>

        </div>
    </div>
</div>
