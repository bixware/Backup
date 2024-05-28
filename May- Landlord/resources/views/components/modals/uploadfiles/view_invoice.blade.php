<div x-show="!showAlert" wire:ignore class="modal fade" id="view_invoice_{{ $data->invoiceUID}}" style="z-index: 99999 !important;" 
    x-init="() => {
        Livewire.on('invoice:modal_closed', () => {
            reset()
        })
    }" 
    >
        <div wire:ignore class="modal-dialog modal-dialog-centered" style="max-width: 1200px !important;">
            <div wire:ignore class="modal-content" style="z-index: 6 !important;">
                <div class="modal-header">
                    <h5 class="modal-title">Invoice Details</h5>
                    <div class="right">
                      <button type="button" class="close" data-bs-dismiss="modal">
                        <span aria-hidden="true"><i class="fa fa-times"></i></span>
                    </button>
                  </div>
                </div>
    
                <div class="modal-body">
                    <div>
                        <div x-show="errors.length > 0" class="mt-3">
                            <div class="alert alert-danger" role="alert" x-text="errors.join(' ')"></div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col-6">
                                <label for="invoiceNo" class="fosrm-label">Store Code : </label>
                                <p>{{ $data->storeCode }}</p>
                            </div>
                            <div class="mb-3 col-6">
                                <label for="invoiceDate" class="form-label">Store Name : </label>
                                <p>{{ $data->storeName }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col-6">
                                <label for="invoiceNo" class="fosrm-label">LandlordName : </label>
                                <p>{{ $data->landlordName }}</p>
                            </div>
                            <div class="mb-3 col-6">
                                <label for="invoiceDate" class="form-label">Invoice Amount : </label>
                                <p>{{ $data->amount }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col-6">
                                <label for="invoiceNo" class="fosrm-label">Invoice Month : </label>
                                <p>{{ $data->month }}</p>
                            </div>
                            <div class="mb-3 col-6">
                                <label for="invoiceDate" class="form-label">Invoice Date : </label>
                                <p>{{ $data->invoiceDate }}</p>
                            </div>
                        </div>
                            <div class="row">
                                <div class="mb-3 col-6">
                                    <label for="invoiceNo" class="fosrm-label">Invoice No : </label>
                                    <p>{{ $data->invoiceNo }}</p>
                                </div>
                                <div class="mb-3 col-6">
                                   <label for="invoiceDate" class="form-label">Invoice File Name : <a href="{{ asset('storage/app/public/invoice/' . $data->invoiceFileName) }}" download="{{ $data->invoiceFileName }}">{{ $data->invoiceFileName }}</a>

                                    </label>
                                </div>
                               
                                
                                
                                
                            </div>
                                                  
                    </div>
                    <livewire:scripts />
                </div>
            </div>
        </div>
    </div>
    
