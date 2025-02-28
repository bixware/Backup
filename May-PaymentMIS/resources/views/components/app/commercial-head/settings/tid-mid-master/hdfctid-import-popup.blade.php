@props(['id', 'url', 'name', 'exampleFileLink'])
<!--Modal popup-->
<div x-data="{
    file: null,
    loader: $el.querySelector('.loader')
}" class="modal fade setting" id="hdfcupload" tabindex="1" role="dialog" aria-labelledby="repo" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" style="height:250px !important; max-width: 950px !important; padding: 2em">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Upload Details</h5>
                <div class="right">
                    <!-- <button type="button" class="btn btn-success green">Save</button> -->
                    <button type="button" class="btn grey" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
            <div class="modal-body">
                <h3 style="font-size: 1em; font-weight: 500; color: #000" class="mb-3">Please download the sample file for HDFC TID Import
                    <a href="{{ url('/') }}/public/sample/tidmid/hdfc.xlsx" download="">Download a sample
                        File</a>
                </h3>

                <div class="form-group">
                    <label style="color:#800000;font-weight:600;">Upload*</label>
                    <input x-on:change="file = $event.target.files[0]" id="hdfcFileUpload" class="form-control" type="file" required>
                </div>

            </div>

            <div class="modal-footer">
                <div style="flex: 1">
                    <div class="loader repoLoader" style="display: none">
                        <div class="spinner-border spinner-border-sm" style="color: #000" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span>Loading ...</span>
                    </div>
                </div>
                <div class="d-flex" style="gap: 3">
                    <button @click="() => mainUploadhdfcFunc(file, loader)" type="button" class="btn btn-success green" id="uploadhdfcBtn" style="width: fit-content">Upload</button>
                    <button type="button" class="btn grey" data-bs-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
