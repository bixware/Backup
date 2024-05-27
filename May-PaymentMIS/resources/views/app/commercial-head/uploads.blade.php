@extends('layouts.commertial-head')

@section('content')

<div class="row">
    <div class="col-md-12">
        <x-tabs.index :tabs="$tabs" />
    </div>
    <div class="tab-content tab-transparent-content bg-white">
        <div class="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="home-tab">
            <section id="entry">

                <div class="row mb-3">
                    {{-- HDFC --}}
                    <x-app.commercial-head.uploads.hdfc />

                    {{-- ICICI --}}
                    <x-app.commercial-head.uploads.icici />
                    {{-- sbi --}}
                    <x-app.commercial-head.uploads.sbi />

                    {{-- Axis Upload --}}
                </div>
                <div class="row mb-3">
                    <x-app.commercial-head.uploads.axis />

                    {{-- IDFC --}}
                    <x-app.commercial-head.uploads.idfc />

                    {{-- AMEX bank --}}
                    <x-app.commercial-head.uploads.amex />

                    {{-- All bank --}}
                    <x-app.commercial-head.uploads.all />


                </div>
            </section>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script src="{{ asset('assets/js/custom/bankMIS.js') }}?t={{ time() }}"></script>
@endsection
