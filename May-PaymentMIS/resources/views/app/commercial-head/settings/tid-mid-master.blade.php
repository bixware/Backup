@extends('layouts.commertial-head')


@section('content')

<div class="row">
    <div class="col-md-12">
        <x-tabs.index :tabs="$tabs" />
        <div class="tab-content tab-transparent-content bg-white" style="min-height: 500px;">
            <div class="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="home-tab">
                <section id="recent">
                    <div class="row">
                        @livewire('commercial-head.settings.tid-mid-master')
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>


@endsection

@section('scripts')

<script defer src="{{ asset('assets/js/custom/Settings-Upload.js') }}"></script>

<script defer>
    const handleFormData = async (e, id) => {

        const parent = document.querySelector(id);

        const data = await request.http({
            url: '/chead/settings/amexmid/' + e.target.dataset.id, // Add a forward slash before the ID
            method: 'POST'
            , data: {
                MID: parent.querySelector('#MID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandName: parent.querySelector('#brandName').value
                , Status: parent.querySelector('#Status').value
                , closureDate: parent.querySelector('#closureDate').value
                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        , });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;
    };
    const handleFormDataicici = async (e, id) => {

        const parent = document.querySelector(id);

        const data = await request.http({
            url: '/chead/settings/icicimid/' + e.target.dataset.id, // Add a forward slash before the ID
            method: 'POST'
            , data: {
                MID: parent.querySelector('#MID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandCode: parent.querySelector('#brandCode').value
                , status: parent.querySelector('#status').value
                , closureDate: parent.querySelector('#closureDate').value

                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        , });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;
    };
    const handleFormDatasbi = async (e, id) => {

        const parent = document.querySelector(id);

        const data = await request.http({
            url: '/chead/settings/sbimid/' + e.target.dataset.id, // Add a forward slash before the ID
            method: 'POST'
            , data: {
                MID: parent.querySelector('#MID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandName: parent.querySelector('#brandName').value
                , status: parent.querySelector('#status').value
                , closureDate: parent.querySelector('#closureDate').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        , });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;
    };
    const handleFormDatahdfc = async (e, id) => {

        const parent = document.querySelector(id);

        const data = await request.http({
            url: '/chead/settings/hdfctid/' + e.target.dataset.id, // Add a forward slash before the ID
            method: 'POST'
            , data: {
                TID: parent.querySelector('#TID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandName: parent.querySelector('#brandName').value
                , status: parent.querySelector('#status').value
                , closureDate: parent.querySelector('#closureDate').value
                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        , });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;
    };

    const createAmexFormData = async (e, id) => {
        e.preventDefault();
        const parent = document.querySelector('#amexCreate');

        const data = await request.http({
            url: '/chead/settings/addamex', // Add a forward slash before the ID
            method: 'POST'
            , data: {
                MID: parent.querySelector('#MID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , openingDt: parent.querySelector('#openingDt').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , brandName: parent.querySelector('#brandName').value
                , Status: parent.querySelector('#Status').value
                , closureDate: parent.querySelector('#closureDate').value
                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;
    };

    const createIciciFormData = async (e, id) => {
        e.preventDefault();
        const parent = document.querySelector('#iciciCreate');

        const data = await request.http({
            url: '/chead/settings/addicici', // Add a forward slash before the ID
            method: 'POST'
            , data: {
                MID: parent.querySelector('#MID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandCode: parent.querySelector('#brandCode').value
                , status: parent.querySelector('#status').value
                , closureDate: parent.querySelector('#closureDate').value
                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;

    };

    const createSbiFormData = async (e, id) => {
        e.preventDefault();
        const parent = document.querySelector('#sbiCreate');

        const data = await request.http({
            url: '/chead/settings/addsbi', // Add a forward slash before the ID
            method: 'POST'
            , data: {
                MID: parent.querySelector('#MID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandName: parent.querySelector('#brandName').value
                , status: parent.querySelector('#status').value
                , closureDate: parent.querySelector('#closureDate').value
                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;

    };

    const createHdfcFormData = async (e, id) => {
        e.preventDefault();
        const parent = document.querySelector('#hdfcCreate');

        const data = await request.http({
            url: '/chead/settings/addhdfc', // Add a forward slash before the ID
            method: 'POST'
            , data: {
                TID: parent.querySelector('#TID').value, // Use the variables defined above
                POS: parent.querySelector('#POS').value
                , storeID: parent.querySelector('#storeID').value
                , oldRetekCode: parent.querySelector('#oldRetekCode').value
                , newRetekCode: parent.querySelector('#newRetekCode').value
                , openingDt: parent.querySelector('#openingDt').value
                , brandName: parent.querySelector('#brandName').value
                , status: parent.querySelector('#status').value
                , closureDate: parent.querySelector('#closureDate').value
                , conversionDt: parent.querySelector('#conversionDt').value
                , relevance: parent.querySelector('#relevance').value
                , EDCServiceProvider: parent.querySelector('#EDCServiceProvider').value
            , }
        });

        if (data.isError) {
            errorMessageConfiguration(data.error);
            return false;
        }

        succesMessageConfiguration('Success'); // Corrected typo: 'succesMessage' to 'successMessage'
        window.location.reload();

        return true;
    };

</script>

@endsection
