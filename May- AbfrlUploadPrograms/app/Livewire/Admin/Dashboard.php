<?php

namespace App\Livewire\Admin;

use App\Livewire\Layouts\AdminComponent;
use Livewire\Attributes\Title;

class Dashboard extends AdminComponent {

    public function render() {
        return view('livewire.admin.dashboard');
    }
}
