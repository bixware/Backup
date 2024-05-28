<x-app.commercial-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data="{
        showAlert: false,
        success: false,
        error: null,
    }" x-init="() => {

        Livewire.on('invoiceMonth:modal_closed', (message) => {
            showAlert = true;
            success = true;
            error:message;
            $('#view_invoicemonth').modal('hide');

        });

        Livewire.on('invoiceMonth:error', (message) => {
            showAlert = true;
            success = false;
            error = message;
            $('#view_invoicemonth').modal('hide');
        })

    }">


        <template x-if="showAlert == true && success == true">
            <div class="alert alert-success alert-sm alert-dismissible fade show" role="alert">
                <strong>Successful!</strong> The Invoice Month have been created
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </template>

        <!-- Error Alert -->
        <template x-if="showAlert == true && success == false">
            <div class="alert alert-danger alert-sm alert-dismissible fade show" role="alert">
                <strong>Failure!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </template>

        <div class="row mt-2">
            <div class="col-lg-10 py-3">
                <div class="d-flex d-flex-mob " style="gap: .5em; flex-wrap: wrap;">
                    <div style="display: @if ($filtering) unset @else none @endif;">
                        <button class="btn btn-primary btn-sm" @click="() => { $wire.back(); reset(); }" style="background: transparent; outline: none; border: none; padding: .5em 1em; font-size: 1em;">
                            Clear
                        </button>
                    </div>

                    {{-- <x-filters.dropdown initialValue="SELECT A MONTH" keys="invoiceMonth" :dataset="$month" />
                    <x-filters.dropdown-two initialValue="SELECT A YEAR" keys="invoiceYear" :dataset="$year" /> --}}
                </div>

            </div>
            <div class="col-lg-2">
                {{-- <div class="d-flex justify-content-end py-3">
                    <button data-bs-target="#hdfcbank" data-bs-toggle="modal" class="btn btn-primary btn-sm">
                        <i class="fa fa-plus" data-bs-target="#LEandOPUploadModal"></i> Upload
                    </button>
                </div>
                <div class="d-flex justify-content-end flex-column flex-md-row gap-md-4 align-items-end">
                    <p class="mainheadtext">Record Count : <span class="blackh">{{ isset($dataset[0]->TotalCount) ? $dataset[0]->TotalCount : '0' }}</span></p>
            </div> --}}
        </div>
    </div>


    <div class="">
        <x-scrollable.scrollable :dataset="$dataset">
            <x-scrollable.scroll-head>

                <tr class="bggrey" style="background: gray !important">
                    <th style="background: lightgray !important" class="left">Invoic Date</th>
                    <th style="background: lightgray !important" class="left">Store Code</th>
                    <th style="background: lightgray !important" class="left">Store Name</th>
                    <th style="background: lightgray !important" class="left">Landlord Name</th>
                    <th style="background: lightgray !important" class="left">Amount</th>
                    <th style="background: lightgray !important" class="left">Month</th>
                    <th style="background: lightgray !important" class="left">Year</th>
                    <th style="background: lightgray !important" class="left">Filename</th>
                    <th style="background: lightgray !important" class="left">Invoice FileName</th>
                    <th style="background: lightgray !important" class="left">Uploaded Date</th>

                </tr>

            </x-scrollable.scroll-head>
            <x-scrollable.scroll-body>
                {{-- @dd($dataset); --}}
                @foreach ($dataset as $data)
                <tr>
                    <td>{{ !$data->invoiceDate ? '' : \Carbon\Carbon::parse($data->invoiceDate)->format('d-m-Y') }}</td>
                    <td>{{ $data->storeCode }}</td>
                    <td>{{ $data->storeName }}</td>
                    <td>{{ $data->landlordName }}</td>
                    <td>{{ $data->amount }}</td>
                    <td>{{ $data->month }}</td>
                    <td>{{ $data->year }}</td>
                    <td>{{ $data->filename }}</td>
                    <td>{{ $data->invoiceFileName }}</td>
                    <td>{{ $data->createdDate }}</td>

                </tr>

                @endforeach
            </x-scrollable.scroll-body>
        </x-scrollable.scrollable>
    </div>

    <div wire:ignore>
        <x-modals.uploadfiles.invoicemonth />
    </div>
    </div>
</x-app.commercial-layout>
