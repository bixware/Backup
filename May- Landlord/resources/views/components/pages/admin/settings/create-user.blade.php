<div x-show="!showAlert" wire:ignore class="modal fade" id="createUser" style="z-index: 99999 !important;" x-data="{
    name: null,
    email: null,
    password: null,
    confirm_passwords: null,
    phone: null,
    role: null,
    pageAccess: ['10','12'],
    errors: [],

    validateForm() {
        this.errors = [];

        if (!this.name) {
            this.errors.push('Name is required.');
        }

        if (!this.role) {
            this.errors.push('Role is required.');
        }

        if (!this.pageAccess.length) {
            this.errors.push('Select Atleast One Page.');
        }

        if (!this.email) {
            this.errors.push('Email is required.');
        } else if (!this.isValidEmail(this.email)) {
            this.errors.push('Email is invalid.');
        }

        if (!this.password) {
            this.errors.push('Password is required.');
        }

        if (this.password != this.confirm_passwords) {
            this.errors.push('Passwords do not match.');
        }

        return this.errors.length === 0;
    },

    isValidEmail(email) {
        // Email validation logic
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },


    addCheckbox(item) {

        if(!this.pageAccess.includes(item)) {
            this.pageAccess.push(item);
        } else {
            this.pageAccess = this.pageAccess.filter(main => main != item);
        }
        return true;
    },



    reset() {
        this.name = null
        this.email = null
        this.password = null
        this.confirm_passwords = null
        this.phone = null
        this.role = null
        this.pageAccess = ['10','12']

        $('.checks').prop('checked', false);
    },


    submit() {
        if(!this.validateForm()) {
            return false;
        }

        $wire.createUser({
            name: this.name,
            email: this.email,
            password: this.password,
            confirm_passwords: this.confirm_passwords,
            phone: this.phone,
            role: this.role,
            pageAccess: this.pageAccess,
            errors: this.errors,
        });
    }
}" x-init="() => {
    Livewire.on('user:created', () => {
        reset()
    })
}">
    <div wire:ignore class="modal-dialog modal-dialog-centered" style="max-width: 1200px !important;">
        <div wire:ignore class="modal-content" style="z-index: 6 !important;">
            <div class="modal-header">
                <h5 class="modal-title">Create New User</h5>
                <button type="button" class="close" data-bs-dismiss="modal">
                    <span aria-hidden="true"><i class="fa fa-times"></i></span>
                </button>
            </div>

            <div class="modal-body">
                <div>
                    <div x-show="errors.length > 0" class="mt-3">
                        <div class="alert alert-danger" role="alert" x-text="errors.join(' ')"></div>
                    </div>

                    <form @submit.prevent="submit()">
                        <div class="row">
                            <div class="mb-3 col-6">
                                <label for="name" class="form-label">Name <span style="color: red">*</span></label>
                                <input type="text" class="form-control" x-model="name" id="name">
                                <div x-show="errors.includes('Name is required.')" class="text-danger">Name is required.</div>
                            </div>

                            <div class="mb-3 col-6">
                                <label for="email" class="form-label">Email <span style="color: red">*</span></label>
                                <input type="email" class="form-control" x-model="email" id="email">
                                <div x-show="errors.includes('Email is required.')" class="text-danger">Email is required.</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col-6">
                                <label for="password" class="form-label">Password <span style="color: red">*</span></label>
                                <input type="password" class="form-control" x-model="password" id="password">
                                <div x-show="errors.includes('Password is required.')" class="text-danger">Password is required.</div>
                            </div>

                            <div class="mb-3 col-6">
                                <label for="confrim_password" class="form-label">Confirm Password <span style="color: red">*</span></label>
                                <input type="text" class="form-control" x-model="confirm_passwords" id="confrim_password">
                                <div x-show="errors.includes('Passwords do not match.')" class="text-danger">Passwords do not match.</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="mb-3 col-6">
                                <label for="phone" class="form-label">Phone Number</label>
                                <input type="text" class="form-control" x-model="phone" id="phone">
                            </div>

                            <div class=" mb-3 col-6">
                                <label for="role" class="form-label">Role <span style="color: red">*</span></label>
                                <select x-model="role" class="form-select" id="role">
                                    <option value="">SELECT A ROLE</option>
                                    @foreach($roles as $role)
                                    <option value="{{ $role->roleUID }}">{{ $role->roleName }}</option>
                                    @endforeach
                                </select>
                                <div x-show="errors.includes('Role is required.')" class="text-danger">Role is required.</div>
                            </div>
                        </div>

                        {{-- <div class="mb-3 mt-3" style="background: rgba(211, 211, 211, 0.411); padding: 1em; border-radius: 5px">
                            <label>Page Access <span style="color: red">*</span></label><br>
                            <div class="row w-100 mt-3 ps-3" x-ref="checks">
                                @foreach($pages as $page)
                                <div class="col-2">
                                    <input @if($page->pageName == 'Dashboard' || $page->pageName =='Change Password') disabled checked @endif x-on:change="() => {
                                    addCheckbox('{{ $page->pageUID }}')
                        }" class="form-check-input @if($page->pageName != 'Dashboard' && $page->pageName =='Change Password') checks @endif" type="checkbox" id="access_{{ $page->pageName }}" value="">
                        <label class="form-check-label" for="access_{{ $page->pageName }}">{{ $page->pageName }}</label>
                </div>
                @endforeach
            </div>
            <div x-show="errors.includes('Select Atleast One Page.')" class="text-danger">Select Atleast One Page.</div>
        </div> --}}
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
</div>
</div>
</div>
