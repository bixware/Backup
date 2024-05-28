<?php

namespace App\Livewire\Landlord;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Livewire\Layouts\LandlordComponent;

class Dashboard extends LandlordComponent
{
    public function render()
    {
        return view('livewire.landlord.dashboard', [
            'dataset' => $this->getData()
        ]);
    }

    public function getData()
    {

        return DB::select('Landlord_PROC_SELECT_DASHBOARD :procType,:userId', [
            "procType" => 'UserDashboard',
            "userId" => Auth::id()
        ]);
    }
}
