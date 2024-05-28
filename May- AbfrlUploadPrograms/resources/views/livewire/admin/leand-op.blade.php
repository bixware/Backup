<x-app.admin-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data="{
        reset() {
            this.start = null;
            this.end = null;
        },
        start: null,
        end: null
    }">
        <div class="row mt-2">
            <div class="col-lg-10 py-3">
                <div class="d-flex d-flex-mob" style="gap: .5em; flex-wrap: wrap;">
                    <div style="display: @if ($filtering) unset @else none @endif;">
                        <button class="btn btn-primary btn-sm" @click="() => { $wire.back(); reset(); }" style="background: transparent; outline: none; border: none; padding: .5em 1em; font-size: 1em;">
                            Clear
                        </button>
                    </div>
                    <x-filters.dropdown-one initialValue="SELECT A STORE CODE" keys="storeCode" :dataset="$store_Code" />
                    <x-filters.dropdown-two initialValue="SELECT A STORE NAME" keys="storeName" :dataset="$store_Name" />
                    <x-filters.date-filter />
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
        <div>
            <x-scrollable.scrollable :dataset="$dataset">
                <x-scrollable.scroll-head>
                    <tr class="bggrey" style="background: gray !important;">
                        <th style="background: lightgray !important;" class="left">
                            <div class="d-flex align-items-center gap-2">
                                <span>Date</span>
                                <button style="opacity: .5; font-size: 1.8em; border: none;" x-on:click="$wire._orderBy();">
                                    <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                                </button>
                            </div>
                        </th>
                        <th style="background: lightgray !important;" class="left">Store Code</th>
                        <th style="background: lightgray !important;" class="left">Store Name</th>
                        <th style="background: lightgray !important;" class="left">OP</th>
                        <th style="background: lightgray !important;" class="left">LE</th>
                        <th style="background: lightgray !important;" class="left">Uploaded By</th>
                        <th style="background: lightgray !important;" class="left">Uploaded Time</th>
                    </tr>
                </x-scrollable.scroll-head>
                <x-scrollable.scroll-body>
                    <tbody>
                        @foreach ($dataset as $data)
                        <tr>
                            <td>{{ !$data->date ? '' : \Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                            <td>{{ $data->storeCode }}</td>
                            <td>{{ $data->storeName }}</td>
                            <td>{{ $data->OP }}</td>
                            <td>{{ $data->LE }}</td>
                            <td>{{ $data->createdBy }}</td>
                            <td>{{ !$data->createdDate ? '' : \Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </x-scrollable.scroll-body>
            </x-scrollable.scrollable>
        </div>
        <x-modals.uploadfiles.upload />
    </div>
</x-app.admin-layout>
