<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>ABFRL - Upload Program Portal</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" href="{{ url('/') }}/public/favicon.ico" />

    <link rel="stylesheet" href="{{ url('/') . '/assets/css/style.css' }}">
    <link rel="stylesheet" href="{{ url('/') . '/assets/css/admin/app.css' }}">
    <link rel="stylesheet" href="{{ url('/') . '/assets/css/static/select2.min.css' }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/solid.min.css" />


    <style>
        .dropdown-toggle::after {
            display: none;
        }


        #hdfcbank .modal-dialog {
            max-width: 800px;
        }

        .select2-selection {
            padding: 0.65em !important;
        }

        .select2-container {
            height: 40px !important;
            padding: 0;
            margin: 0;
        }

        @media (min-width: 992px) {
            .sidebar-icon-only .main-panel {
                width: calc(100% - 60px);
                margin-left: 60px;
                margin-top: 50px !important;
            }
        }

        .modal-backdrop {
            z-index: 4;
        }

    </style>
</head>

<body>
    {{ $slot }}

    <script defer src="{{ url('/') . '/assets/js/jquery.min.js' }}"></script>
    <script defer src="{{ url('/') . '/assets/js/select2.min.js' }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script defer src="{{ url('/') . '/assets/js/misc.js' }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/solid.min.js"></script>

    <script>
        $.fn.modal.Constructor.prototype.show = () => $('.modal-backdrop').not(":first").remove()

    </script>


    <script defer>
        /**
         * Generating success response
         * @param {*} message
         * @returns
         */
        const successMessage = (message) => {
            return Swal.fire("Success!", message, "success");
        };
        // }


        /**
         * Generating error response
         * @param {*} message
         * @returns
         */
        const errorMessage = (message) => {
            return Swal.fire("Error!", message, "error");
        };
        // }



        /**
         * Select confirm aciton
         * @param {*} message
         * @returns
         */
        const confirmAction = (callback, message) => {
            Swal.fire({
                title: 'Confirm Action'
                , text: message
                , icon: 'question'
                , showCancelButton: true
                , confirmButtonColor: '#3085d6'
                , cancelButtonColor: '#d33'
                , confirmButtonText: 'Confirm'
                , cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed == true) {
                    callback()
                }
            });
        }

    </script>
</body>

</html>
