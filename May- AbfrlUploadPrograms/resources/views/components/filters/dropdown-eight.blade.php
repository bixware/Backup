<script>
    function _selectFiltereight() {
        this.selectFiltereight = $(this.$refs.selectFiltereight).select2();
        // Handle selection change
        this.selectFiltereight.on("select2:select", (event) => {
            this.$wire.set('store', event.target.value, true);
            isCheckedAll = false;
            this.$wire.filtering = true;
        });


        this.$wire.on('resetAll', (event) => {
            this.selectFiltereight.val("").trigger("change");
        });
    }

</script>



<div x-init="_selectFiltereight" wire:ignore>
    <select x-ref="selectFiltereight" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        <option></option>
        {{-- <option value=" ">All</option> --}}
        @foreach($dataset as $item)
        <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
        @endforeach
    </select>
</div>
