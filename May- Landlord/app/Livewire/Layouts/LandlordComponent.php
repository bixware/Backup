<?php

namespace App\Livewire\Layouts;

use App\Traits\UseMenus;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;


#[Layout('components.layouts.landlord')]
class LandlordComponent extends Component
{

    use UseMenus;

    #[Computed(persist: false, seconds: 3600, cache: false)]
    public function menus()
    {
        return $this->_menus();
    }

    #[Computed(persist: false, seconds: 3600, cache: false)]
    public function tabs()
    {
        return $this->_tabs();
    }



    public function logout()
    {
        Auth::logout();
        session()->regenerate();
        session()->regenerateToken();

        return $this->redirect(url('/'));
    }
}
