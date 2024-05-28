 <script>
     function _selectFilterthree() {
         this.selectFilterthree = $(this.$refs.selectFilterthree).select2();
         // Handle selection change
         this.selectFilterthree.on("select2:select", (event) => {
             this.$wire.set('brandCode', event.target.value, true);
             isCheckedAll = false;
             this.$wire.filtering = true;
         });


         this.$wire.on('resetAll', (event) => {
             this.selectFilterthree.val("").trigger("change");
         });
     }

 </script>



 <div x-init="_selectFilterthree" wire:ignore>
     <select x-ref="selectFilterthree" data-placeholder="{{ $initialValue }}" class="w-mob-100" style="width: 200px">
         <option></option>
         @foreach($dataset as $item)
         <option value="{{ $item->{$keys} }}">{{ $item->{$keys} }}</option>
         @endforeach
     </select>
 </div>
