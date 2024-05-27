<x-scrollable.scrollable :dataset="$dataset">
    <x-scrollable.scroll-head>
        @if($activeTab == 'mpos-sap')
        <tr>
            <th class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Sales Date</span>
                    <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="fa-solid @if($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                </div>
            </th>

            <th class="left">Store ID</th>
            <th class="left">Retek Code</th>
            <th class="left">Brand</th>
            <th class="left">Status</th>
            <th class="left" style="text-align: right !important">SAP Cash</th>
            <th class="left" style="text-align: right !important">MPOS Cash</th>
            <th class="left" style="text-align: right !important">Difference</th>
        </tr>
        @endif
        @if($activeTab == 'bank-drop-missing')
        <tr>
            <th class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Sales Date</span>
                    <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="fa-solid @if($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                </div>
            </th>
            <th class="left">Store ID</th>
            <th class="left">Retek Code</th>
            <th class="left">Store Name</th>
            <th class="left">Brand</th>
            <th class="left">Bank Drop ID</th>
            <th class="left">Tender Description</th>
            <th class="left" style="text-align: right !important">Bank Drop Amount</th>
        </tr>
        @endif

        @if($activeTab == 'zero-sales')
        <tr>
            <th class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Sales Date</span>
                    <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="fa-solid @if($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                </div>
            </th>
            <th class="left">Store ID</th>
            <th class="left">Retek Code</th>
            <th class="left">Brand</th>
            <th class="left" style="text-align: right !important">Total Sales</th>
        </tr>
        @endif

        @if($activeTab == 'overall-summary')

        <tr>
            <th colspan="4"></th>
            <th style="background: rgba(253, 253, 253, 0.493)" colspan="4">Opening Balance</th>
            <th colspan="4">Sales</th>
            <th style="background: rgba(253, 253, 253, 0.493)" colspan="4">Collection</th>
            <th colspan="4">Closing Balance</th>
        </tr>

        <tr>
            <th style="background: rgba(253, 253, 253, 0.493); ">Store ID</th>
            <th style="background: rgba(253, 253, 253, 0.493); ">Retek Code</th>
            <th style="background: rgba(253, 253, 253, 0.493); ">Brand</th>
            <th style="background: rgba(253, 253, 253, 0.493); ">{{ (($startdate != null && $enddate != null) &&
                ($startdate == $enddate)) ? 'Date' : 'Month'}}</th>
            <th style="text-align: right !important">Cash</th>
            <th style="text-align: right !important">Card</th>
            <th style="text-align: right !important">UPI</th>
            <th style="text-align: right !important">Wallet</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">Cash</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">Card</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">UPI</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">Wallet</th>
            <th style="text-align: right !important">Cash</th>
            <th style="text-align: right !important">Card</th>
            <th style="text-align: right !important">UPI</th>
            <th style="text-align: right !important">Wallet</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">Cash</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">Card</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">UPI</th>
            <th style="background: rgba(253, 253, 253, 0.493); text-align: right !important">Wallet</th>
        </tr>
        @endif

        @if($activeTab == 'chargeback-summary')
        <tr>
            <th class="left">
                <div class="d-flex align-items-center gap-2">
                    <span>Sales Date</span>
                    <i style="opacity: .5; font-size: 1.8em" wire:click="orderBy()" class="fa-solid @if($orderBy == 'asc') fa-caret-up @else fa-caret-down @endif"></i>
                </div>
            </th>
            <th class="left">Credit Date</th>
            <th class="left">Store ID</th>
            <th class="left">Retek Code</th>
            <th class="left">Brand</th>
            <th class="left">TID</th>
            <th class="left">Account No</th>
            <th class="left">Description</th>
            <th class="left">Transaction Branch</th>
            <th class="left" style="text-align: right !important">Credit</th>
            <th class="left" style="text-align: right !important">Debit</th>
        </tr>
        @endif

    </x-scrollable.scroll-head>
    {{ $slot }}
</x-scrollable.scrollable>
