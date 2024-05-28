<script>
    /**
     * Initialize the select2 for brands
     */
    if (!(typeof functionName === 'initializeBanksSelect2')) {
        function initializeBanksSelect2() {
            var banksSelect2 = $(this.$refs['{{ $key }}']).select2();

            // Initialize brands with initial data
            updateBrands(banksSelect2);

            banksSelect2.on("select2:select", (event) => {
                // Set the selected brand in Livewire component
                this.$wire['{{ $update }}'] = event.target.value;
                this.$wire.filtering = true;
            });


            // Livewire event listener to reset brands when triggered
            this.$wire.on('resetAll', (event) => {
                updateBrands(banksSelect2);
                banksSelect2.val("").trigger("change");
            });
        }
    }
    /**
     * Update brands in Select2 dropdown
     */
    if (!(typeof functionName === 'updateBrands')) {
        function updateBrands(select2Instance) {
            // Clear existing options
            select2Instance.empty();

            // Initial data for brands
            const initialBrandsData = @entangle($data).live;

            // Append new options
            select2Instance.append(new Option('{{ $initialValue }}', ' '));
            select2Instance.append(new Option('ALL', ' '));

            initialBrandsData.initialValue.forEach(item => {
                select2Instance.append(new Option(item['{{ $arr }}'], item['{{ $arr }}']));
            });

            select2Instance.trigger("change");
        }
    }

</script>




<div class="d-flex gap-2 align-items-center">
    <div x-init="initializeBanksSelect2" wire:ignore>
        <select x-ref="{{ $key }}" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
            <option></option>
        </select>
    </div>
</div>

{{--
<script>
    document.addEventListener('livewire:load', function() {
        Livewire.on('fileUpdated', () => {
            initializeFileSelect2();
        });
    });

    function initializeFileSelect2() {
        var selectFile = $('#selectFile');
        selectFile.select2();
        selectFile.on("change", function(event) {
            Livewire.emit('fileSelected', event.target.value);
        });
    }

</script>

<div x-data="{
        initializeFileSelect2() {
            var selectFile = $('#selectFile');
            selectFile.select2();
            selectFile.on('change', function (event) {
                Livewire.emit('fileSelected', event.target.value);
            });
        }
    }" x-init="initializeFileSelect2" wire:ignore>
    <select id="selectFile" data-placeholder="SELECT A FILE" class="w-mob-100" style="width: 200px">
        <option></option>
    </select>
</div> --}}
