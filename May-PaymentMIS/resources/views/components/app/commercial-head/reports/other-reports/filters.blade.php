<div class="col-lg-12 mb-3">
    <div class="d-flex align-items-center gap-2 d-flex-mob">

        <div style="display:@if ($filtering) unset @else none @endif" class="">
            <button @click="() => {
                $wire.back()
                reset()    
            }" style="background: transparent; outline: none; border: none; align-self: center; font-size: 1.3em; margin-top: 0em; padding: .2em .6em">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>

        <div class="w-mob-100" style="margin-top: 7px">
            <x-filters.stores :stores="$stores" keys="retekCode" />
        </div>


        <div class="d-block" style="@if($tab != 'mpos-sap') display: none !important; @endif; margin-top: 7px">
            <div wire:ignore>
                <select id="matchFilterMPOS" wire:model="matchStatus" style="width: 220px;" class="custom-select select2 form-control searchField w-mob-100 mb-1" data-live-search="true" data-bs-toggle="dropdown" style="height: 8px !important">
                    <option selected value="" class="dropdown-item">SELECT MATCHED STATUS</option>
                    <option value="" class="dropdown-item">ALL</option>
                    <option value="Matched" class="dropdown-item">Matched</option>
                    <option value="Not Matched" class="dropdown-item">Not Matched</option>
                </select>
            </div>
        </div>

        <div class="w-mob-100" style="margin-top: 7px">
            <x-filters.months :months="$months" />
        </div>

        <div class="w-mob-100" style="margin-top: 7px">
            <x-filters.date-filter />
        </div>

        @if(in_array($tab, ['chargeback-summary', 'zero-sales', 'mpos-sap']))
        <x-filters.simple-export />
        @endif
    </div>
</div>
