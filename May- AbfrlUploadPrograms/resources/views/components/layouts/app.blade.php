<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>{{ $title }}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="shortcut icon" href="{{ url('/') }}/public/favicon.ico" />
    <link rel="stylesheet" href="{{ asset('/assets/css/static/font-awesome-solid.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/assets/css/static/font-awesome-all.min.css') }}">

    <link rel="stylesheet" href="{{ asset('/assets/css/login.css') }}">
    <script defer src="{{ asset('/assets/js/jquery.min.js') }}"></script>
    <script defer src="{{ asset('/assets/js/select2.min.js') }}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>




    <script defer src="{{ asset('/assets/js/select2.min.js') }}" integrity="sha512-2ImtlRlf2VVmiGZsjm9bEyhjGW4dU7B6TNwh/hx/iSByxNENtj3WVE6o/9Lj4TJeVXPi4bnOIMXFIJJAeufa0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


</head>

<body>
    {{ $slot }}
</body>

</html>
