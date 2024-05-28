<div x-show="!showAlert" wire:ignore class="modal fade" id="upload_invoice_{{ $data->invoiceUID}}" style="z-index: 99999 !important;" x-init="() => {
    Livewire.on('invoice:modal_closed', () => {
        reset()
    })
}">
    <div wire:ignore class="modal-dialog modal-dialog-centered">
        <div wire:ignore class="modal-content" style="z-index: 6 !important;">
            <div class="modal-header">
                <h5 class="modal-title">Upload Invoice</h5>
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
                    <form wire:submit.prevent="uploadInvoice({{$data->invoiceUID}})">
                        <div class="row">
                            <div class="mb-3 col-12">
                                <label for="invoiceNo" class="form-label">Invoice No <span style="color: red">*</span></label>
                                <input type="text" class="form-control" wire:model.defer="invoiceNo" id="invoiceNo" value="{{$data->invoiceNo}}">
                                <div wire:ignore x-show="errors.has('invoiceNo')" class="text-danger">{{ $errors->first('invoiceNo') }}</div>
                            </div>
                            <div class="mb-3 col-12">
                                <label for="invoiceDate" class="form-label">Invoice Date <span style="color: red">*</span></label>
                                <input type="date" class="form-control" wire:model.defer="invoiceDate" id="invoiceDate" value="{{$data->invoiceDate}}">
                                <div wire:ignore x-show="errors.has('invoiceDate')" class="text-danger">{{ $errors->first('invoiceDate') }}</div>
                            </div>

                            <div class="mb-3 col-12">
                                <label for="invoiceFileName" class="form-label">File Upload</label>
                                <input type="file" class="form-control" wire:model="invoiceFileName" id="invoiceFileName" value="{{$data->invoiceFileName}}">
                                <div wire:loading wire:target="invoiceFileName">Uploading...</div>
                                @error('invoiceFileName') <span class="text-danger">{{ $message }}</span> @enderror
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>



                    </form>
                </div>
                <livewire:scripts />
            </div>

        </div>
    </div>
</div>
