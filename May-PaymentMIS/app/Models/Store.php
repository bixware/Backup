<?php

namespace App\Models;

use App\Http\Livewire\Admin\Sales;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $table = "tbl_mStore";

    protected $primaryKey = "storeUID";

    public $timestamps = false;


    public function sapName()
    {
        return $this['Brand Name'] . ', ' . $this->City . ', ' . $this->Location;
    }
    public function brandName()
    {
        return $this['Brand Name'];
    }
    public function storeName()
    {
        return $this->Location;
    }
}
