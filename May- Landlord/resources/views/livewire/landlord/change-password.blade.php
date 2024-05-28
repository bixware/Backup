<x-app.landlord-layout :menus="$this->menus" :tabs="$this->tabs">
    <div class="row">
        <div class="col-md-12">
            {{-- <x-tabs.index :tabs="$tabs" /> --}}
        </div>
        <div class="tab-content tab-transparent-content bg-white">
            <div class="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="home-tab">
                <section id="entry">
                    <form id="logout-form" wire:submit="changePassword" method="POST">

                        <div class="row mb-3 gap-2">
                            <div class="col-lg-8 col-12">
                                <div class="entry-box2 p-3">

                                    <div class="row">

                                        <div class="col-lg-4 col-12 mb-2">
                                            <div class="w-100">
                                                <label for="">Old Password</label>
                                                <input type="password" name="oldpassword" class="form-control @error('oldpassword') is-invalid @enderror" id="oldpassword" placeholder="Old Password" wire:model='old' required>
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-12 mb-2">
                                            <div class="w-100">
                                                <label for="">New Password</label>
                                                <input type="text" name="password" class="form-control @error('password') is-invalid @enderror" id="password" placeholder="New Password" wire:model='password' required>
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-12 mb-2">
                                            <div class="w-100">
                                                <label for="">Confirm Password</label>
                                                <input type="text" name="password_confirmation" class="form-control @error('password_confirmation') is-invalid @enderror" id="password_confirmation" placeholder="Confirm Password" wire:model='password_confirmation' required>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-lg-10 col-12 mb-2">
                                            @if ($errors->any())
                                            @foreach ($errors->all() as $error)
                                            <div class="alert alert-warning" style="font-size: 15px;font-weight: bold;">{{$error}}</div>
                                            @endforeach
                                            @endif

                                            @if (session('message'))
                                            <h5 class="alert alert-success mb-2">{{ session('message') }}</h5>
                                            @endif

                                        </div>


                                        <div class="col-lg-2 col-12 mb-2">
                                            <div class="w-100">
                                                <input type="submit" name="Submit" class="btn btn-primary green" value="Submit">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>

    </div>
</x-app.landlord-layout>
