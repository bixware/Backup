<div class="mt-4 px-2" style="display: flex; justify-content: start; align-items: center; gap: 1em">
    <x-filters.dropdown initialValue="SELECT A PAGE" :dataset="$mPages" keys="page" />

    <div style="@if($page == null) display: none;  @endif">
        <x-filters.extensions.dropdown_one initialValue="SELECT A FILE" :dataset="$files" keys="file" />
    </div>


    <div style="flex: 1">
    </div>

    <template x-if="selectedItems.length || selectAll == true">
        <button class="btn btn-primary btn-sm " @click="deleteItems">
            Delete Records
        </button>
    </template>

</div>
