<script>
    function _selectFilterone() {
        this.selectFilterone = $(this.$refs.selectFilterone).select2();
        // Handle selection change
        this.selectFilterone.on("select2:select", (event) => {
            this.$wire.set('filter_year', event.target.value, true);
            isCheckedAll = false;
            this.$wire.filtering = true;
        });

        this.$wire.on('resetAll', (event) => {
            this.selectFilterone.val("").trigger("change");
        });
    }

</script>


<div x-init="_selectFilterone" wire:ignore>
    <select x-ref="selectFilterone" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        @foreach($dataset as $item)
        <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
        @endforeach
    </select>
</div>
