<script>
    function _selectFilterExtOne() {

        this.selectFilterOne = $(this.$refs.selectFilterOne).select2();
        updateBrands(this.selectFilterOne)

        this.selectFilterOne.on("select2:select", (event) => {
            this.$wire.set('uploadFile', event.target.value, true);
            isCheckedAll = false;
        });

        this.$wire.on('pageUpdated', (event) => {
            updateBrands(this.selectFilterOne)
        })

        this.$wire.on('resetAll', (event) => {
            this.selectFilterOne.val("").trigger("change");
            updateBrands(this.selectFilterOne)
        });
    }




    if (!(typeof functionName === 'updateBrands')) {
        function updateBrands(select2Instance) {
            // Clear existing options
            select2Instance.empty();
            // Initial data for brands
            const initialBrandsData = @entangle('files').live;

            console.log(initialBrandsData.live.initialValue);
            // Append new options
            select2Instance.append(new Option('{{ $initialValue }}', ' '));
            // select2Instance.append(new Option('ALL', ' '));

            initialBrandsData.initialValue.forEach(item => {
                select2Instance.append(new Option(item.file, item.file));
            });

            select2Instance.trigger("change");
        }
    }

</script>

<div x-init="_selectFilterExtOne" wire:ignore>
    <select x-ref="selectFilterOne" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        <option></option>
    </select>
</div>
