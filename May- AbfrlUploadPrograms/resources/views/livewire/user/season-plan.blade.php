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

                    <x-filters.dropdown-four initialValue="SELECT A SAP CODE" keys="SAPCode" :dataset="$SAP_Code" />
                    <x-filters.dropdown-two initialValue="SELECT A STORE NAME" keys="storeName" :dataset="$store_Name" />
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
                        <th style="background: lightgray !important" class="left">SAP Code</th>
                        <th style="background: lightgray !important" class="left">Store Name</th>
                        <th style="background: lightgray !important" class="left">Month</th>
                        <th style="background: lightgray !important" class="left">Day</th>
                        <th style="background: lightgray !important" class="left">WKNO</th>
                        <th style="background: lightgray !important" class="left">Store TGT</th>
                        <th style="background: lightgray !important" class="left">TCMB Department</th>
                        <th style="background: lightgray !important" class="left">DepartMent TGT</th>
                        <th style="background: lightgray !important" class="left">Sub Brand</th>
                        <th style="background: lightgray !important" class="left">Sub Brand TGT</th>
                        <th style="background: lightgray !important" class="left">Month Year</th>
                        <th style="background: lightgray !important" class="left">Class</th>
                        <th style="background: lightgray !important" class="left">Class TGT</th>
                        <th style="background: lightgray !important" class="left">Uploaded By</th>
                        <th style="background: lightgray !important" class="left">Uploaded Time</th>
                    </tr>

                </x-scrollable.scroll-head>
                <x-scrollable.scroll-body>
                    @foreach ($dataset as $data)
                    <tr>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->SAPCode }}</td>
                        <td>{{ $data->storeName }}</td>
                        <td>{{ $data->month }}</td>
                        <td>{{ $data->day }}</td>
                        <td>{{ $data->WKNo }}</td>
                        <td>{{ $data->storeTGT }}</td>
                        <td>{{ $data->TCMBDepartment }}</td>
                        <td>{{ $data->departMentTGT }}</td>
                        <td>{{ $data->subBrand }}</td>
                        <td>{{ $data->subBrandTGT }}</td>
                        <td>{{ $data->monthYear }}</td>
                        <td>{{ $data->class }}</td>
                        <td>{{ $data->classTGT }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                </x-scrollable.scroll-body>
            </x-scrollable.scrollable>
        </div>

        <x-modals.uploadfiles.seasonplan />


    </div>
    </x-app.admin-layout>
