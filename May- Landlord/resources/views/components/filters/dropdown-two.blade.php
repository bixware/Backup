<script>
    function _selectFiltertwo() {
        this.selectFiltertwo = $(this.$refs.selectFiltertwo).select2();
        // Handle selection change
        this.selectFiltertwo.on("select2:select", (event) => {
            this.$wire.set('filter_year', event.target.value, true);
            isCheckedAll = false;
            this.$wire.filtering = true;
        });


        this.$wire.on('resetAll', (event) => {
            this.selectFiltertwo.val("").trigger("change");
        });
    }

</script>



<div x-init="_selectFiltertwo" wire:ignore>
    <select x-ref="selectFiltertwo" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        <option></option>
        {{-- <option value=" ">All</option> --}}
        @foreach($dataset as $item)
        <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
        @endforeach
    </select>
</div>
