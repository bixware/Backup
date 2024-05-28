<div class="container mt-3">
    <template x-if="showAlert == true && success == true ">
        <div class="alert alert-success alert-sm alert-dismissible fade show" role="alert">
            <strong>Successful!</strong> Records Deleted Successfully...!!!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </template>

    <template x-if="showAlert == true && success == false">
        <div class="alert alert-danger alert-sm alert-dismissible fade show" role="alert">
            <strong>Failure!</strong> Records Not Deleted...!!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </template>
</div>
