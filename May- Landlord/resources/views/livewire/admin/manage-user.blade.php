<x-app.admin-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data="{
        showAlert: false,
        success: false,
        error: null
    }" x-init="() => {
        Livewire.on('user:created', () => {
            showAlert = true;
            success = true;
            $('#createUser').modal('hide');
        })

        Livewire.on('user:error', (message) => {
            showAlert = true;
            success = false;
            error = message;

            $('#createUser').modal('hide');
        })
    }">
        <x-pages.admin.settings.layout :activeTab="$activeTab">
            <div class="d-flex justify-content-end py-4">
                <button data-bs-target="#createUser" data-bs-toggle="modal" class="btn btn-primary btn-sm">
                    <i class="fa fa-plus"></i> Add New User
                </button>
            </div>

            <template x-if="showAlert == true && success == true">
                <div class="alert alert-success alert-sm alert-dismissible fade show" role="alert">
                    <strong>Successful!</strong> The User and Menus has been created
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </template>

            <template x-if="showAlert == true && success == false">
                <div class="alert alert-danger alert-sm alert-dismissible fade show" role="alert">
                    <strong>Failure!</strong> <span x-text="error"></span>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </template>

            <div class="">
                <x-scrollable.scrollable :dataset="$dataset">
                    <x-scrollable.scroll-head>

                        <tr class="bggrey" style="background: gray !important">
                            {{-- <th style="background: lightgray !important" class="left">
                                <div class="d-flex align-items-center gap-2">
                                    <span>User ID</span>
                                    <button style="opacity: .5; font-size: 1.8em; background: transparent; outline: none; border: none" x-on:click="$wire._orderBy()">
                                        <i class="fa-solid @if($orderBy=='asc') fa-caret-up @else fa-caret-down @endif"></i>
                                    </button>
                                </div>
                            </th> --}}
                            <th style="background: lightgray !important" class="left">Role</th>
                            <th style="background: lightgray !important" class="left">Name</th>
                            <th style="background: lightgray !important" class="left">Email</th>
                            <th style="background: lightgray !important" class="left">Phone</th>

                        </tr>

                    </x-scrollable.scroll-head>
                    <x-scrollable.scroll-body>
                        @foreach ($dataset as $data)
                        <tr>
                            {{-- <td>{{ $data->userUID }}</td> --}}
                            <td>{{ $data->roleUID }}</td>
                            <td>{{ $data->name }}</td>
                            <td>{{ $data->email }}</td>
                            <td>{{ $data->phone }}</td>
                        </tr>
                        @endforeach
                    </x-scrollable.scroll-body>
                </x-scrollable.scrollable>
            </div>
            <div wire:ignore>
                <x-pages.admin.settings.create-user :roles="$this->roles" :pages="$this->pages" />
            </div>
        </x-pages.admin.settings.layout>
    </div>
</x-app.admin-layout>
