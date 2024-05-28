<?php

namespace App\Livewire\Commercial;

use App\Livewire\Layouts\CommercialComponent;
use Illuminate\Support\Facades\Storage;
use App\Traits\HasInfinityScroll;
use App\Traits\HasTabs;
use App\Traits\UseDefaults;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Livewire\Attributes\Computed;
use Livewire\Attributes\On;
use stdClass;

class DeletePage extends CommercialComponent
{
    use HasInfinityScroll, UseOrderBy, UseDefaults;



    /**
     * Selected Page
     *
     * @var string
     */
    public $page = null;








    /**
     * Map UPloaded file
     * @var [type]
     */
    public $uploadFile = null;





    /**
     * List All files
     * @var array
     */
    public $files = [];









    /**
     * Get files inside the directory of the page name
     * @return array
     */
    public function _files()
    {
        if ($this->page) {
            return DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS_DELETEPAGE :procType, :pagename ,:file_name, :selectedItems', [
                "procType" => "mfiles",
                "pagename" => $this->page,
                "file_name" => '',
                "selectedItems" => '',
            ], perPage: $this->perPage, orderBy: $this->orderBy);
        }

        return [];
    }







    /**
     * Get Pages
     * @return array
     */
    #[Computed(true, 3600, true)]
    public function mPages()
    {
        $data = DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS_DELETEPAGE :procType, :pagename , :file_name, :selectedItems', [
            "procType" => "mPages",
            "pagename" => '',
            "file_name" => '',
            "selectedItems" => '',
        ], perPage: $this->perPage, orderBy: $this->orderBy);

        return $data;
    }







    /**
     * When page changed
     * @param [type] $data
     * @return void
     */
    public function updatedPage($data)
    {
        $this->dispatch('pageUpdated');
    }






    /**
     * Reset the selectedItems
     * @param [type] $item
     * @return void
     */
    public function updated($item)
    {
        if (in_array($item, ['page', 'uploadFile', 'selectAll'])) {
            $this->dispatch('updated');
        }
    }






    /**
     * Delete selected items
     * @param array $data
     * @return void
     */
    public function deleteSelectedFiles(array $data)
    {
        $data = DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS_DELETEPAGE :procType, :pagename, :file_name, :selectedItems', [
            "procType" => "mDeleteFiles",
            "pagename" => $this->page,
            "file_name" => $this->uploadFile,
            "selectedItems" => $data['selectAll'] ? 'all' : implode(',', $data['selectedItems']),
        ], perPage: $this->perPage, orderBy: $this->orderBy);


        $this->files = $this->_files();
        $this->dispatch('user:created');
        return true;
    }





    /**
     * Main Datasource
     * @return void
     */
    public function getData()
    {
        $data = [];

        if ($this->uploadFile && $this->page) {
            $data = DB::withOrderBySelect('UploadProgram_PROC_SELECT_ADMIN_SETTINGS_DELETEPAGE :procType, :pagename, :file_name, :selectedItems', [
                "procType" => "mGetfiles",
                "pagename" => $this->page,
                "file_name" => $this->uploadFile,
                "selectedItems" => '',
            ], perPage: $this->perPage, orderBy: $this->orderBy);
            // dd($data);
        }

        return $data;
    }






    /**
     * Render function
     * @return void
     */
    public function render()
    {

        $this->files = $this->_files();

        return view('livewire.commercial.deletepage', [
            'dataset' => $this->getData(),
        ]);
    }
}
