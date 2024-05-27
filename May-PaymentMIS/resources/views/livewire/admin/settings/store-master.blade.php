<div>
    <div class="row mb-2">

        <div class="col-lg-12 d-flex align-items-center justify-content-end">

            <div class="btn-group mb-2 mt-2">
                <div class="mb-0" style="float: right;">
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#storemasterCreate">Add
                        Store Master</button>
                </div>
            </div>
            <x-app.commercial-head.settings.storemaster.create-popup id="storemasterCreate" />
        </div>
    </div>
    <div x-data class="col-lg-12">

        <x-livewire.admin.store-master-header :dataset="$datas">
            <x-scrollable.scroll-body>
                @foreach ($datas as $data)
                <tr>
                    <td class="right"> {{ $data->{'Store ID'} }} </td>
                    <td class="right"> {{ $data->{'Store Name'} }} </td>
                    <td class="right"> {{ $data->{'RETEK Code'} }} </td>
                    <td class="right"> {{ $data->{'Brand Desc'} }} </td>
                    <td class="right"> {{ $data->{'Region'} }} </td>
                    {{-- <td class="right"> {{ $data->{'SStatus'} }} </td> --}}
                    <td class="right"> {{ $data->{'Pickup Bank'} }} </td>
                    <td class="right"> {{ $data->{'Location'} }} </td>
                    <td class="right"> {{ $data->{'City'} }} </td>
                    <td class="right"> {{ $data->{'State'} }} </td>
                    <td class="right"> {{ $data->{'Pin code'} }} </td>
                    <td>
                        <a href="#" style="font-size: 1.1em" data-bs-toggle="modal" data-bs-target="#exampleModalCenter_{{ $data->{'Store ID'} }}">View</a>
                    </td>
                </tr>

                <div class="modal fade" id="exampleModalCenter_{{ $data->{'Store ID'} }}" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered " role="document" style="max-width:90%;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Store Master</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="forms-sample">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>MGP SAP code : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'MGP SAP code'} }} </h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Store ID : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Store ID'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>RETEK Code : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'RETEK Code'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>OLD IO No : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'OLD IO No'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>New IO No : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'New IO No'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Brand Desc : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Brand Desc'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Sub Brand : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Sub Brand'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>StoreTypeasperBrand : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'StoreTypeasperBrand'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Channel : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Channel'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Store Name : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Store Name'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Store opening Date : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ date('d-m-Y', strtotime($data->{'Store opening Date'})) }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>SStatus : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ date('d-m-Y', strtotime($data->{'SStatus'})) }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>QTR : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ date('d-m-Y', strtotime($data->{'QTR'})) }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Location : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Location'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>City : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'City'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>State : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'State'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Address : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Address'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Pin code : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Pin code'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Located : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{' Located '} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Store Area : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{' Store Area (Sq Feet)'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Region : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Region'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Store Manager Name : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Store Manager Name'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Contact no : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Contact no'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Basement occupied (Y/No) : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Basement occupied (Y/No)'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>ARM email id : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'ARM email id'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>RM email id : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'RM email id'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>NROM email id : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'NROM email id'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>RCM mail : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'RCM mail'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Correct store email id : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Correct store email id'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>HO contact : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'HO contact'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>RD email id : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'RD email id'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">
                                                    <h5>Pickup Bank : </h5>
                                                </label>
                                                <label for="exampleInputUsername1" style="color:gray">
                                                    <h5>{{ $data->{'Pickup Bank'} }}</h5>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <br>

                                <div class="modal-footer">

                                    <div class="footer-loading-btn" style="display: none; text-align:left; margin: 0 1em; flex: 1; color: #000">
                                        <div class="spinner-border spinner-border-sm" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        <span>Loading ...</span>
                                    </div>

                                    {{-- <button x-data data-bs-target="#exampleModalCenter_{{ $data->{'Store ID'} }} data-id="{{ $data->{'Store ID'} }}" data-bs-toggle="modal" type="button" class="btn btn-success green">Edit</button> --}}

                                    <a href="#" data-bs-toggle="modal1" data-bs-target="#exampleModalCenter_{{ $data->{'Store ID'} }}" type="button" class="btn btn-success green">Edit</a>
                                    <button type="button" class="btn grey" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    @endforeach
            </x-scrollable.scroll-body>
        </x-livewire.admin.store-master-header>

    </div>
</div>
