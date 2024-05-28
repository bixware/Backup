<div>
    <section class="ftco-section" style="background-image: url('assets/images/login-bg-red1.png'); min-height: 100vh;">
        <x-spinner.spinner />
        <div class="container" style="max-height:90vh;">
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-8">
                    <div class="wrap d-md-flex">
                        <div class="img" style="background-image: url('assets/images/bgo.png');"></div>
                        <div class="login-wrap p-4 p-md-5">
                            @if (session()->has('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                            @endif
                            <div class="login-header">
                                <div class="brand mb-3">
                                    <b class="text-red">Forgot Password?</b><br>
                                </div>
                                <div class="icon"></div>
                            </div>
                            <form wire:submit.prevent="sendResetLink">
                                <div class="form-group mb-4">
                                    <input type="email" class="form-control" id="email" wire:model.defer="email" placeholder="Enter your email">
                                    @error('email')
                                    <span class="text-red-500 error">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="login-buttons mb-1">
                                    <button type="submit" class="btn btn-primary btn-block btn-lg" style="cursor:pointer;">Submit</button>
                                </div>
                                {{-- <div class="login-buttons mb-1">
                                    <a href="{{ url('/') }}" wire:navigate class="btn btn-primary btn-block btn-lg" style="cursor:pointer;">Back to Login</a>
                        </div> --}}
                        <div class="m-t-20 mb-4 text-inverse text-center mt-3">
                            <a href="{{ url('/') }}" wire:navigate>Back to Login</a>
                            <br>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</div>
</section>
</div>
