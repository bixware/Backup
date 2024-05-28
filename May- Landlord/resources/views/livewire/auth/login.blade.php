<section x-data="{
    email: '',
    password: '',
    remember: true,
    hasClicked: false,

    emailError: '',
    passwordError: '',

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // validate all the inputs
    validate() {

        this.emailError = ''
        this.passwordError = ''

        if(this.email == '') {
            this.emailError = 'The Email Address cannot be empty';
        }


        if(!this.validateEmail(this.email)) {
            this.emailError = 'Please enter a valid email address';
        }

        if(this.password == '') {
            this.passwordError = 'The password field is required.';
        }

        if(this.emailError != '' || this.passwordError != '') {
            return false
        }

        return true;
    }

}" class="ftco-section" style="background-image: url('assets/images/shopbg2.jpg'); min-height: 100vh;" x-init="() => {
    Livewire.on('reset:login', () => {
        hasClicked = false
    })
}">

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
        <div class="row justify-content-center" >
			<div class="col-md-12 col-lg-8">
				<div class="wrap d-md-flex" >
					
			<div class="login-wrap p-4 p-md-5">
				  <div class="login-header">
					<div class="brand mb-3">
						<b class="text-red">Login to your account</b><br>
					</div>
					<div class="icon"></div>
				</div>
                @error('error') <div class="error">{{ $message }}</div> @enderror
                <form x-on:submit.prevent="() => {
                    console.log('Running');
                    if(!validate()) {
                        return false;
                    }

                    hasClicked = true


                    $wire.authenticate({ email, password, remember })
                }" class="signin-form">
					  <div class="form-group mb-4">
                        <input x-model="email" type="email" class="form-control" placeholder="Email Address">
                        <div x-text="emailError" class="error"></div>
					  </div>
					<div class="form-group mb-4">
						<input x-model="password" type="password" class="form-control" placeholder="Password">
                                <div x-text="passwordError" class="error"></div>
					</div>
					<div class="m-t-20 mb-4 text-inverse text-center">
                        <a href="{{ url('/') }}/forgot-password" wire:navigate>Forget Password?</a>
						<br>
					</div>
					<div class="login-buttons mb-1">
                        <div x-bind:style="cursor:pointer;">
                            <button type="submit" class="btn btn-secondary btn-block btn-lg">Login</button>
                        </div>
					</div>
				</form>
			</div>
			
			<div class="img" style="background-image: url('assets/images/bgb.png');"></div>
			
		</div>
	</div>
	</div>
    </div>
</section>
