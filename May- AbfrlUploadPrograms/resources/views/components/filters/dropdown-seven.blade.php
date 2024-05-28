 <script>
     function _selectFilterseven() {
         this.selectFilterseven = $(this.$refs.selectFilterseven).select2();
         // Handle selection change
         this.selectFilterseven.on("select2:select", (event) => {
             this.$wire.set('crewStaffName', event.target.value, true);
             isCheckedAll = false;
             this.$wire.filtering = true;
         });


         this.$wire.on('resetAll', (event) => {
             this.selectFilterseven.val("").trigger("change");
         });
     }

 </script>



 <div x-init="_selectFilterseven" wire:ignore>
     <select x-ref="selectFilterseven" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
         <option></option>
         @foreach($dataset as $item)
         <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
         @endforeach
     </select>
 </div>
