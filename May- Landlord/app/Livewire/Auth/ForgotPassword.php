<?php

namespace App\Livewire\Auth;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;

#[Title('ABFRL - Upload Program Portal')]
#[Layout('components.layouts.app')]
class ForgotPassword extends Component
{

    public $email;

    public function sendResetLink()
    {
        $validatedData = $this->validate([
            'email' => 'required|email',
        ]);

        $userExists = DB::table('tbl_mUsers')->where('email', $validatedData['email'])->exists();

        if ($userExists) {
            $token = Str::random(60);
            $this->callSendPasswordResetEmailProcedure($validatedData['email'], $token);

            session()->flash('message', 'Password Reset Link has been sent successfully.');
            return $this->redirect(Login::class, true);
        } else {
            $this->addError('email', 'Invalid email address');
            return;
        }
    }




    private function callSendPasswordResetEmailProcedure($email, $token)
    {
        DB::statement('EXEC UploadProgram_PROC_SENT_EMAIL_RESET_PASSWORD ?, ?', [$email, $token]);
    }


    public function render()
    {
        return view('livewire.auth.forgot-password');
    }
}