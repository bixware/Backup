<x-scrollable.scrollable :dataset="$dataset">
    <x-scrollable.scroll-head>
        @if($page == 'LE & OP')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Date</span>
                    {{-- <button style="opacity: .5; font-size: 1.8em;border:none" x-on:click="$wire._orderBy()">
                        <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                    </button> --}}
                </div>
            </th>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">Store Name</th>
            <th style="background: lightgray !important" class="left">OP</th>
            <th style="background: lightgray !important" class="left">LE</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'Crew Target')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Date</span>
                    {{-- <button style="opacity: .5; font-size: 1.8em;border:none" x-on:click="$wire._orderBy()">
                        <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                    </button> --}}
                </div>
            </th>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">SalesPerson Code</th>
            <th style="background: lightgray !important" class="left">Brand Code</th>
            <th style="background: lightgray !important" class="left">Crew Staff Name</th>
            <th style="background: lightgray !important" class="left">Coach Name</th>
            <th style="background: lightgray !important" class="left">EmployeeId</th>
            <th style="background: lightgray !important" class="left">NSV</th>
            <th style="background: lightgray !important" class="left">Running Average Mix</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'AE Target File')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Date</span>
                    {{-- <button style="opacity: .5; font-size: 1.8em;border:none" x-on:click="$wire._orderBy()">
                        <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                    </button> --}}
                </div>
            </th>
            <th style="background: lightgray !important" class="left">SAP Code</th>
            <th style="background: lightgray !important" class="left">Store Name</th>
            <th style="background: lightgray !important" class="left">Day</th>
            <th style="background: lightgray !important" class="left">WKNO</th>
            <th style="background: lightgray !important" class="left">OPNSV Target</th>
            <th style="background: lightgray !important" class="left">Walkins</th>
            <th style="background: lightgray !important" class="left">Bills</th>
            <th style="background: lightgray !important" class="left">MensVol</th>
            <th style="background: lightgray !important" class="left">WomensVol</th>
            <th style="background: lightgray !important" class="left">TotalVol</th>
            <th style="background: lightgray !important" class="left">GSV</th>
            <th style="background: lightgray !important" class="left">MRP</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'GTM Target')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Date</span>
                    {{-- <button style="opacity: .5; font-size: 1.8em;border:none" x-on:click="$wire._orderBy()">
                        <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                    </button> --}}
                </div>
            </th>
            <th style="background: lightgray !important" class="left">SAP Code</th>
            <th style="background: lightgray !important" class="left">Store Name</th>
            <th style="background: lightgray !important" class="left">Day</th>
            <th style="background: lightgray !important" class="left">WKNO</th>
            <th style="background: lightgray !important" class="left">OPNSV Target</th>
            <th style="background: lightgray !important" class="left">Walkins</th>
            <th style="background: lightgray !important" class="left">Bills</th>
            <th style="background: lightgray !important" class="left">MensVol</th>
            <th style="background: lightgray !important" class="left">WomensVol</th>
            <th style="background: lightgray !important" class="left">TotalVol</th>
            <th style="background: lightgray !important" class="left">GSV</th>
            <th style="background: lightgray !important" class="left">MRP</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'Staff Communication')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">New Store Code</th>
            <th style="background: lightgray !important" class="left">Brand</th>
            <th style="background: lightgray !important" class="left">Name</th>
            <th style="background: lightgray !important" class="left">Store Norms</th>
            <th style="background: lightgray !important" class="left">Store Manager</th>
            <th style="background: lightgray !important" class="left">Store Crew</th>
            <th style="background: lightgray !important" class="left">Coach</th>
            <th style="background: lightgray !important" class="left">ASM</th>
            <th style="background: lightgray !important" class="left">PRM</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'Running Avg Mix')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">Employee Id</th>
            <th style="background: lightgray !important" class="left">Crew Staff Name</th>
            <th style="background: lightgray !important" class="left">Running Average Mix</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'Prive list')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Date</span>
                    {{-- <button style="opacity: .5; font-size: 1.8em;border:none" x-on:click="$wire._orderBy()">
                        <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                    </button> --}}
                </div>
            </th>
            <th style="background: lightgray !important" class="left">Store</th>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">PhoneNo</th>
            <th style="background: lightgray !important" class="left">Name</th>
            <th style="background: lightgray !important" class="left">RM</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif
        @if($page == 'Store Target')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Date</span>
                    {{-- <button style="opacity: .5; font-size: 1.8em;border:none" x-on:click="$wire._orderBy()">
                        <i class="fa-solid @if ($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                    </button> --}}
                </div>
            </th>
            <th style="background: lightgray !important" class="left">Store Id</th>
            <th style="background: lightgray !important" class="left">SM Name</th>
            <th style="background: lightgray !important" class="left">RM Name</th>
            <th style="background: lightgray !important" class="left">NSV</th>
            <th style="background: lightgray !important" class="left">Brand Code</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>

        </tr>
        @endif
        @if($page == 'Season Plan')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">SAP Code</th>
            <th style="background: lightgray !important" class="left">Store Name</th>
            <th style="background: lightgray !important" class="left">Month</th>
            <th style="background: lightgray !important" class="left">Day</th>
            <th style="background: lightgray !important" class="left">WKNO</th>
            <th style="background: lightgray !important" class="left">Store TGT</th>
            <th style="background: lightgray !important" class="left">TCMB Department</th>
            <th style="background: lightgray !important" class="left">DepartMent TGT</th>
            <th style="background: lightgray !important" class="left">Sub Brand</th>
            <th style="background: lightgray !important" class="left">Sub Brand TGT</th>
            <th style="background: lightgray !important" class="left">Month Year</th>
            <th style="background: lightgray !important" class="left">Class</th>
            <th style="background: lightgray !important" class="left">Class TGT</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif

        @if($page == 'Franchisee')
        <tr class="bggrey" style="background: gray !important">
            <td style="background: lightgray !important">
                <input type="checkbox" id="selectAllCheckbox" x-model="selectAll" @change="checkboxes">
            </td>
            <th style="background: lightgray !important" class="left">Store Code</th>
            <th style="background: lightgray !important" class="left">Vendor Code</th>
            <th style="background: lightgray !important" class="left">Franchisee Name</th>
            <th style="background: lightgray !important" class="left">Franchisee DOB</th>
            <th style="background: lightgray !important" class="left">FOFO Company Name</th>
            <th style="background: lightgray !important" class="left">Franchisee Primary Ph no.</th>
            <th style="background: lightgray !important" class="left">Franchisee Secondary Ph nos.</th>
            <th style="background: lightgray !important" class="left">FOFO Email ID</th>
            <th style="background: lightgray !important" class="left">FOFO address</th>
            <th style="background: lightgray !important" class="left">Uploaded By</th>
            <th style="background: lightgray !important" class="left">Uploaded Time</th>
        </tr>
        @endif

    </x-scrollable.scroll-head>
    <x-scrollable.scroll-body>
        {{ $slot }}
    </x-scrollable.scroll-body>
    {{-- <button wire:click="deleteSelectedFiles">Delete Selected</button> --}}
</x-scrollable.scrollable>
