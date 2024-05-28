<section class="ftco-section" style="background-image: url('{{ url('/') }}/assets/images/login-bg-red1.png'); min-height: 100vh;">
    <x-spinner.spinner />
    <div class="container" style="max-height:90vh;">
        @if (session('message'))
        <div x-data="{ isShow: true }" x-init="() => {
            setTimeout(() => {
                isShow = false
            }, 5000)
        }" class="alert alert-success" x-show="isShow">
            {{ session('message') }}
        </div>
        @endif
        <div class="row justify-content-center">
            <div class="col-md-12 col-lg-8">
                <div class="wrap d-md-flex">
                    <img class="img" src="{{ url('/') }}/assets/images/bgo.png">
                    </img>
                    <div class="login-wrap p-4 p-md-5">
                        <div class="login-header">
                            <div class="brand mb-3">
                                <b class="text-red">Reset Password?</b><br>
                                <!--small>Don't have access ?</small>  <a href="javascript:;">Contact support</a-->
                            </div>
                            <div class="icon"></div>
                        </div>
                        <form wire:submit.prevent="resetpassword">
                            <input type="hidden" wire:model="token">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" wire:model.defer="email">
                                @error('email') <span class="text-danger">{{ $message }}</span> @enderror
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" wire:model.defer="password">
                                @error('password') <span class="text-danger">{{ $message }}</span> @enderror
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation">Confirm Password</label>
                                <input type="password" class="form-control" id="password_confirmation" wire:model.defer="password_confirmation">
                            </div>
                            <button type="submit" class="btn btn-primary btn-block btn-lg" style="cursor:pointer;">Reset Password</button>
                            <div class="m-t-20 mb-4 text-inverse text-center mt-3">
                                <a href="{{ url('/') }}" wire:navigate>Back to Login</a>
                                <br>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
</section>
