 <script>
     function _selectFilterfour() {
         this.selectFilterfour = $(this.$refs.selectFilterfour).select2();
         // Handle selection change
         this.selectFilterfour.on("select2:select", (event) => {
             this.$wire.set('SAPCode', event.target.value, true);
             isCheckedAll = false;
             this.$wire.filtering = true;
         });


         this.$wire.on('resetAll', (event) => {
             this.selectFilterfour.val("").trigger("change");
         });
     }

 </script>



 <div x-init="_selectFilterfour" wire:ignore>
     <select x-ref="selectFilterfour" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
         <option></option>
         @foreach($dataset as $item)
         <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
         @endforeach
     </select>
 </div>
