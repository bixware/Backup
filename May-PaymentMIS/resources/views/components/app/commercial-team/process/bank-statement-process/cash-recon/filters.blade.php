<div class="my-2 d-flex gap-2 align-items-center">
    <div class="@if(!$filtering) d-none @endif">
        <button wire:click="back" style="background: transparent; outline: none; border: none; align-self: center; font-size: 1.3em; margin-top: 0em; padding: .2em .6em">
            <i class="fa-solid fa-arrow-left"></i>
        </button>
    </div>

    <div style="margin-top: 10px">
        <div style="width: 220px" wire:ignore>
            <select id="select4-dropdown" style="width: 220px;" class="custom-select select2 form-control searchField" data-live-search="true" data-bs-toggle="dropdown" style="height: 10px !important">
                <option selected disabled value="" class="dropdown-item">SELECT BANK NAME</option>
                <option value="" class="dropdown-item">ALL</option>

                @foreach($banks as $item)

                @php
                $item = (array) $item;
                @endphp

                @if($item['colBank'] != '')
                <option class="dropdown-list" value="{{ $item['colBank'] }}">{{ $item["colBank"] }}</option>
                @endif

                @endforeach
            </select>
        </div>
    </div>


    <div style="margin-top: 10px">
        <div style="width: 220px" wire:ignore>
            <select id="select5-dropdown" style="width: 220px;" class="custom-select select2 form-control searchField" data-live-search="true" data-bs-toggle="dropdown" style="height: 10px !important">
                <option selected disabled value="" class="dropdown-item">SELECT RETEK CODE</option>
                <option value="" class="dropdown-item">ALL</option>

                @foreach($codes as $item)

                @php
                $item = (array) $item;
                @endphp

                @if($item['retekCode'] != '')
                <option class="dropdown-list" value="{{ $item['retekCode'] }}">{{ $item["retekCode"] }}</option>
                @endif

                @endforeach
            </select>
        </div>
    </div>

    <form wire:ignore id="cash-process-search-form" class="d-flex d-flex-mob gap-2" style="flex: 1">
        <div>
            <input id="startDate" style="border: 1px solid #00000015 ; border-radius: 0px; outline: none; font-size: .9em; color: #000; padding: .4em; font-family: inherit" type="date">
        </div>
        <div>
            <input id="endDate" style="border: 1px solid #00000015 ; border-radius: 0px; outline: none; font-size: .9em; color: #000 ; padding: .4em; font-family: inherit" type="date">
        </div>
        <button class="btn-mob" style="border: none; outline: none; background: #dbdbdbe7; padding: .3em .5em; border-radius: 2px;" type="submit"><i class="fa fa-search"></i></button>
    </form>

    {{-- <div class="">
        <div class="btn-group export1" style="float: right; margin-top: 4px">
            <button type="button" class="dropdown-toggle d-flex btn mb-1" style="background: #e7e7e7; color: #000; padding: .75em .5em" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Export
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <a href="#" class="dropdown-item p-1" style="font-size: .9em" wire:click.prevent="export">Export as XLSX</a>
            </div>
        </div>
    </div> --}}
</div>
