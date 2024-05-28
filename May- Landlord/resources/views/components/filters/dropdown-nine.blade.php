<script>
    function _selectFilternine() {
        this.selectFilternine = $(this.$refs.selectFilternine).select2();
        // Handle selection change
        this.selectFilternine.on("select2:select", (event) => {
            this.$wire.set('vendorCode', event.target.value, true);
            isCheckedAll = false;
            this.$wire.filtering = true;
        });


        this.$wire.on('resetAll', (event) => {
            this.selectFilternine.val("").trigger("change");
        });
    }

</script>



<div x-init="_selectFilternine" wire:ignore>
    <select x-ref="selectFilternine" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        <option></option>
        {{-- <option value=" ">All</option> --}}
        @foreach($dataset as $item)
        <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
        @endforeach
    </select>
</div>
