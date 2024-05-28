<?php

namespace App\Livewire\Commercial;

use Livewire\Attributes\Title;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Livewire\Layouts\CommercialComponent;
use App\Traits\UseOrderBy;

class Dashboard extends CommercialComponent
{
    use UseOrderBy;

    public function render()
    {
        return view('livewire.commercial.dashboard', [
            'dataset' => $this->getData()
        ]);
    }

    public function getData()
    {

        return DB::select('Landlord_PROC_SELECT_DASHBOARD :procType,:userId', [
            "procType" => 'AdminDashboard',
            "userId" => null
        ]);
    }
}
