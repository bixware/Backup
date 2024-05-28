<x-app.landlord-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data="{
        showAlert: false,
        success: false,
        error: null,
    }" x-init="() => {

        Livewire.on('invoice:modal_closed', (id) => {
            showAlert = true;
            success = true;
            const invoice_id = '#upload_invoice_'+id[0]
            $(invoice_id).modal('hide');

            // Optionally, clear the form fields or reset modal state here
        });

    }">
        <div class="d-flex justify-content-end py-4">
            {{-- <button data-bs-target="#hdfcbank" data-bs-toggle="modal" class="btn btn-primary btn-sm">
                <i class="fa fa-plus" data-bs-target="#LEandOPUploadModal"></i> Upload
            </button> --}}
        </div>
        @if($successMessage)
        <div class="alert alert-success">{{ $successMessage }}</div>
        @endif
        <x-filters.dropdown initialValue="SELECT A MONTH" keys="month" :dataset="$month" />
        <div class="">
            <x-scrollable.scrollable :dataset="$dataset">
                <x-scrollable.scroll-head>

                    <tr class="bggrey" style="background: gray !important">
                        <th style="background: lightgray !important" class="left">Store Code</th>
                        <th style="background: lightgray !important" class="left">Invoice Number</th>
                        <th style="background: lightgray !important" class="left">Attachment</th>
                        <th style="background: lightgray !important" class="left">Amount</th>
                        <th style="background: lightgray !important" class="left">Invoice Date</th>
                        <th style="background: lightgray !important" class="left">Status</th>
                    </tr>

                </x-scrollable.scroll-head>
                <x-scrollable.scroll-body>
                    @foreach ($dataset as $data)
                    <tr>
                        {{-- @dd($data->invoiceUID); --}}
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->invoiceNo }}</td>
                        <td>{{ $data->invoiceFileName }}</td>
                        <td>{{ $data->amount }}</td>
                        <td>{{ $data->invoiceDate }}</td>
                        @if(!$data->invoiceFileName)
                        <td>
                            <button data-bs-target="#upload_invoice_{{ $data->invoiceUID}}" data-bs-toggle="modal" class="btn btn-primary btn-sm">Upload</button>
                        </td>
                        <div wire:ignore>
                            <x-modals.uploadfiles.invoice :data="$data" />
                        </div>
                        @else
                        <td>Paid</td>
                        @endif

                    </tr>
                    @endforeach
                </x-scrollable.scroll-body>
            </x-scrollable.scrollable>
        </div>


    </div>
</x-app.landlord-layout>
