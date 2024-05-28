<x-app.admin-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data="{
        showAlert: false,
        success: false,
        error: null,
    }" x-init="() => {
        Livewire.on('user:created', () => {
            showAlert = true;
            success = true;
            $('#createUser').modal('hide');
            // Optionally, clear the form fields or reset modal state here
        });

        Livewire.on('user:updated', (id) => {
            showAlert = true;
            success = true;
            const userid = '#editUser_'+id[0]
            $(userid).modal('hide');

            // Optionally, clear the form fields or reset modal state here
        });

        Livewire.on('user:error', (message) => {
            showAlert = true;
            success = false;
            error = message;
            $('#createUser').modal('hide');
            // Optionally, clear the form fields or reset modal state here
        });
    }">
        <x-pages.admin.settings.layout :activeTab="$activeTab">
            <div class="d-flex justify-content-end py-4">
                <button data-bs-target="#createUser" data-bs-toggle="modal" class="btn btn-primary btn-sm">
                    <i class="fa fa-plus"></i> Add New User
                </button>
            </div>

            <!-- Success Alert -->
            <template x-if="showAlert == true && success == true">
                <div class="alert alert-success alert-sm alert-dismissible fade show" role="alert">
                    <strong>Successful!</strong> The User and Menus have been created
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </template>

            <!-- Error Alert -->
            <template x-if="showAlert == true && success == false">
                <div class="alert alert-danger alert-sm alert-dismissible fade show" role="alert">
                    <strong>Failure!</strong> <span x-text="error"></span>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </template>

            <!-- User Data Table -->
            <div>
                <x-scrollable.scrollable :dataset="$dataset">
                    <x-scrollable.scroll-head>
                        <tr class="bggrey" style="background: gray !important">
                            <th style="background: lightgray !important" class="left">Role</th>
                            <th style="background: lightgray !important" class="left">Name</th>
                            <th style="background: lightgray !important" class="left">Email</th>
                            <th style="background: lightgray !important" class="left">Phone</th>
                            <th style="background: lightgray !important" class="left">Action</th>
                        </tr>
                    </x-scrollable.scroll-head>

                    <x-scrollable.scroll-body>
                        {{-- @dd($pageAccess); --}}
                        @foreach ($dataset as $data)
                        <tr>
                            <td>{{ $data->roleUID }}</td>
                            <td>{{ $data->name }}</td>
                            <td>{{ $data->email }}</td>
                            <td>{{ $data->phone }}</td>
                            <td>
                                <button data-bs-target="#editUser_{{ $data->userUID }}" data-bs-toggle="modal" class="btn btn-primary btn-sm">
                                    Edit
                                </button>
                                <div wire:ignore>
                                    <x-pages.admin.settings.edit-user :roles="$this->roles" :pages="$this->pages" :data="$data" :pageAccess="$pageAccess" :userUID="$data->userUID" />
                                </div>
                            </td>
                            <!-- Edit User Modal -->
                            {{-- @dd($data->userUID); --}}

                        </tr>
                        @endforeach
                    </x-scrollable.scroll-body>
                </x-scrollable.scrollable>
            </div>

            <!-- Create User Modal -->
            <div wire:ignore>
                <x-pages.admin.settings.create-user :roles="$this->roles" :pages="$this->pages" />
            </div>


        </x-pages.admin.settings.layout>
    </div>
</x-app.admin-layout>
