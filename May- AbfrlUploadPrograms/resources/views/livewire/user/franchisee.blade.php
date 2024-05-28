<x-app.user-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data>
        <div class="row mt-2">
            <div class="col-lg-10 py-3">
                <div class="d-flex d-flex-mob " style="gap: .5em; flex-wrap: wrap;">

                    <div style="display:@if ($filtering) unset @else none @endif" class="">
                        <button class="btn btn-primary btn-sm" @click="() => {
                        $wire.back()
                        reset()
                    }" style="background: transparent; outline: none; border: none; padding: .5em 1em; font-size: 1em">
                            {{-- <i class="fa fa-arrow-left"></i> --}}
                            Clear
                        </button>
                    </div>

                    <x-filters.dropdown-one initialValue="SELECT A STORE CODE" keys="storeCode" :dataset="$store_Code" />
                    <x-filters.dropdown-nine initialValue="SELECT A STORE NAME" keys="vendorCode" :dataset="$vendor_Code" />
                    {{-- <x-filters.date-filter /> --}}

                </div>

            </div>
            <div class="col-lg-2">
                <div class="d-flex justify-content-end py-3">
                    <button data-bs-target="#hdfcbank" data-bs-toggle="modal" class="btn btn-primary btn-sm">
                        <i class="fa fa-plus" data-bs-target="#LEandOPUploadModal"></i> Upload
                    </button>
                </div>
                <div class="d-flex justify-content-end flex-column flex-md-row gap-md-4 align-items-end">
                    <p class="mainheadtext">Record Count : <span class="blackh">{{ isset($dataset[0]->TotalCount) ? $dataset[0]->TotalCount : '0' }}</span></p>
                </div>
            </div>
        </div>

        <div class="">
            <x-scrollable.scrollable :dataset="$dataset">
                <x-scrollable.scroll-head>

                    <tr class="bggrey" style="background: gray !important">
                        <th style="background: lightgray !important" class="left">Store Code</th>
                        <th style="background: lightgray !important" class="left">Vendor Code</th>
                        <th style="background: lightgray !important" class="left">Franchisee Name</th>
                        <th style="background: lightgray !important" class="left">Franchisee DOB</th>
                        <th style="background: lightgray !important" class="left">FOFO Company Name</th>
                        <th style="background: lightgray !important" class="left">Franchisee Primary Ph no.</th>
                        <th style="background: lightgray !important" class="left">Franchisee Secondary Ph nos.</th>
                        <th style="background: lightgray !important" class="left">FOFO Email ID</th>
                        <th style="background: lightgray !important" class="left">FOFO address</th>
                        <th style="background: lightgray !important" class="left">Uploaded By</th>
                        <th style="background: lightgray !important" class="left">Uploaded Time</th>
                    </tr>

                </x-scrollable.scroll-head>
                <x-scrollable.scroll-body>
                    @foreach ($dataset as $data)
                    <tr>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->vendorCode }}</td>
                        <td>{{ $data->franchiseeName }}</td>
                        {{-- <td>{{ $data->franchiseeDOB }}</td> --}}
                        <td>{{ !$data->franchiseeDOB ? '' : \Carbon\Carbon::parse($data->franchiseeDOB)->format('d-m-Y') }}</td>
                        <td>{{ $data->FOFOCompanyName }}</td>
                        <td>{{ $data->franchiseePrimaryPhno }}</td>
                        <td>{{ $data->franchiseeSecondarPhno }}</td>
                        <td>{{ $data->FOFOEmailId }}</td>
                        <td>{{ $data->FOFOAddress }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                        {{-- <td>{{ !$data->createdDate? '': \Carbon\Carbon::parse($data->createdDate)->timezone('America/New_York')->setTimezone('Asia/Kolkata')->format('d-m-Y H:i') }}
                        </td> --}}
                    </tr>
                    @endforeach
                </x-scrollable.scroll-body>
            </x-scrollable.scrollable>
        </div>

        <x-modals.uploadfiles.seasonplan />


    </div>
</x-app.user-layout>
