<div class="col-lg-2 col-12">
    <div class="entry-box1 p-3">
        <h2>AXIS</h2>
        <div class="row">
            <div class="col-lg-12 col-6">
                <button class="btn btn-axis" data-bs-toggle="modal" data-bs-target="#axisCashmodel"><i class="fa fa-plus mb-1" aria-hidden="true"></i><br>Cash</button>
            </div>
            <div class="col-lg-4 col-6" style="display: none;">
                <button class="btn btn-axis"><i class="fa fa-plus mb-1" aria-hidden="true"></i><br>Card</button>
            </div>
            <div class="col-lg-4 col-6" style="display: none;">
                <button class="btn btn-axis"><i class="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>

    <!-- <section class="exampleModalCenter1">
        <div class="modal fade" id="axismodel" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Axis Bank Upload</h5>

                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fa fa-times" aria-hidden="true"></i></span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <h3>Please note that the data must be in certain format for the import to process
                                    correctly
                                    <a href="{{ asset('public/sample/axis-example-csv.xlsx') }}" download="">Download a
                                        sample
                                        CSV</a> or Learn More
                                </h3>
                                <div class="drag-area">
                                    <div class="icon"><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>
                                    <center>
                                        <input type="file" id="excel_file" name="excel_file">
                                    </center>
                                    <header>Drag & Drop files to Upload</header>
                                </div>



                                <div class="d-flex"
                                    style="justify-content: space-between; align-items: center; padding: 0 2em">

                                    <div>
                                        <div id="axisSpinner" class="loader" style="display: none">
                                            <div class="spinner-border spinner-border-sm" style="color: #000"
                                                role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            <span>Loading ...</span>
                                        </div>
                                    </div>

                                    <button type="button" id="save-btn" class="btn btn-success green importxls">Import
                                        xls</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->

    <x-modals.commercial-head.upload name="Axis Cash Upload" id="axisCashmodel" url="/chead/upload/add-axis-cash" exampleFileLink="{{ asset('public/sample/axis-cash-sample.CSV') }}" />

</div>
