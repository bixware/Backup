<div x-show="!showAlert" wire:ignore class="modal fade" id="view_invoicemonth" style="z-index: 99999 !important;" x-data="{
        invoiceMonth: '',
        invoiceYear: '',
        publishedDate: '',
        errors: [],

        validateForm() {
            this.errors = [];

            if (!this.invoiceYear) {
                this.errors.push('invoiceYear is required.');
            }

            if (!this.invoiceMonth) {
                this.errors.push('invoiceMonth is required.');
            }

            if (!this.publishedDate) {
                this.errors.push('publishedDate is required.');
            }

            return this.errors.length === 0;
        },

        submit() {
            if (!this.validateForm()) {
                return false;
            }
        },

        resetForm() {
            this.invoiceMonth = '';
            this.invoiceYear = '';
            this.publishedDate = '';
            this.errors = [];
        }
     }" x-init="() => {
        Livewire.on('invoiceMonth:modal_closed', () => {
            this.resetForm();
        })
     }">
    <form wire:submit.prevent="uploadInvoiceMonth" @submit.prevent="submit">
        <div wire:ignore class="modal-dialog modal-dialog-centered">
            <div wire:ignore class="modal-content" style="z-index: 6 !important;">
                <div class="modal-header">
                    <h5 class="modal-title">Upload Invoice Month</h5>
                    <div class="right">
                        <button type="button" class="close" data-bs-dismiss="modal">
                            <span aria-hidden="true"><i class="fa fa-times"></i></span>
                        </button>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="mb-3 col-12">
                            <label for="invoiceMonth" class="form-label">Invoice Month <span style="color: red">*</span></label>
                            <input type="text" class="form-control" wire:model.defer="invoiceMonth" id="invoiceMonth" x-model="invoiceMonth">
                            <div x-show="errors.includes('invoiceMonth is required.')" class="text-danger">Invoice Month is required.</div>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="invoiceYear" class="form-label">Invoice Year <span style="color: red">*</span></label>
                            <input type="text" class="form-control" wire:model.defer="invoiceYear" id="invoiceYear" x-model="invoiceYear">
                            <div x-show="errors.includes('invoiceYear is required.')" class="text-danger">Invoice Year is required.</div>
                        </div>
                        <div class="mb-3 col-12">
                            <label for="publishedDate" class="form-label">Published Date <span style="color: red">*</span></label>
                            <input type="date" class="form-control" wire:model.defer="publishedDate" id="publishedDate" x-model="publishedDate">
                            <div x-show="errors.includes('publishedDate is required.')" class="text-danger">Published Date is required.</div>
                        </div>
                        {{-- <div class="mb-3 col-12">
                            <label for="invoiceMonthFileName" class="form-label">File Upload</label>
                            <input type="file" class="form-control" wire:model="invoiceMonthFileName" id="invoiceMonthFileName">
                            <div wire:loading wire:target="invoiceMonthFileName">Uploading...</div>
                        </div> --}}
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
