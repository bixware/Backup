<div x-data>
    <div class="row mb-4">
        <div class="col-lg-9">
            <ul class="nav nav-tabs justify-content-start" role="tablist">
                <li class="nav-item">
                    <a @click="$wire.switchTab('le&op')" class="nav-link @if($activeTab === 'le&op') active tab-active @endif" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Le & OP
                    </a>
                </li>

                <li @click="$wire.switchTab('crewtarget')" class="nav-item @if($activeTab === 'crewtarget') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Crew Target
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        AE Target File
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        GMT Target
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Staff Communication
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Running Avg Mix
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Prive List
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Store Target
                    </a>
                </li>
                <li @click="$wire.switchTab('masters')" class="nav-item @if($activeTab === 'masters') active tab-active @endif">
                    <a class="nav-link" data-bs-toggle="
                    tab" data-bs-target="#axis" role="tab" style="font-size: .9em !important" href="#">
                        Season Plan
                    </a>
                </li>
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
