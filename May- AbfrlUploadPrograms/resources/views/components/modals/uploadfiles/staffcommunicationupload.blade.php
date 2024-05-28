<div wire:ignore.self class="modal fade" id="hdfcbank">
    <div wire:ignore.self class="modal-dialog modal-dialog-centered" role="document">
        <div wire:ignore.self class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Staff Communication Upload</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                </button>
            </div>

            <div wire:ignore.self class="modal-body">
                <div class="row">
                    <form wire:submit="save" class="col-lg-12" enctype="multipart/form-data">
                        <h3 style="font-weight: 450 !important; color: #000 !important">Please note that the data must be in certain format for the import to process correctly <a href="{{ url('/') }}/public/samples/staffCommunication.csv" download>Download a sample CSV</a></h3>
                        <div class="drag-area">
                            <p style="color: rgb(211, 119, 14); font-size: .9em !important; text-align: center">Supported files xlsx,csv accepted</p>
                            <div class="icon"><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>
                            <center>
                                <input wire:model="fileupload" type="file" style="margin-left:10px ; font-weight: 450 !important; color: #000 !important">
                            </center>
                            <header>Drag & Drop files to Upload</header>

                            @error('fileupload')
                            <p style="color: red; font-size: .9em !important; text-align: center">{{ $message }}</p>
                            @enderror
                        </div>
                        <button wire:loading.class="when_loading" id="uploadBtn" type="submit" class="btn btn-success green importxls mb-3">Import</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
