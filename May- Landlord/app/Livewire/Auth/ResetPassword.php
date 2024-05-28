<?php

namespace App\Livewire\Auth;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;

#[Title('ABFRL - Upload Program Portal')]
#[Layout('components.layouts.app')]
class ResetPassword extends Component
{

    public $token;
    public $email;
    public $password;
    public $password_confirmation;

    public function mount($token)
    {
        $this->token = $token;
    }

    public function resetpassword()
    {
        $this->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $email = $this->email;
        $hashedPassword = Hash::make($this->password);  // Hash the password

        // Call the stored procedure with the hashed password
        DB::statement('EXEC UploadProgram_PROC_RESET_PASSWORD ?, ?', [
            $email,
            $hashedPassword,
        ]);

        session()->flash('message', 'Your password has been reset successfully.');

        // return redirect()->to('/');
    }



    public function render()
    {
        return view('livewire.auth.reset-password');
    }
}