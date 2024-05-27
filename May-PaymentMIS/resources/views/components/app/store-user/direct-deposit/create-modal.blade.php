<div x-data="directDepositForm()">
    <!-- Bootstrap modal -->
    <div x-show="showModal" x-transition:enter="transition ease-out duration-300" x-transition:leave="transition ease-in duration-300" class="modal fade" id="create-model-for-direct-deposit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document" style="max-width:80%;">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Direct Deposit</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Bootstrap form -->
                    <form x-on:submit.prevent="save" class="row g-3 needs-validation" novalidate enctype="multipart/form-data">
                        <!-- Deposit Slip No -->
                        <div class="col-md-4">
                            <label for="depositSlipNo" class="form-label">Deposit Slip No<span class="text-danger">*</span></label>
                            <input x-model="depositSlipNo" type="text" class="form-control" placeholder="Enter Deposit Slip No" id="depositSlipNo" required>
                            <span x-text="errors.depositSlipNo" class="text-danger d-block"></span>
                        </div>

                        <!-- Amount -->
                        <div class="col-md-4">
                            <label for="amount" class="form-label">Amount<span class="text-danger">*</span></label>
                            <input x-model="amount" type="number" class="form-control" placeholder="Enter Amount" id="amount" required>
                            <span x-text="errors.amount" class="text-danger d-block"></span>
                        </div>

                        <!-- Date -->
                        <div class="col-md-4">
                            <label for="date" class="form-label">Date<span class="text-danger">*</span></label>
                            <input x-model="date" type="date" class="form-control" placeholder="Enter Date" id="date" required>
                            <span x-text="errors.date" class="text-danger d-block"></span>
                        </div>

                        <!-- Bank -->
                        <div class="col-md-4">
                            <label for="bank" class="form-label">Bank<span class="text-danger">*</span></label>
                            <select x-model="bank" class="form-select">
                                {{-- <option value=""></option> --}}
                                <option value="" selected>Select a Bank</option>
                                <option value="HDFC">HDFC</option>
                                <option value="ICICI">ICICI</option>
                                <option value="SBI">SBI</option>
                                <option value="AMEX CARD">AMEX CARD</option>
                            </select>
                            <span x-text="errors.bank" class="text-danger d-block"></span>
                        </div>

                        <!-- Account No -->
                        <div class="col-md-4">
                            <label for="accountNo" class="form-label">Account No<span class="text-danger">*</span></label>
                            <input x-model="accountNo" type="text" class="form-control" placeholder="Enter Account No" id="accountNo" required>
                            <span x-text="errors.accountNo" class="text-danger d-block"></span>
                        </div>

                        <!-- Bank Branch -->
                        <div class="col-md-4">
                            <label for="bankBranch" class="form-label">Bank Branch<span class="text-danger">*</span></label>
                            <input x-model="bankBranch" type="text" class="form-control" placeholder="Enter Bank Branch" id="bankBranch" required>
                            <span x-text="errors.bankBranch" class="text-danger d-block"></span>
                        </div>

                        <!-- Location -->
                        <div class="col-md-4">
                            <label for="location" class="form-label">Location<span class="text-danger">*</span></label>
                            <input x-model="location" type="text" class="form-control" placeholder="Enter Location" id="location" required>
                            <span x-text="errors.location" class="text-danger d-block"></span>
                        </div>

                        <!-- City -->
                        <div class="col-md-4">
                            <label for="city" class="form-label">City<span class="text-danger">*</span></label>
                            <input x-model="city" type="text" class="form-control" placeholder="Enter City" id="city" required>
                            <span x-text="errors.city" class="text-danger d-block"></span>
                        </div>

                        <!-- State -->
                        <div class="col-md-4">
                            <label for="state" class="form-label">State<span class="text-danger">*</span></label>
                            <input x-model="state" type="text" class="form-control" placeholder="Enter State" id="state" required>
                            <span x-text="errors.state" class="text-danger d-block"></span>
                        </div>

                        <!-- Sales Date From -->
                        <div class="col-md-4">
                            <label for="salesDateFrom" class="form-label">Sales Date From<span class="text-danger">*</span></label>
                            <input x-model="salesDateFrom" type="date" class="form-control" placeholder="Enter Sales Date From" id="salesDateFrom" required>
                            <span x-text="errors.salesDateFrom" class="text-danger d-block"></span>
                        </div>

                        <!-- Sales Date To -->
                        <div class="col-md-4">
                            <label for="salesDateTo" class="form-label">Sales Date To<span class="text-danger">*</span></label>
                            <input x-model="salesDateTo" type="date" class="form-control" placeholder="Enter Sales Date To" id="salesDateTo" required>
                            <span x-text="errors.salesDateTo" class="text-danger d-block"></span>
                        </div>

                        <!-- Cash Deposit By -->
                        <div class="col-md-4">
                            <label for="cashDepositBy" class="form-label">Cash Deposit By<span class="text-danger">*</span></label>
                            <input x-model="cashDepositBy" type="text" class="form-control" placeholder="Enter Cash Deposit By" id="cashDepositBy" required>
                            <span x-text="errors.cashDepositBy" class="text-danger d-block"></span>
                        </div>

                        <!-- Other Remarks -->
                        <div class="col-md-6">
                            <x-app.store-user.direct-deposit.remarks :remarks="$remarks" />
                            <span x-text="errors.otherRemarks" class="text-danger d-block"></span>
                        </div>

                        <!-- Reason -->
                        <div class="col-md-6">
                            <label for="reason" class="form-label">Reason for Direct Deposit<span class="text-danger">*</span></label>
                            <textarea x-model="reason" class="form-control" placeholder="Enter Reason" id="reason" rows="3" required></textarea>
                            <span x-text="errors.reason" class="text-danger d-block"></span>
                        </div>

                        <!-- Deposit Slip Proof -->
                        <div class="col-md-4">
                            <label for="depositSlipProof" class="form-label">Deposit Slip Proof (Max file size 10MB)<span class="text-danger">*</span></label>
                            <input x-on:change="(e) => depositSlipProof = e.target.files[0]" type="file" class="form-control" placeholder="Enter Deposit Slip Proof" id="depositSlipProof" required>
                            <label class="form-label">Accepted File Types PNG, JPG, PDF, CSV, XLSX</label>
                            <span x-text="errors.depositSlipProof" class="text-danger d-block"></span>
                        </div>

                        <!-- Submit Button -->
                        <div class="w-100" style="display: flex; justify-content: flex-end">
                            <button type="submit" class="btn btn-success btn-sm" :style="{width: 'fit-content', opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'all' }" @click="$wire.filtering = false">Submit</button>
                        </div>
                    </form>
                </div>


                <div class="modal-footer">
                    <div x-show="loading" style="display: block; text-align:left; margin: 0 1em; flex: 1; color: #000">
                        <div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span>Loading ...</span>
                    </div>
                    <div class="p-2"></div>
                </div>
            </div>
        </div>
    </div>


</div>
