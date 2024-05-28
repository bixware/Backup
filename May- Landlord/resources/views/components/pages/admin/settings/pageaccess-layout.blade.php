<div x-data>
    <div class="row mb-4">
        <div class="col-lg-9">
            <ul class="nav nav-tabs justify-content-start" role="tablist">
                <li class="nav-item">
                    <a @click="$wire.switchTab('users')" class="nav-link @if($activeTab === 'users') active tab-active @endif" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Master
                    </a>
                </li>

                {{-- <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Masters
                    </a>
                </li> --}}
            </ul>
        </div>
        <div class="col-lg-3 d-flex align-items-center justify-content-end">
            <div class="btn-group mb-1">
            </div>
        </div>
    </div>
    <div class="">
        {{ $slot }}
    </div>
</div>
