<nav wire:ignore wire:key='{{ rand() }}' class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top active" id="mobile-header">

    <div class="row" x-data="{
        isToggled: false
    }">
        <div class="navbar-menu-wrapper d-flex align-items-center">
            <div class="col-2">
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <!--span class="mdi mdi-menu"></span--><i class="fa fa-bars" aria-hidden="true"></i>
                </button>
            </div>

            <div class="col-8">
                {{-- <div class="search-field">
                    <form class="d-flex align-items-center h-100" action="#">
                        <div class="input-group">
                            <input type="text" class="form-control border-1 text-uppercase" value="Admin Panel">
                        </div>
                    </form>
                </div> --}}
            </div>

            <div class="col-2">
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item nav-profile dropdown">
                        <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="mdi mdi-account-circle ms-1" style="margin-left: .5em !important"></i>
                        </a>
                        <div class="dropdown-menu navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm" aria-labelledby="profileDropdown" data-x-placement="bottom-end">
                            <div class="p-2">
                                <h5 class="dropdown-header text-uppercase ps-2 text-dark">Commercial Panel</h5>

                                <a class="dropdown-item py-1 d-flex align-items-center justify-content-between" href="{{ url('/') }}/commercial/changepwd">Change Password </a>
                                <button class="dropdown-item py-1 d-flex align-items-center justify-content-between" wire:click="logout">
                                    <span>Log Out</span>
                                    <i class="mdi mdi-logout ms-1"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-2">
                <ul class="navbar-nav navbar-nav-left">

                </ul>
            </div>
        </div>
    </div>
</nav>

{{-- desktop --}}
<nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style="z-index: 2 !important" id="desktop-header">
    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">

        <a class="navbar-brand brand-logo" href="{{ url('/') }}"><img src="{{ asset('assets/images/logo.jpg') }}" alt="logo" /></a>
        <a class="navbar-brand brand-logo-mini" href="{{ url('/') }}"><img src="{{ asset('assets/images/logo.jpg') }}" alt="logo" /></a>
    </div>
    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
        <span class="mdi mdi-menu"></span>
    </button>
    <div class="navbar-menu-wrapper d-flex align-items-stretch">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
        {{-- <div class="search-field w-50">
            <form class="d-flex align-items-center h-100" action="#">
                <div class="input-group">
                    <input type="text" class="form-control border-1 dropdown-header text-uppercase ps-2 text-dark" value="Admin Panel"><i class="input-group-text mdi mdi-magnify" style="display: none"></i>
                </div>
            </form>
        </div> --}}
        <ul class="navbar-nav navbar-nav-left">

        </ul>
        <ul wire:key="{{ rand() }}" class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile relative" x-data="{
                open: false,
                toggle() {
                    if (this.open) {
                        return this.close()
                    }

                    this.$refs.button.focus()

                    this.open = true
                },
                close(focusAfter) {
                    if (! this.open) return

                    this.open = false

                    focusAfter && focusAfter.focus()
                }
            }" x-on:keydown.escape.prevent.stop="close($refs.button)" x-on:focusin.window="! $refs.panel.contains($event.target) && close()" x-id="  ['dropdown-button']">
                <a x-ref="button" x-on:click="toggle()" class="nav-link dropdown" style="font-size: 1.5em !important" id="profileDropdown" href="#">
                    <i class="fa-solid fa-user-circle"></i>
                </a>

                <div style="background: #f0f0f0" x-ref="panel" x-show="open" x-transition.origin.top.left x-on:click.outside="close($refs.button)" :id="$id('dropdown-button')" style="display: none" class="navbar-dropdown dropdown-menu-right p-0 border-0 font-size-sm">
                    <div class="p-2">
                        <h5 class="dropdown-header text-uppercase ps-2 text-dark">Commercial Panel</h5>

                        <a class="dropdown-item py-1 d-flex align-items-center justify-content-between" href="{{ url('/') }}/commercial/changepwd">Change Password </a>

                        <button class="dropdown-item py-1 d-flex align-items-center justify-content-between" wire:click="logout">
                            <span>Log Out</span>
                            <i class="mdi mdi-logout ms-1"></i>
                        </button>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</nav>
