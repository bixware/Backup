<?php

namespace App\Livewire\Auth;

use App\Livewire\Admin\Dashboard;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;

#[Title('ABFRL - Upload Program Portal')]
#[Layout('components.layouts.app')]
class Login extends Component
{
    public $email;
    public $password;
    public $remember;

    protected $rules = [
        'email' => 'required|email',
        'password' => 'required|min:6',
        'remember' => 'nullable',
    ];

    protected $messages = [
        'email.required' => 'The Email Address cannot be empty.',
        'email.email' => 'The Email Address format is not valid.',
    ];


    public function mount()
    {

        if (Auth::check() && auth()->user()->roleUID == '1')
            return $this->redirect(RouteServiceProvider::ADMIN, true);

        if (Auth::check() && auth()->user()->roleUID == '2')
            return $this->redirect(RouteServiceProvider::USER, true);
    }


    public function authenticate($request)
    {
        Cache::clear();
        $this->email = $request['email'];
        $this->password = $request['password'];
        $this->remember = $request['remember'];

        $pre_auth = User::where('email', $this->email)?->first();

        if ($pre_auth && $pre_auth->isActive != '1') {
            $this->addError('error', 'This Account is not active, Please check with your commercial');
            return false;
        }


        if (Auth::guard('web')->attempt(['email' => $this->email, 'password' => $this->password])) {

            \Illuminate\Support\Facades\Session::regenerate();

            if (auth()->user()->roleUID == '1')
                $this->redirect(Dashboard::class, true);

            if (auth()->user()->roleUID == '2')
                $this->redirect('user', true);

            abort_if(!in_array(auth()->user()->roleUID, [1, 2]), 401);
        }

        $this->dispatch('reset:login');
        $this->addError('error', 'Authentication failed!.');
    }


    public function render()
    {
        return view('livewire.auth.login');
    }
}