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

function MainFormvalidate(id) {
    // removing all the form errors
    document
        .querySelectorAll(".form-error")
        .forEach((item) => item.classList.remove("form-error"));

    const dontValidateArray = [];

    var error = false;
    // checking for error
    const modal = document.querySelector(`#${id}`);
    const inputs = modal.querySelectorAll(".mainFormValidaitionInputs");

    inputs.forEach((item) => {
        mainInputs = item.querySelectorAll("input");
        files = item.querySelectorAll('input[type="file"]');

        files.forEach((inp) => {
            // if (!dontValidateArray.includes(inp.id)) {
            if (inp.files[0] && !fileExtension(inp.files[0])) {
                error = true;
                inp.classList.add("form-error");
            }
            // }
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

// cash approval
const cashApproval = async (dataset, id, total) => {
    // looping through the dataset
    dataset.map(async (item) => {
        const formData = new FormData();
        formData.append("item", item.item == "Other" ? item.name : item.item);
        formData.append("cashMisBkStRecoUID", id);
        formData.append("amount", item.amount);
        formData.append("bankName", item.bankName);
        formData.append("creditDate", item.creditDate);
        formData.append("slipnoORReferenceNo", item.slipnoORReferenceNo);
        formData.append("remarks", item.remarks);
        formData.append(
            "supportDocupload",
            item.supportDocupload ? item.supportDocupload[0] : ""
        );
        formData.append("adjAmount", total);

        // creatign a new record
        const data = await request.http({
            url: "/cuser/process/bank-statement-recon/cash/create/" + id,
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

const cardApproval = async (dataset, id, total) => {
    // looping through the dataset
    const main = dataset.map(async (item) => {
        const formData = new FormData();
        formData.append("item", item.item == "Other" ? item.name : item.item);
        formData.append("bankName", item.bankName);
        formData.append("remarks", item.remarks);
        formData.append(
            "supportDocupload",
            item.supportDocupload ? item.supportDocupload[0] : ""
        );
        formData.append("cardMisBkStRecoUID", id);
        formData.append("amount", item.amount || 0);
        formData.append("creditDate", item.creditDate);
        formData.append("slipnoORReferenceNo", item.slipnoORReferenceNo);
        formData.append("adjAmount", total);

        // creatign a new record
        const data = await request.http({
            url: "/cuser/process/bank-statement-recon/card/create/" + id,
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
        });

        return data.isSuccess;
    });

    succesMessageConfiguration("Success");
    window.location.reload();
    return;
};

const walletApproval = async (dataset, id, total) => {
    // looping through the dataset
    dataset.map(async (item) => {
        const formData = new FormData();

        formData.append("walletMisBkStRecoUID", id);
        formData.append("item", item.item == "Other" ? item.name : item.item);
        formData.append("amount", item.amount);
        formData.append("bankName", item.bankName);
        formData.append("creditDate", item.creditDate);
        formData.append("slipnoORReferenceNo", item.slipnoORReferenceNo);
        formData.append("remarks", item.remarks);
        formData.append(
            "supportDocupload",
            item.supportDocupload ? item.supportDocupload[0] : ""
        );
        formData.append("adjAmount", total);

        // creatign a new record
        const data = await request.http({
            url: "/cuser/process/bank-statement-recon/wallet/create/" + id,
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

const upiApproval = async (dataset, id, total) => {
    // looping through the dataset
    dataset.map(async (item) => {
        const formData = new FormData();
        formData.append("item", item.item == "Other" ? item.name : item.item);
        formData.append("bankName", item.bankName);
        formData.append("remarks", item.remarks);
        formData.append(
            "supportDocupload",
            item.supportDocupload ? item.supportDocupload[0] : ""
        );
        formData.append("cardMisBkStRecoUID", id);
        formData.append("amount", item.amount || 0);
        formData.append("creditDate", item.creditDate);
        formData.append("slipnoORReferenceNo", item.slipnoORReferenceNo);
        formData.append("adjAmount", total);

        // creatign a new record
        const data = await request.http({
            url: "/cuser/process/bank-statement-recon/upi/create/" + id,
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
