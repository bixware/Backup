<script>
    function _selectFilter() {
        this.selectFilter = $(this.$refs.selectFilter).select2();
        // Handle selection change
        this.selectFilter.on("select2:select", (event) => {
            this.$wire.set('page', event.target.value, true);
            isCheckedAll = false;
            this.$wire.filtering = true;
        });



    }

</script>



<div x-init="_selectFilter" wire:ignore>
    <select x-ref="selectFilter" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        <option></option>
        {{-- <option value=" ">All</option> --}}
        @foreach($dataset as $item)
        <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
        @endforeach
    </select>
</div>
