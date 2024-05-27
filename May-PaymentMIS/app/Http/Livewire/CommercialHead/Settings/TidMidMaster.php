<?php

namespace App\Http\Livewire\CommercialHead\Settings;

use App\Traits\HasTabs;
use Livewire\Component;
use App\Traits\HasInfinityScroll;
use App\Traits\ParseMonths;
use App\Traits\UseLocation;
use App\Traits\UseOrderBy;
use Illuminate\Support\Facades\DB;

class TidMidMaster extends Component {

    use HasInfinityScroll, HasTabs, UseOrderBy, ParseMonths, UseLocation;




    /**
     * Filtering content
     * @var
     */
    public $filtering = false;



    /**
     * StartDate for filtering from dates
     * @var
     */
    public $startdate = null;




    /**
     * end for filtering from dates
     * @var
     */
    public $enddate = null;





    public $storemasterUID;



    public $userUID;



    public $activeTab = 'amexmid';




    public $Brand = '';



    public $dates;




    public $brands = [];



    /**
     * Show the active tab on the url
     * @var array
     */
    protected $queryString = [
        'activeTab' => ['as' => 't']
    ];





    /**
     * Date filters
     * @param mixed $request
     * @return void
     */
    public function mount() {

    }




    /**
     * Date filters
     * @param mixed $request
     * @return void
     */
    public function filterDate($request) {
        $this->startdate = $request['start'];
        $this->enddate = $request['end'];
        $this->filtering = true;
    }



    /**
     * Resets all the properties
     * @return void
     */
    public function back() {
        $this->resetExcept('activeTab');
        $this->emit('resetAll');
    }




    /**
     * Get Brands
     * @return \Illuminate\Support\Collection
     */
    public function getBrands(): \Illuminate\Support\Collection {
        return DB::withOrderBySelect('PaymentMIS_PROC_SELECT_COMMERCIALHEAD_TidMidMaster :tab, :brand, :from, :to', [
            'tab' => $this->activeTab . '-brands',
            'brand' => $this->Brand,
            'from' => $this->startdate,
            'to' => $this->enddate
        ], $this->perPage, $this->orderBy);
    }



    public function render() {
        $this->brands = $this->getBrands();

        return view('livewire.commercial-head.settings.tid-mid-master', [
            'dataset' => $this->dataset()
        ]);
    }



    public function dataset() {

        return DB::withOrderBySelect('PaymentMIS_PROC_SELECT_COMMERCIALHEAD_TidMidMaster :tab, :brand, :from, :to', [
            'tab' => $this->activeTab,
            'brand' => $this->Brand,
            'from' => $this->startdate,
            'to' => $this->enddate
        ], $this->perPage, $this->orderBy);
    }
}
