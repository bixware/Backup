<div>

    {{--
    <x-app.store-user.approval-process.sap-recon-process.tabs :activeTab="$activeTab" /> --}}

    {{-- Filter --}}
    <x-app.store-user.approval-process.sap-recon-process.filters>

        <x-app.store-user.approval-process.sap-recon-process.main-filters show="wallet" :activeTab="$activeTab" :filtering="$filtering" :months="$_months" />
    </x-app.store-user.approval-process.sap-recon-process.filters>

    <section>
        <x-app.store-user.approval-process.sap-recon-process.counts :activeTab="$activeTab" :cashRecons="$cashRecons" />
    </section>


    <div class="col-lg-12">
        {{-- Main sales table --}}
        <x-scrollable.scrollable :dataset="$cashRecons">
            <x-scrollable.scroll-head>
                @if($activeTab == 'wallet')
                <x-app.store-user.approval-process.sap-recon-process.headers.wallet-bank-headers />
                @endif
            </x-scrollable.scroll-head>
            <x-scrollable.scroll-body>
                @if($activeTab == 'wallet')
                <x-app.store-user.approval-process.sap-recon-process.datasets.wallet-bank-dataset :cashRecons="$cashRecons" />
                @endif
            </x-scrollable.scroll-body>
        </x-scrollable.scrollable>

        <script>
            var $j = jQuery.noConflict();
            $j('.searchField').select2();

            document.addEventListener('livewire:load', function() {
                $j('#select02-dropdown').on('change', function(e) {
                    @this.set('filtering', true);
                    @this.set('store', e.target.value);
                });
            });

        </script>

    </div>
