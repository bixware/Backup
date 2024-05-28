<x-app.commercial-layout :menus="$this->menus" :tabs="$this->tabs">
    <div x-data="{
        showAlert: false,
        success: false,
        error: null,
        isShowFileArray: false,
        selectedItems: [],
        selectAll: false,
        datauncheck:false,

        deleteItems() {
            if (this.selectedItems.length === 0 && !this.selectAll) {
                errorMessage('Please select at least one item to delete.');
                return;
            }
            confirmAction(() => {
                this.$wire.deleteSelectedFiles({
                    selectedItems: this.selectedItems,
                    selectAll: this.selectAll
                });
                // Reset selectAll and selectedItems
                this.selectAll = false;
                this.selectedItems = [];
            }, 'Are you sure you want to delete these records?');
            return true;
        },

        checkboxes() {
            // If selectAll is checked, disable individual checkboxes
            if (this.selectAll) {
                $('.check-item').prop('disabled', true);
                this.selectedItems = []; // Clear selected items when selectAll is checked
            } else {
                $('.check-item').prop('disabled', false);
            }
        }

    }" x-init="() => {
        Livewire.on('user:created', () => {
            successMessage('Record Deleted Successfully!');
            success = true;
        });

        Livewire.on('user:error', (message) => {
            errorMessage(message);
            success = false;
        });

        Livewire.on('updated', (message) => {
            selectedItems = [];
            selectAll = false;
        });
    }">

        <x-app.admin.settings.delete-page.alerts />
        {{-- filters --}}
        <x-app.admin.settings.delete-page.filters :page="$page" :mPages="$this->mPages" :files="$files" />

        <div class="row mt-3">
            <div class="col-lg-12">
                <x-app.admin.settings.delete-page.headers :dataset="$dataset" :page="$page" :orderBy="$orderBy">
                    @if($page == 'LE & OP')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>

                        <td>{{ !$data->date ? '' : Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->storeName }}</td>
                        <td>{{ $data->OP }}</td>
                        <td>{{ $data->LE }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Crew Target')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ !$data->date ? '' : Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->salesPersonCode }}</td>
                        <td>{{ $data->brandCode }}</td>
                        <td>{{ $data->crewStaffName }}</td>
                        <td>{{ $data->coachName }}</td>
                        <td>{{ $data->employeeId }}</td>
                        <td>{{ $data->NSV }}</td>
                        <td>{{ $data->runningAverageMix }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'AE Target File')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ !$data->date ? '' : Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                        <td>{{ $data->SAPCode }}</td>
                        <td>{{ $data->storeName }}</td>
                        <td>{{ $data->day }}</td>
                        <td>{{ $data->WKNO }}</td>
                        <td>{{ $data->OPNSVTarget }}</td>
                        <td>{{ $data->walkins }}</td>
                        <td>{{ $data->bills }}</td>
                        <td>{{ $data->mensVol }}</td>
                        <td>{{ $data->womensVol }}</td>
                        <td>{{ $data->totalVol }}</td>
                        <td>{{ $data->GSV }}</td>
                        <td>{{ $data->MRP }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'GTM Target')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ !$data->date ? '' : Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                        <td>{{ $data->SAPCode }}</td>
                        <td>{{ $data->storeName }}</td>
                        <td>{{ $data->day }}</td>
                        <td>{{ $data->WKNO }}</td>
                        <td>{{ $data->OPNSVTarget }}</td>
                        <td>{{ $data->walkins }}</td>
                        <td>{{ $data->bills }}</td>
                        <td>{{ $data->mensVol }}</td>
                        <td>{{ $data->womensVol }}</td>
                        <td>{{ $data->totalVol }}</td>
                        <td>{{ $data->GSV }}</td>
                        <td>{{ $data->MRP }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Staff Communication')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->newStoreCode }}</td>
                        <td>{{ $data->brand }}</td>
                        <td>{{ $data->name }}</td>
                        <td>{{ $data->storeNorms }}</td>
                        <td>{{ $data->storeManager }}</td>
                        <td>{{ $data->storeCrew }}</td>
                        <td>{{ $data->coach }}</td>
                        <td>{{ $data->ASM }}</td>
                        <td>{{ $data->PRM }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Running Avg Mix')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ $data->storecode }}</td>
                        <td>{{ $data->employeeId }}</td>
                        <td>{{ $data->crewStaffName }}</td>
                        <td>{{ $data->runningAverageMix }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Prive list')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ !$data->date ? '' : Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                        <td>{{ $data->store }}</td>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->phoneNo }}</td>
                        <td>{{ $data->name }}</td>
                        <td>{{ $data->RM }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Store Target')
                    @foreach ($dataset as $data)
                    <tr>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ !$data->date ? '' : Carbon\Carbon::parse($data->date)->format('d-m-Y') }}</td>
                        <td>{{ $data->storeId }}</td>
                        <td>{{ $data->SMName }}</td>
                        <td>{{ $data->RMName }}</td>
                        <td>{{ $data->NSV }}</td>
                        <td>{{ $data->brandCode }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Season Plan')
                    @foreach ($dataset as $data)
                    <tr>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->SAPCode }}</td>
                        <td>{{ $data->storeName }}</td>
                        <td>{{ $data->month }}</td>
                        <td>{{ $data->day }}</td>
                        <td>{{ $data->WKNo }}</td>
                        <td>{{ $data->storeTGT }}</td>
                        <td>{{ $data->TCMBDepartment }}</td>
                        <td>{{ $data->departMentTGT }}</td>
                        <td>{{ $data->subBrand }}</td>
                        <td>{{ $data->subBrandTGT }}</td>
                        <td>{{ $data->monthYear }}</td>
                        <td>{{ $data->class }}</td>
                        <td>{{ $data->classTGT }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                    </tr>
                    @endforeach
                    @endif

                    @if($page == 'Franchisee')
                    @foreach ($dataset as $data)
                    <tr wire:key='{{ rand() }}'>
                        <td><input type="checkbox" class="check-item" x-model="selectedItems" value="{{ $data->UID }}"></td>
                        <td>{{ $data->storeCode }}</td>
                        <td>{{ $data->vendorCode }}</td>
                        <td>{{ $data->franchiseeName }}</td>
                        <td>{{ $data->franchiseeDOB }}</td>
                        <td>{{ $data->FOFOCompanyName }}</td>
                        <td>{{ $data->franchiseePrimaryPhno }}</td>
                        <td>{{ $data->franchiseeSecondarPhno }}</td>
                        <td>{{ $data->FOFOEmailId }}</td>
                        <td>{{ $data->FOFOAddress }}</td>
                        <td>{{ $data->createdBy }}</td>
                        <td>{{ !$data->createdDate ? '' : Carbon\Carbon::parse($data->createdDate)->format('d-m-Y H:i') }}
                        </td>
                        </td>
                    </tr>
                    @endforeach
                    @endif

                </x-app.admin.settings.delete-page.headers>
            </div>
        </div>

        {{-- <div wire:ignore>
            <x-pages.admin.settings.create-user :roles="$this->roles" :pages="$this->pages" />
        </div> --}}
        {{-- </x-pages.admin.settings.deletepages-tab> --}}
    </div>

    <script>
        // Call checkboxes() function on load
        window.addEventListener('load', function() {
            checkboxes();
        });

        // Function to handle checkbox behavior
        function checkboxes() {
            if (this.selectAll) {
                $('.check-item').prop('checked', true);
                // Update selectedItems to include all items
                this.selectedItems = Array.from(document.querySelectorAll('.check-item')).map(item => item.value);
            } else {
                $('.check-item').prop('checked', false);
                this.selectedItems = [];
            }
        }

    </script>

    </x-app.admin-layout>
