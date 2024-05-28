{{-- <div>
    <div wire:ignore class="">
        <select id="{{ $keys }}-select2" class="custom-select select2 form-control select2-container" data-live-search="true" data-bs-toggle="dropdown" style="height: 15px !important; width: 250px !important">

</select>
</div>
</div>
<script>
    var $j = jQuery.noConflict();
    var main = $j(".select2-container").select2();

    // update dom
    function update(container) {
        const dataset = @json($dataset)

        container.empty()
        container.append(new Option('{{ $initialValue }}', '  '));

        dataset.forEach(data => {
            container.append(new Option(data['{{ $keys }}'], data['{{ $keys }}']));
        });
    }



    document.addEventListener('livewire:init', function() {

        update(main)

        $j("#{{ $keys }}-select2").on('change', function(e) {
            @this.set("{{ $keys }}", e.target.value);
            @this.set("filtering", true);
        });


        Livewire.on('resetAll', () => {
            update(main)
            main.val('').trigger('change')
            @this.set("filtering", false);
        });


    });

</script> --}}
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
{{--
<div x-init="_selectFilterExtOne" wire:ignore>
    <select x-ref="selectFilterOne" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
<option></option>
</select>
</div> --}}

<div x-init="_selectFilterExtOne" wire:ignore>
    <select x-ref="selectFilter" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
        <option></option>
        {{-- <option value=" ">All</option> --}}
        @foreach($dataset as $item)
        <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
        @endforeach
    </select>
</div>
