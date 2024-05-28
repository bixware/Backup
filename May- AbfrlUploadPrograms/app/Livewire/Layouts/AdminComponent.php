<?php

namespace App\Livewire\Layouts;

use App\Traits\UseMenus;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('components.layouts.admin')]
class AdminComponent extends Component
{

    use UseMenus;

    #[Computed(persist: true, seconds: 3600, cache: true)]
    public function tabs()
    {
        return $this->_tabs();
    }


    #[Computed(persist: true, seconds: 3600, cache: true)]
    public function menus()
    {
        return $this->_menus();
    }


    public function logout()
    {

        Auth::logout();
        session()->regenerate();
        session()->regenerateToken();

        // Manually clearing cache to prevent unassigned menus display
        Cache::clear();
        return $this->redirect(url('/'));
    }
}