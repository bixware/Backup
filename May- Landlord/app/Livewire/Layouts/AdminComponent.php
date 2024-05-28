<?php

namespace App\Livewire\Layouts;

use App\Traits\UseMenus;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('components.layouts.admin')]
class AdminComponent extends Component
{

    use UseMenus;

    #[Computed(persist: true, seconds: 3600, cache: false)]
    public function tabs()
    {
        return $this->_tabs();
    }


    #[Computed(persist: true, seconds: 3600, cache: false)]
    public function menus()
    {
        return $this->_menus();
    }


    public function logout()
    {
        Auth::logout();
        session()->regenerate();
        session()->regenerateToken();

        return $this->redirect(url('/'));
    }
}