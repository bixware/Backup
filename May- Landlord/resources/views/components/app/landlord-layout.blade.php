<div class="container-scroller">

    <div class="row p-0 m-0 proBanner d-none" id="proBanner">
        <div class="col-md-12 p-0 m-0">
            <div class="card-body card-body-padding d-flex align-items-center justify-content-between">
                <div class="ps-lg-1">
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <button id="bannerClose" class="btn border-0 p-0">
                        <i class="mdi mdi-close text-white me-0"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div style="z-index: 2 !important" wire:ignore x-data="{
        isToggled: false
    }">
        <x-topbar.landlord />
    </div>

    <div class="container-fluid page-body-wrapper">
        <div class="fix" style="z-index: 1 !important">
            <x-navigations.index :menus="$menus" />
        </div>

        <div class="main-panel active">
            <div class="content-wrapper">
                <div class="row">
                    <div class="col-md-12">
                        <x-tabs.index :tabs="$tabs" />
                        <div x-data="{
                            showAlert: false,
                            success: false,
                            response: null
                        }" x-init="() => {
                            Livewire.on('livewire:message.success', ({ message }) => {
                                showAlert = true;
                                success = true;
                                response = message.response
                                $('#hdfcbank').modal('hide')

                                setTimeout(() => {
                                    showAlert = false;
                                }, 5000)
                            })

                            Livewire.on('livewire:message.failure', ({ message }) => {
                                showAlert = true;
                                success = false;
                                response = message.response
                                $('#hdfcbank').modal('hide')
                            })
                        }">

                            <div wire:ignore style="display: flex; justify-content: center; align-items: center">

                                <template x-if="showAlert == true && success == true">
                                    <div class="alert alert-success alert-sm alert-dismissible fade show" style="width: 90%; margin-top: 1em" role="alert">
                                        <strong>Successful!</strong> <span x-text="response"></span>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </template>

                                <template x-if="showAlert == true && success == false">
                                    <div class="alert alert-danger alert-sm alert-dismissible fade show" style="width: 90%; margin-top: 1em" role="alert">
                                        <strong>Failure!</strong> <span x-text="response"></span>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </template>
                            </div>
                        </div>
                        {{ $slot }}
                    </div>
                </div>
            </div>

            <footer class="footer">
                <div class="footer-inner-wraper">
                    <div class="d-sm-flex justify-content-center justify-content-sm-between py-2">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright ©
                            2023 <a href="#" target="_blank">ABFRL</a></span>
                    </div>
                </div>
            </footer>
        </div>
    </div>

</div>
