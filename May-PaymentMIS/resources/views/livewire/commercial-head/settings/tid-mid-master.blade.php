<div x-data="{
    start: null,
    end: null,

    reset() {
        this.start = null
        this.end = null
    }
}">
    <div class="row mb-1">
        <div class="col-lg-9">
            <ul class="nav nav-tabs justify-content-start" role="tablist">
                <li class="nav-item">
                    <a @click.pervent="() => {
                        reset()
                        // $wire.switchTab('amexmid')
                        window.location.href = '{{ url('/') }}/chead/settings/tid-mid-master' + '?t=amexmid'
                    }" class="nav-link @tab('amexmid') active tab-active @endtab" data-bs-toggle="tab" href="#" role="tab" style="font-size: .8em !important">AMEX MID
                    </a>
                </li>
                <li class="nav-item">
                    <a @click.pervent="() => {
                        reset()
                        // $wire.switchTab('icicimid')
                        window.location.href = '{{ url('/') }}/chead/settings/tid-mid-master' + '?t=icicimid'
                    }" class="nav-link @tab('icicimid') active tab-active @endtab" data-bs-toggle="
                            tab" href="#" role="tab" style="font-size: .8em !important">
                        ICICI MID
                    </a>
                </li>
                <li class="nav-item">
                    <a @click.pervent="() => {
                        reset()
                        // $wire.switchTab('sbimis')
                        window.location.href = '{{ url('/') }}/chead/settings/tid-mid-master' + '?t=sbimis'

                    }" class="nav-link @tab('sbimis') active tab-active @endtab" data-bs-toggle="
                            tab" href="#" role="tab" style="font-size: .8em !important">
                        SBI MID
                    </a>
                </li>
                <li class="nav-item">
                    <a @click.pervent="() => {
                        reset()
                        // $wire.switchTab('hdfctid')
                        window.location.href = '{{ url('/') }}/chead/settings/tid-mid-master' + '?t=hdfctid'
                    }" class="nav-link @tab('hdfctid') active tab-active @endtab" data-bs-toggle="
                            tab" href="#" role="tab" style="font-size: .8em !important">
                        HDFC TID
                    </a>
                </li>
            </ul>
        </div>

        <div class="col-lg-3 d-flex align-items-center justify-content-end">
            @tab('amexmid')
            <div class="btn-group mb-1">
                <div class="mb-2" style="float: right;">
                    {{-- <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#amexCreate">Add
                        Amex</button>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#amexsave">Upload File
                    </button> --}}

                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#amexupload">Import MID
                    </button>
                </div>
            </div>
            {{-- <x-app.commercial-head.settings.tid-mid-master.amexmid-create-popup id="amexCreate" />
            <x-app.commercial-head.settings.tid-mid-master.amexmid-save-popup id="amexsave" /> --}}
            <x-app.commercial-head.settings.tid-mid-master.amexmid-import-popup id="amexupload" />

            @endtab
            @tab('icicimid')
            <div class="btn-group mb-1">
                <div class="mb-2" style="float: right;">
                    {{-- <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#iciciCreate">Add
                        Icici</button>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#icicisave">Upload File
                    </button> --}}
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#iciciupload">Import MID
                    </button>
                </div>
            </div>
            {{-- <x-app.commercial-head.settings.tid-mid-master.icicimid-create-popup id="iciciCreate" />
            <x-app.commercial-head.settings.tid-mid-master.icicimid-save-popup id="icicisave" /> --}}
            <x-app.commercial-head.settings.tid-mid-master.icicimid-import-popup id="iciciupload" />
            @endtab
            @tab('sbimis')
            <div class="btn-group mb-1">
                <div class="mb-2" style="float: right;">
                    {{-- <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#sbiCreate">Add
                        Sbi</button>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#sbisave">Upload File
                    </button> --}}
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#sbiupload">Import MID
                    </button>
                </div>
            </div>
            {{-- <x-app.commercial-head.settings.tid-mid-master.sbimid-create-popup id="sbiCreate" />
            <x-app.commercial-head.settings.tid-mid-master.sbimid-save-popup id="sbisave" /> --}}
            <x-app.commercial-head.settings.tid-mid-master.sbimid-import-popup id="sbiupload" />
            @endtab
            @tab('hdfctid')
            <div class="btn-group mb-1">
                <div class="mb-2" style="float: right;">
                    {{-- <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#hdfcCreate">Add
                        Hdfc</button>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#hdfcsave">Upload File
                    </button> --}}
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#hdfcupload">
                        Import TID</button>
                </div>
            </div>
            {{-- <x-app.commercial-head.settings.tid-mid-master.hdfctid-create-popup id="hdfcCreate" />
            <x-app.commercial-head.settings.tid-mid-master.hdfctid-save-popup id="hdfcsave" /> --}}
            <x-app.commercial-head.settings.tid-mid-master.hdfctid-import-popup id="hdfcupload" />
        </div>
        @endtab
    </div>

    <div class="mt-2">
        <x-app.commercial-head.settings.tid-mid-master.filters :months="$_months" :filtering="$filtering" :brands="$brands" />
    </div>

    <div class="col-lg-12" wire:key="dcjdnijrhhekj12efkdj">
        <x-scrollable.scrollable :dataset="$dataset">
            <x-scrollable.scroll-head>
                @tab('amexmid')
                <tr>
                    <th class="">MID</th>
                    <th class="">Store ID</th>
                    <th>
                        <div class="d-flex align-items-center gap-2">
                            <span>Store Opening Date</span>
                            <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="
                                fa-solid @if($orderBy == 'asc') 
                                fa-caret-up 
                                @else fa-caret-down @endif"> </i>
                        </div>
                    </th>

                    <th class="">New Retek Code</th>
                    <th class="">Old Retek Code</th>
                    <th class="">Brand Name</th>
                    <th class="">Status</th>
                    <th class="">Date of Conversion</th>
                    <th class="">POS</th>
                    <th class="">Relevance</th>
                    <th class="">EDC Service Provider</th>
                    <th class="">Action</th>
                </tr>
                @endtab

                @tab('icicimid')
                <tr>
                    <th class="">MID</th>
                    <th class="">Store ID</th>
                    <th>
                        <div class="d-flex align-items-center gap-2">
                            <span>Store Opening Date</span>
                            <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="
                                fa-solid @if($orderBy == 'asc') 
                                fa-caret-up 
                                @else fa-caret-down @endif"> </i>
                        </div>
                    </th>

                    <th class="">New Retek Code</th>
                    <th class="">Old Retek Code</th>
                    <th class="">Brand Code</th>
                    <th class="">Status</th>
                    {{-- <th class="right">Closure Date</th> --}}
                    <th class="">Date of Conversion</th>
                    <th class="">POS</th>
                    <th class="">Relevance</th>
                    <th class="">EDC Service Provider</th>
                    <th class="">Action</th>
                </tr>
                @endtab

                @tab('sbimis')
                <tr>
                    <th class="">MID</th>
                    <th class="">Store ID</th>
                    <th>
                        <div class="d-flex align-items-center gap-2">
                            <span>Store Opening Date</span>
                            <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="
                                fa-solid @if($orderBy == 'asc') 
                                fa-caret-up 
                                @else fa-caret-down @endif"> </i>
                        </div>
                    </th>

                    <th class="">New Retek Code</th>
                    <th class="">Old Retek Code</th>
                    <th class="">Brand Name</th>
                    <th class="">Status</th>
                    {{-- <th class="right">Closure Date</th> --}}
                    <th class="">Date of Conversion</th>
                    <th class="">POS</th>
                    <th class="">Relevance</th>
                    <th class="">EDC Service Provider</th>
                    <th class="">Action</th>
                </tr>
                @endtab

                @tab('hdfctid')
                <tr>
                    <th class="">Tid</th>
                    <th class="">Store ID</th>
                    <th>
                        <div class="d-flex align-items-center gap-2">
                            <span>Store Opening Date</span>
                            <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="
                                fa-solid @if($orderBy == 'asc') 
                                fa-caret-up 
                                @else fa-caret-down @endif"> </i>
                        </div>
                    </th>

                    <th class="">New Retek Code</th>
                    <th class="">Old Retek Code</th>
                    <th class="">Brand Name</th>
                    <th class="">Status</th>
                    {{-- <th class="right">Closure Date</th> --}}
                    <th class="">Date of Conversion</th>
                    <th class="">POS</th>
                    <th class="">Relevance</th>
                    <th class="">EDC Service Provider</th>
                    <th class="">Action</th>
                </tr>
                @endtab


            </x-scrollable.scroll-head>
            <x-scrollable.scroll-body>

                @tab('amexmid')
                @foreach ($dataset as $data)
                <tr>
                    <td class=""> {{ number_format($data->MID, 0, '', '') }} </td>
                    <td class=""> {{ $data->storeID }} </td>
                    <td class=""> {{ Carbon\Carbon::parse($data->openingDt)->format('d-m-Y') }} </td>
                    <td class=""> {{ $data->newRetekCode }} </td>
                    <td class=""> {{ $data->oldRetekCode }} </td>
                    <td class=""> {{ $data->brandName }} </td>
                    <td class=""> {{ $data->Status }} </td>
                    {{-- <td class="right"> {{ $data->closureDate }} </td> --}}
                    <td class=""> {{ $data->conversionDt }} </td>
                    <td class=""> {{ $data->POS }} </td>
                    <td class=""> {{ $data->relevance }} </td>
                    <td class=""> {{ $data->EDCServiceProvider }} </td>
                    <td class=""><a data-bs-toggle="modal" data-bs-target="#exampleModalCenter_{{ $data->amexMIDUID }}" href="#">Edit</a>
                    </td>
                </tr>
                <x-app.commercial-head.settings.tid-mid-master.amexmid-update-popup :data="$data" />
                @endforeach
                @endtab

                @tab('icicimid')
                @foreach ($dataset as $data)
                <tr>
                    <td class=""> {{ number_format($data->MID, 0, '', '') }} </td>
                    <td class=""> {{ $data->storeID }} </td>
                    <td class=""> {{ Carbon\Carbon::parse($data->openingDt)->format('d-m-Y') }} </td>
                    <td class=""> {{ $data->newRetekCode }} </td>
                    <td class=""> {{ $data->oldRetekCode }} </td>
                    <td class=""> {{ $data->brandCode }} </td>
                    <td class=""> {{ $data->status }} </td>
                    {{-- <td class="right"> {{ $data->closureDate }} </td> --}}
                    <td class=""> {{ $data->conversionDt }} </td>
                    <td class=""> {{ $data->POS }} </td>
                    <td class=""> {{ $data->relevance }} </td>
                    <td class=""> {{ $data->EDCServiceProvider }} </td>
                    <td>
                        <a href="#" style="font-size: 1.1em" data-bs-target="#exampleModalCenterSecondTab_{{ $data->iciciMIDUID }}" data-bs-toggle="modal">Edit</a>
                    </td>
                </tr>
                <x-app.commercial-head.settings.tid-mid-master.icicimid-update-popup :data="$data" />
                @endforeach
                @endtab

                @tab('sbimis')
                @foreach ($dataset as $data)
                <tr wire:key="{{ rand() }}">
                    <td class=""> {{ $data->MID }} </td>
                    <td class=""> {{ $data->storeID }} </td>
                    <td class=""> {{ Carbon\Carbon::parse($data->openingDt)->format('d-m-Y') }} </td>
                    <td class=""> {{ $data->newRetekCode }} </td>
                    <td class=""> {{ $data->oldRetekCode }} </td>
                    <td class=""> {{ $data->brandName }} </td>
                    <td class=""> {{ $data->status }} </td>
                    {{-- <td class="right"> {{ $data->closureDate }} </td> --}}
                    <td class=""> {{ $data->conversionDt }} </td>
                    <td class=""> {{ $data->POS }} </td>
                    <td class=""> {{ $data->relevance }} </td>
                    <td class=""> {{ $data->EDCServiceProvider }} </td>
                    <td>
                        <a href="#" style="font-size: 1.1em" data-bs-target="#exampleModalCenterThirdTab_{{ $data->sbiMIDUID }}" data-bs-toggle="modal">Edit</a>
                    </td>
                </tr>
                <x-app.commercial-head.settings.tid-mid-master.sbimid-update-popup :data="$data" />
                @endforeach
                @endtab

                @tab('hdfctid')
                @foreach ($dataset as $data)
                <tr wire:key="{{ rand() }}">
                    <td class=""> {{ number_format($data->TID, 0, '', '') }} </td>
                    <td class=""> {{ $data->storeID }} </td>
                    <td class=""> {{ Carbon\Carbon::parse($data->openingDt)->format('d-m-Y') }} </td>
                    <td class=""> {{ $data->newRetekCode }} </td>
                    <td class=""> {{ $data->oldRetekCode }} </td>
                    <td class=""> {{ $data->brandName }} </td>
                    <td class=""> {{ $data->status }} </td>
                    <td class="">{{ $data->conversionDt }}</td>
                    <td class=""> {{ $data->POS }} </td>
                    <td class=""> {{ $data->relevance }} </td>
                    <td class=""> {{ $data->EDCServiceProvider }} </td>
                    <td>
                        <a href="#" style="font-size: 1.1em" data-bs-target="#exampleModalCenterFourthTab_{{ $data->hdfcTIDUID }}" data-bs-toggle="modal">Edit</a>
                    </td>
                </tr>

                <x-app.commercial-head.settings.tid-mid-master.hdfctid-update-popup :data="$data" />
                @endforeach
                @endtab
            </x-scrollable.scroll-body>
        </x-scrollable.scrollable>
    </div>
</div>
