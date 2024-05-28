<?php

namespace App\Livewire\User;

use App\Livewire\Layouts\UserComponent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ChangePassword extends UserComponent
{


    public string $old = "";
    public string $password = "";
    public string $password_confirmation = "";


    protected $rules = [
        "old" => "required",
        "password" => "required|min:6|confirmed",
        "password_confirmation" => "required|min:6",

    ];



    public function changePassword()
    {;

        $this->validate();

        try {
            DB::beginTransaction(); //auth()->user()->userUID

            $currentPasswordStatus = Hash::check($this->old, auth()->user()->password);

            if ($currentPasswordStatus) {
                $user = User::findOrFail(auth()->user()->userUID);
                $user->password = Hash::make($this->password);
                $user->save();

                DB::commit();
                $this->dispatch('livewire:message.success', message: [
                    "response" => "Password Updated Successfully"
                ]);
                $this->reset();
                return true;
            } else {
                $this->dispatch('livewire:message.failure', message: [
                    "response" => "Old Password Did not Match"
                ]);

                return false;
            }
        } catch (\Throwable $th) {
            DB::rollBack();

            $this->dispatch('livewire:message.failure', message: [
                "response" => $th->getMessage()
            ]);

            return false;
        }
    }



    public function render()
    {
        return view('livewire.user.change-password');
    }
}