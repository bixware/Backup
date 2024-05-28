<?php

namespace App\Livewire\User;

use App\Livewire\Layouts\UserComponent;

class Dashboard extends UserComponent {
    public function render() {
        return view('livewire.user.dashboard');
    }
}
