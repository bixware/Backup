 <script>
     function _selectFilterten() {
         this.selectFilterten = $(this.$refs.selectFilterten).select2();
         // Handle selection change
         this.selectFilterten.on("select2:select", (event) => {
             this.$wire.set('storeId', event.target.value, true);
             isCheckedAll = false;
             this.$wire.filtering = true;
         });


         this.$wire.on('resetAll', (event) => {
             this.selectFilterten.val("").trigger("change");
         });
     }

 </script>



 <div x-init="_selectFilterten" wire:ignore>
     <select x-ref="selectFilterten" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
         <option></option>
         @foreach($dataset as $item)
         <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
         @endforeach
     </select>
 </div>
