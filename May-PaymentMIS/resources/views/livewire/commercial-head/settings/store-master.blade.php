<div x-init="() => {
    Livewire.on('livewire:message.success', ({
        message
    }) => {
        console.log(message);
        const _message = !message ? 'Success' : message
        succesMessageConfiguration(_message);
        window.location.reload()
    })

    Livewire.on('livewire:message.failure', ({
        message
    }) => {
        const _message = !message ? 'Success' : message
        errorMessageConfiguration(_message);
    })
}">

    <div class="row mb-2">
        <div class="col-lg-12 d-flex align-items-center justify-content-end">
            <div class="btn-group mb-2 mt-2">
                <div class="mb-0" style="float: right;">
                    {{-- <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#storemasterCreate">Add
                        Store Master</button> --}}
                    {{-- <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#storemasterImport">Upload
                        Store Master</button> --}}
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#storemasterUpload">Import
                        Store Master</button>
                </div>
            </div>
            <x-app.commercial-head.settings.storemaster.store-master-import-popup id="storemasterUpload" />
            {{-- <x-app.commercial-head.settings.storemaster.store-master-upload-popup id="storemasterUpload" /> --}}
            {{-- <x-app.commercial-head.settings.storemaster.create-popup id="storemasterCreate" /> --}}
        </div>
    </div>

    <x-livewire.CommercialHead.store-master-header :dataset="$datas">
        <x-scrollable.scroll-body>
            @foreach ($datas as $data)
            <tr>
                <td class="left"> {{ $data->{'Store ID'} }} </td>
                <td class="left"> {{ $data->{'Store Name'} }} </td>
                <td class="left"> {{ $data->{'RETEK Code'} }} </td>
                <td class="left"> {{ $data->{'Brand Desc'} }} </td>
                <td class="left"> {{ $data->{'Region'} }} </td>
                <td class="left"> {{ $data->{'Pickup Bank'} }} </td>
                <td class="left"> {{ $data->{'Location'} }} </td>
                <td class="left"> {{ $data->{'City'} }} </td>
                <td class="left"> {{ $data->{'State'} }} </td>
                <td class="left"> {{ $data->{'Pin code'} }} </td>
                <td>
                    <a href="#" style="font-size: 1.1em" data-bs-toggle="modal" data-bs-target="#exampleModalCenter_{{ $data->{'Store ID'} }}">View</a>
                </td>
            </tr>

            <x-app.commercial-head.settings.storemaster.view :data="$data" />
            @endforeach

        </x-scrollable.scroll-body>
    </x-livewire.CommercialHead.store-master-header>
</div>
