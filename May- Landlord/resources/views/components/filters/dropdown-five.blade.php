 <script>
     function _selectFilterfive() {
         this.selectFilterfive = $(this.$refs.selectFilterfive).select2();
         // Handle selection change
         this.selectFilterfive.on("select2:select", (event) => {
             this.$wire.set('brand', event.target.value, true);
             isCheckedAll = false;
             this.$wire.filtering = true;
         });


         this.$wire.on('resetAll', (event) => {
             this.selectFilterfive.val("").trigger("change");
         });
     }

 </script>



 <div x-init="_selectFilterfive" wire:ignore>
     <select x-ref="selectFilterfive" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
         <option></option>
         @foreach($dataset as $item)
         <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
         @endforeach
     </select>
 </div>
