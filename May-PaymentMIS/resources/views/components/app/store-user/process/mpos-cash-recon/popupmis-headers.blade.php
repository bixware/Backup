<form class="forms-sample">
    <div class="row">
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Store ID : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{ $data->storeID }} </h5>
                </label>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Store Name : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{ $data->{'Store Name'} }}</h5>
                </label>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Location : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{ $data->Location }}</h5>
                </label>
            </div>
        </div>
    </div>
    <div class="row" style="margin-top: -20px">

        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Retek Code : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{ $data->retekCode }}</h5>
                </label>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Brand : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{ $data->brand }}</h5>
                </label>
            </div>
        </div>
        {{-- <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Pickup Bank : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{ $data->pickupBank }}</h5>
                </label>
            </div>
        </div> --}}
    </div>
    <div class="row" style="margin-top: -20px; margin-bottom: -20px;">
        <div class="col-lg-4">
            <div class="form-group">
                <label for="exampleInputUsername1">
                    <h5>Reconciliation Date : </h5>
                </label>
                <label for="exampleInputUsername1">
                    <h5>{{
                    Carbon\Carbon::parse($data->depositDate)->format('d-m-Y')
                    }}</h5>
                </label>
            </div>
        </div>
    </div>
</form>
