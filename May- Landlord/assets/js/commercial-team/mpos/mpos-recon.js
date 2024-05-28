console.log("working fine bitch");

var $j = jQuery.noConflict();

/**
 * Check for proper file extension
 * @param {*} fileName
 * @returns
 */
const fileExtension = (fileName) => {
    const allowedExtensions = ["pdf", "jpg", "png"];
    const ext = fileName.name.split(".")[1];

    if (!ext) {
        return false;
    }

    if (!allowedExtensions.includes(ext)) {
        return false;
    }
    return true;
};

/**
 * Main Validation
 * @param {*} id
 * @returns
 */
function MainFormvalidate(id) {
    // removing all the form errors
    document
        .querySelectorAll(".form-error")
        .forEach((item) => item.classList.remove("form-error"));

    var error = false;
    // checking for error
    const modal = document.querySelector(`#${id}`);
    const inputs = modal.querySelectorAll(".mainFormValidaitionInputs");

    // dont need validation array
    const dontValidateArray = ["supportDocupload"];

    inputs.forEach((item) => {
        mainInputs = item.querySelectorAll("input");
        files = item.querySelectorAll('input[type="file"]');

        files.forEach((inp) => {
            if (inp.files[0] && !fileExtension(inp.files[0])) {
                error = true;
                inp.classList.add("form-error");
            }
        });

        mainInputs.forEach((inp) => {
            if (!dontValidateArray.includes(inp.id)) {
                if (inp.value == "") {
                    error = true;
                    inp.classList.add("form-error");
                }
            }
        });
    });

    if (error == true) {
        return false;
    }

    return true;
}

/**
 * Card Recon submit
 * @param {*} dataset
 * @param {*} id
 * @param {*} total
 * @param {*} tenderAdj
 * @param {*} bankAdj
 * @returns
 */

const cashApproval = async (dataset, id, total, tenderAdj, bankAdj) => {
    dataset.map(async (item) => {
        const formData = new FormData();
        console.log(item.item);
        formData.append("item", item.item == "Other" ? item.name : item.item);
        formData.append("mposCashSalesRecoUID", id);
        formData.append("amount", item.amount);
        formData.append("bankName", item.bankName);
        formData.append("creditDate", item.creditDate);
        formData.append("slipnoORReferenceNo", item.slipnoORReferenceNo);
        formData.append("remarks", item.remarks);
        formData.append(
            "supportDocupload",
            item.supportDocupload ? item.supportDocupload[0] : ""
        );
        formData.append("tenderAdj", tenderAdj);
        formData.append("bankAdj", bankAdj);
        formData.append("adjAmount", total);

        // creatign a new record
        const data = await request.http({
            url: "/cuser/process/mpos-recon/cash-create/" + id,
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
        });
    });

    succesMessageConfiguration("Success");
    window.location.reload();

    return true;
};

const cashmisApproval = async (dataset, id, total, tenderAdj, bankAdj) => {
    dataset.map(async (item) => {
        const formData = new FormData();
        formData.append("item", item.item == "Other" ? item.name : item.item);
        formData.append("mposCashBankMISSalesRecoUID", id);
        formData.append("amount", item.amount);
        formData.append("bankName", item.bankName);
        formData.append("creditDate", item.creditDate);
        formData.append("slipnoORReferenceNo", item.slipnoORReferenceNo);
        formData.append("remarks", item.remarks);
        formData.append(
            "supportDocupload",
            item.supportDocupload ? item.supportDocupload[0] : ""
        );
        formData.append("tenderAdj", tenderAdj);
        formData.append("bankAdj", bankAdj);
        formData.append("adjAmount", total);

        // creating a new record
        const data = await request.http({
            url: "/cuser/process/mpos-recon/cashmis-create/" + id,
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
        });
    });

    succesMessageConfiguration("Success");
    window.location.reload();

    return true;
};

// loading event
document.addEventListener("livewire:load", (event) => {
    // listen for reset event
    Livewire.on("resetAll", (e) => {
        const resetItems = [
            "#cash-stores",
            "#cashmis-stores",

            "#cash-codes",
            "#cashmis-codes",
        ];

        resetItems.forEach((item) => {
            $j(item).select2("destroy");
            $j(item).val("");
            $j(item).select2();
        });
    });
});
