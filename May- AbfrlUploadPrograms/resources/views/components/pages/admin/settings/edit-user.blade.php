<div x-show="!showAlert" wire:ignore class="modal fade" id="editUser_{{ $data->userUID }}" style="z-index: 99999 !important;" x-data="{
    name: null,
    email: null,
    password: null,
    confirm_passwords: null,
    phone: null,
    role: '{{ $data->roleID }}',
    pageAccess: [],
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
        this.pageAccess = []

        $('.checks').prop('checked', false);
    },


    submit() {
        {{-- if(!this.validateForm()) {
            return false;
        } --}}

        $wire.editUser({
            name: this.name,
            email: this.email,
            password: this.password,
            confirm_passwords: this.confirm_passwords,
            phone: this.phone,
            role: this.role,
            pageAccess: this.pageAccess,
            errors: this.errors,
            userUID: '{{ $data->userUID }}',
        });
    }
}" x-init="() => {
    Livewire.on('user:updated', () => {
        reset()
    })
}">
    <div wire:ignore class="modal-dialog modal-dialog-centered" style="max-width: 1200px !important;">
        <div wire:ignore class="modal-content" style="z-index: 6 !important;">
            <div class="modal-header">
                <h5 class="modal-title">Edit Page Access</h5>
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

                        <div class="mb-3 mt-3" style="background: rgba(211, 211, 211, 0.411); padding: 1em; border-radius: 5px">
                            <label>Page Access <span style="color: red">*</span></label><br>
                            <div wire:ignore class="row w-100 mt-3 ps-7" x-ref="checks">
                                @foreach ($pages as $page)
                                <div class="col-2 mt-3">
                                    <input @if(($page->pageName == 'Dashboard' || $page->pageName == 'Change Password' || $page->pageName == 'Settings' && $data->roleUID == 'Admin') || $page->pageName == 'Dashboard' || $page->pageName == 'Change Password')
                                    disabled checked
                                    @endif
                                    @if(($page->pageName == 'Delete Page' || $page->pageName == 'Settings') && $data->roleUID == 'User')
                                    style="display:none;"
                                    @endif
                                    x-on:change="() => {
                                    addCheckbox('{{ $page->pageUID }}')
                                    }"
                                    @if(in_array($page->pageName, $data->pages))
                                    checked
                                    x-init="() => {
                                    addCheckbox('{{ $page->pageUID }}')
                                    }"
                                    @endif
                                    class="form-check-input"
                                    type="checkbox"
                                    @if(in_array($page->pageUID, $pageAccess))
                                    checked
                                    @endif
                                    value=""
                                    >
                                    <label class="form-check-label" for="access_{{ $page->pageName }}">{{ $page->pageName }}</label>
                                </div>
                                @endforeach
                            </div>
                            <div x-show="errors.includes('Select Atleast One Page.')" class="text-danger">Select Atleast One Page.</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
