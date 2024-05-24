import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import PhoneInput from "react-phone-input-2";
import { apiPost, apiFormDatePost } from "../../../Api/apiCommon";
import { FileUploader } from "react-drag-drop-files";
import AlertConfirm from "react-alert-confirm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { Document, Page } from "react-pdf";
import Button from "react-bootstrap-button-loader";
import { pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "react-notifications";

import {
  apiAction,
  toastAction,
  toastActionAlert,
} from "../../../customRedux/actions/Actions";
import {
  toastConstant,
  apiConstant,
} from "../../../customRedux/constants/actionConstant";

//file types
const imgFileTypes = ["JPG", "JPEG", "PNG"];
const docFileTypes = ["PDF", "DOCX", "DOC"];
const vidFileTypes = ["MP4", "MOV", "AVI", "WMV"];

const Newregistration = () => {
  const [Name, setName] = useState("");
  const [parentsContactNo, setparentsContactNo] = useState("");
  const [address, setaddress] = useState("");
  const [expectedJoinDate, setexpectedJoinDate] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [func, setfunc] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [pan, setpan] = useState("");
  const [previousExperience, setpreviousExperience] = useState("");
  const [state, setstate] = useState("");
  const [ifscCode, setifscCode] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [aadhar, setaadhar] = useState("");
  const [personalEmail, setpersonalEmail] = useState("");
  const [pincode, setpincode] = useState("");
  const [branchName, setbranchName] = useState("");
  const [latestEdu, setlatestEdu] = useState("");
  const [passedOut, setpassedOut] = useState("");

  //file upload validation variables
  const [panFileClass, setpanFileClass] = useState("font-13 text-muted");
  const [aadharOneClass, setaadharOneClass] = useState("font-13 text-muted");
  const [aadharTwoClass, setaadharTwoClass] = useState("font-13 text-muted");
  const [storevideoFileClass, setstorevideoFileClass] =
    useState("font-13 text-muted");

  const [show, setShow] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [videoViewer, setVideoViewer] = useState(false);

  useEffect(() => {
    // window.menuFunctionVariable.init();
    // window.addEventListener("resize", async function () {
    //   var innerWidth = window.innerWidth ? window.innerWidth : null;
    //   if (innerWidth != null) {
    //     if (innerWidth >= 992) {
    //       document.getElementById("navigation").style.display = "block";
    //     } else if (innerWidth <= 990) {
    //       document.getElementById("navigation").style.display = "none";
    //     }
    //   }
    // });
    getStateList();
    // registration();
  }, []);

  const [stateList, setStateList] = useState([]);
  const getStateList = async () => {
    try {
      const returnapi = await apiPost("getstatelist", {});
      if (!returnapi.data.error) {
        setStateList(returnapi.data.StateList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const changeHandler = (e) => {
    setfunc(e.target.value);
    if (e.target.value === "store") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const [storevideoFile, setstorevideoFile] = useState(null);
  const storevideoFileChange = (file) => {
    if (file.length != 0) {
      setstorevideoFile(file);
    }
  };
  const dispatch = useDispatch();
  const fileValidtion = (
    panFileCheck,
    aadharOneFileCheck,
    aadharTwoFileCheck,
    storevideoFileCheck
  ) => {
    if (panFileCheck) {
      setpanFileClass("font-13 text-muted");
    } else {
      setpanFileClass("inputImportantRed");
    }
    if (aadharOneFileCheck) {
      setaadharOneClass("font-13 text-muted");
    } else {
      setaadharOneClass("inputImportantRed");
    }
    if (aadharTwoFileCheck) {
      setaadharTwoClass("font-13 text-muted");
    } else {
      setaadharTwoClass("inputImportantRed");
    }
    if (storevideoFileCheck) {
      setstorevideoFileClass("font-13 text-muted");
    } else {
      setstorevideoFileClass("inputImportantRed");
    }
  };

  const aadharOnBlur = async () => {
    try {
      const response = await apiPost("validate-aadhar", {
        aadharNo: aadhar,
      });
      if (!response.data.error) {
        setAadharMssage(response.data.message);
        setAadharVisible(response.data.code == 1 ? "block" : "none");
        setAadharNoPlaceHolder(aadhar);
        setaadhar(response.data.code == 1 ? "" : aadhar);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aadharKeyUp = (e) => {
    if (aadharNo.length == 12) {
      aadharOnBlur();
    }
    if (aadharNo.length > 0) {
      setAadharNoPlaceHolder("Enter your AADHAR number");
    }
  };

  const aadharNo = (event) => {
    if (
      !(
        (event.charCode != 8 && event.charCode == 0) ||
        (event.charCode >= 48 && event.charCode <= 57)
      )
    ) {
      event.preventDefault();
    }
  };

  //aadhar validation variables
  const [aadharMssage, setAadharMssage] = useState("");
  const [aadharVisible, setAadharVisible] = useState("none");
  const [aadharNoPlaceHolder, setAadharNoPlaceHolder] = useState(
    "Enter your AADHAR number"
  );

  const mailOnBlur = async () => {
    try {
      const response = await apiPost("validate-mail", {
        mail: personalEmail,
      });
      if (!response.data.error) {
        setMailMssage(response.data.message);
        setMailVisible(response.data.code == 1 ? "block" : "none");
        setMailPlaceHolder(personalEmail);
        setpersonalEmail(personalEmail);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mailKeyUp = (e) => {
    if (personalEmail.length > 0) {
      setMailPlaceHolder("Enter your personal mail");
    }
  };

  //mail validation variables
  const [mailMssage, setMailMssage] = useState("");
  const [mailVisible, setMailVisible] = useState("none");
  const [mailPlaceHolder, setMailPlaceHolder] = useState(
    "Enter your personal mail"
  );

  const Pincode = (event) => {
    //accept number only
    if (
      !(
        (event.charCode != 8 && event.charCode == 0) ||
        (event.charCode >= 48 && event.charCode <= 57)
      )
    ) {
      event.preventDefault();
    }
  };

  const BranchName = (event) => {
    if (
      !(
        (event.charCode > 64 && event.charCode < 91) ||
        (event.charCode > 96 && event.charCode < 123) ||
        event.charCode == 32 ||
        (event.charCode != 8 && event.charCode == 0)
      )
    ) {
      event.preventDefault();
    }
  };

  const [CertificateFile, setCertificateFile] = useState(null);
  const CertificateFileChange = (file) => {
    if (file.length != 0) {
      setCertificateFile(file);
    }
  };

  const openPDFModel = (name) => {
    setPageNumber(1);

    if (name == "companyOfferLetter") {
      setFileClearName("companyOfferLetter");
      setPdfViewFile(companyLetterFile[0]);
    }
    if (name == "Experience") {
      setFileClearName("Experience");
      setPdfViewFile(experienceFile[0]);
    }
    if (name == "resume") {
      setFileClearName("resume");
      setPdfViewFile(resumeFile[0]);
    }
    if (name == "pay1") {
      setFileClearName("pay1");
      setPdfViewFile(payslipOneFile[0]);
    }
    if (name == "pay2") {
      setFileClearName("pay2");
      setPdfViewFile(payslipTwoFile[0]);
    }
    if (name == "pay3") {
      setFileClearName("pay3");
      setPdfViewFile(payslipThreeFile[0]);
    }
    if (name == "certificate") {
      setFileClearName("certificate");
      setPdfViewFile(CertificateFile[0]);
    }
    setShow(true);
  };

  // file clear
  const [fileClearName, setFileClearName] = useState("");

  //file onchange function lists
  const [panFile, setpanFile] = useState(null);
  const panFileChange = (file) => {
    setpanFile(null);
    if (file.length != 0) {
      setpanFile(file);
      setpanFileClass("font-13 text-muted");
    }
  };

  const [aadharFrontFile, setaadharFrontFile] = useState(null);
  const aadharFrontFileChange = (file) => {
    if (file.length != 0) {
      setaadharFrontFile(file);
      setaadharOneClass("font-13 text-muted");
    }
  };

  const [aadharBackFile, setaadharBackFile] = useState(null);
  const aadharBackFileChange = (file) => {
    if (file.length != 0) {
      setaadharBackFile(file);
      setaadharTwoClass("font-13 text-muted");
    }
  };

  const [companyLetterFile, setcompanyLetterFile] = useState(null);
  const companyLetterFileChange = (file) => {
    if (file.length != 0) {
      setcompanyLetterFile(file);
    }
  };

  const [experienceFile, setexperienceFile] = useState(null);
  const experienceFileChange = (file) => {
    if (file.length != 0) {
      setexperienceFile(file);
    }
  };
  const [resumeFile, setresumeFile] = useState(null);
  const resumeFilechange = (file) => {
    if (file.length != 0) {
      setresumeFile(file);
    }
  };

  const [payslipOneFile, setpayslipOneFile] = useState(null);
  const payslipOneFileChange = (file) => {
    if (file.length != 0) {
      setpayslipOneFile(file);
    }
  };

  const [payslipTwoFile, setpayslipTwoFile] = useState(null);
  const payslipTwoFileChange = (file) => {
    if (file.length != 0) {
      setpayslipTwoFile(file);
    }
  };

  const [payslipThreeFile, setpayslipThreeFile] = useState(null);
  const payslipThreeFileChange = (file) => {
    if (file.length != 0) {
      setpayslipThreeFile(file);
    }
  };

  //pdf view file variable
  const [pdfViewFile, setPdfViewFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfPreviousBtnVisible, setPdfPreviousBtnVisible] = useState(false);
  const [pdfNextBtnVisible, setPdfNextBtnVisible] = useState(false);

  //image view file variable
  const [imgViewFile, setImgViewFile] = useState(null);
  //video view file variable
  const [videoViewFile, setVideoViewFile] = useState(null);

  const openVIDEOModel = (name) => {
    if (name == "video") {
      setFileClearName("video");
      setVideoViewFile(URL.createObjectURL(storevideoFile[0]));
    }
    setVideoViewer(true);
  };

  const openImageModel = (name) => {
    if (name == "pan") {
      setFileClearName("panImage");
      setImgViewFile(URL.createObjectURL(panFile[0]));
    }
    if (name == "faadhar") {
      setFileClearName("aadharFrontFile");
      setImgViewFile(URL.createObjectURL(aadharFrontFile[0]));
    }
    if (name == "baadhar") {
      setFileClearName("aadharBackFile");
      setImgViewFile(URL.createObjectURL(aadharBackFile[0]));
    }

    setShowViewer(true);
  };

  var val = Math.floor(1000 + Math.random() * 9000);
  //console.log(val);

  const timestamp = Date.now();

  const [checked, setChecked] = useState(true);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  //buttonloader
  // const [btnLoader, setbtnLoader] = useState(false);

  // const formSubmitConfirmation = (event) => {
  //   event.preventDefault();

  //   AlertConfirm({
  //     title: "Confirm to submit?",
  //     desc: "Are you sure to do this...!",
  //     onOk: () => {
  //       registration();
  //     },
  //     onCancel: () => {
  //       console.log("cancel");
  //     },
  //   });
  // };
  const history = useHistory();
  // const registration = async () => {
  //   const panFileCheck = panFile ? true : false;
  //   const aadharOneFileCheck = aadharFrontFile ? true : false;
  //   const aadharTwoFileCheck = aadharBackFile ? true : false;
  //   // console.log(panFile[0] + "Pan");
  //   if (!panFileCheck || !aadharOneFileCheck || !aadharTwoFileCheck) {
  //     fileValidtion(panFileCheck, aadharOneFileCheck, aadharTwoFileCheck);
  //     console.log(fileValidtion);
  //     return;
  //   }

  //   dispatch(
  //     apiAction(apiConstant.setApiStart, {
  //       apiName: "register-employee",
  //       // loader: true,
  //       notificationMessage: true,
  //     })
  //   );
  //   // setbtnLoader(true);

  //   let formData = new FormData();
  //   formData.append("empName", Name);
  //   formData.append("DOB", dateofBirth);
  //   formData.append("contactNo", contactNo);
  //   formData.append("parentContactNo", parentsContactNo);
  //   formData.append("panCardNo", pan);
  //   formData.append("aadharNo", aadhar);
  //   formData.append("experience", previousExperience);
  //   formData.append("mail", personalEmail);
  //   formData.append("address", address);
  //   formData.append("state", state);
  //   formData.append("pincode", pincode);
  //   formData.append("accountNo", accountNumber);
  //   formData.append("ifscNo", ifscCode);
  //   formData.append("branchName", branchName);
  //   formData.append("func", func);
  //   formData.append("lasteduc", latestEdu);
  //   formData.append("passedout", passedOut);
  //   formData.append("panFile", panFile ? panFile : "");
  //   formData.append("aadharFrontFile", aadharFrontFile ? aadharFrontFile : "");
  //   formData.append("aadharBackFile", aadharBackFile ? aadharBackFile : "");
  //   formData.append(
  //     "companyLetterFile",
  //     companyLetterFile ? companyLetterFile : ""
  //   );
  //   formData.append("experienceFile", experienceFile ? experienceFile : "");
  //   formData.append("resumeFile", resumeFile ? resumeFile[0] : "");
  //   formData.append("certificateFile", CertificateFile ? CertificateFile : "");
  //   formData.append("payslipOneFile", payslipOneFile ? payslipOneFile[0] : "");
  //   formData.append("payslipTwoFile", payslipTwoFile ? payslipTwoFile[0] : "");
  //   formData.append(
  //     "payslipThreeFile",
  //     payslipThreeFile ? payslipThreeFile[0] : ""
  //   );
  //   formData.append("expectedJoinDate", expectedJoinDate);
  //   formData.append("storevideoFile", storevideoFile ? storevideoFile[0] : "");

  //   //console.log('form',formData);

  //   try {
  //     const response = await apiPost("register-employee", formData);
  //     console.log("response", response);
  //     if (!response.data.error) {
  //       dispatch(
  //         apiAction(apiConstant.setApiSuccess, {
  //           loader: false,
  //           errorCode: 0,
  //           errorMessae: "",
  //           notificationMessage: false,
  //         })
  //       );
  //       /* dispatch(toastAction(toastConstant.setToast,response.data.message));
  //        dispatch(toastAction(toastConstant.successToast)); */
  //       // setbtnLoader(false);
  //       // history.push("/success");
  //       console.log("response", response);
  //     } else {
  //       // setbtnLoader(false);
  //       errorMessage(response.data.errorMessage);
  //     }
  //   } catch (error) {
  //     // setbtnLoader(false);
  //     console.log(error);
  //     errorMessage("Internal Server Error");
  //   }
  // };

  const registration = async (e) => {
    e.preventDefault();
    const panFileCheck = Boolean(panFile);
    const aadharOneFileCheck = Boolean(aadharFrontFile);
    const aadharTwoFileCheck = Boolean(aadharBackFile);

    if (!panFileCheck || !aadharOneFileCheck || !aadharTwoFileCheck) {
      fileValidtion(panFileCheck, aadharOneFileCheck, aadharTwoFileCheck);
      // console.log(fileValidtion);
      return;
    }

    try {
      const response = await apiPost("register-employee", {
        empName: Name,
        DOB: dateofBirth,
        contactNo: contactNo,
        parentContactNo: parentsContactNo,
        panCardNo: pan,
        aadharNo: aadhar,
        experience: previousExperience,
        mail: personalEmail,
        address: address,
        state: state,
        pincode: pincode,
        accountNo: accountNumber,
        ifscNo: ifscCode,
        branchName: branchName,
        func: func,
        lasteduc: latestEdu,
        passedout: passedOut,
        panFile: panFile,
        aadharFrontFile: aadharFrontFile,
        aadharBackFile: aadharBackFile,
        companyLetterFile: companyLetterFile,
        experienceFile: experienceFile,
        resumeFile: resumeFile,
        certificateFile: CertificateFile,
        storevideoFile: storevideoFile,
        expectedJoinDate: expectedJoinDate,
      });

      if (!response.data.error) {
        NotificationManager.success("Registartion SuccessFully!");
        // Handle success without dispatching any actions
        // history.goBack();
        history.push("/corporate/admin/newly");
        console.log("response", response);
      } else {
        errorMessage(response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
      errorMessage("Internal Server Error");
    }
  };

  const errorMessage = (msg) => {
    dispatch(toastAction(toastConstant.setToast, msg));
    dispatch(toastAction(toastConstant.errorToast));
    dispatch(
      apiAction(apiConstant.setApiFailure, {
        loader: false,
        errorCode: 1,
        errorMessae: "",
        notificationMessage: false,
      })
    );
  };

  const resetForm = () => {
    setpanFile(null);
    setaadharFrontFile(null);
    setaadharBackFile(null);
    setcompanyLetterFile(null);
    setexperienceFile(null);
    setresumeFile(null);
    setpayslipOneFile(null);
    setpayslipTwoFile(null);
    setpayslipThreeFile(null);
    setName("");
    setdateofBirth("");
    setcontactNo("");
    setparentsContactNo("");
    setpan("");
    setaadhar("");
    setpreviousExperience("");
    setpersonalEmail("");
    setaddress("");
    setstate("");
    setpincode("");
    setaccountNumber("");
    setifscCode("");
    setbranchName("");
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    if (numPages == 1) {
      setPdfPreviousBtnVisible(false);
      setPdfNextBtnVisible(false);
    } else {
      setPdfPreviousBtnVisible(false);
      setPdfNextBtnVisible(true);
    }
  };
  const nextPage = () => {
    const currentPageNumber = pageNumber;
    setPageNumber(currentPageNumber + 1);
    setPdfPreviousBtnVisible(true);
    setPdfNextBtnVisible(currentPageNumber + 1 == numPages ? false : true);
  };
  const previousPage = () => {
    const currentPageNumber = pageNumber;
    setPageNumber(currentPageNumber - 1);
    setPdfNextBtnVisible(true);
    setPdfPreviousBtnVisible(currentPageNumber - 1 == 1 ? false : true);
  };

  const ClearFile = () => {
    setFileClearName();
    //console.log(panFile)
    if (fileClearName == "panImage") {
      setShowViewer(false);
      setpanFile(null);
    }
    if (fileClearName == "aadharFrontFile") {
      setShowViewer(false);
      setaadharFrontFile(null);
    }
    if (fileClearName == "aadharBackFile") {
      setShowViewer(false);
      setaadharBackFile(null);
    }
    if (fileClearName == "companyOfferLetter") {
      setShow(false);
      setcompanyLetterFile(null);
    }
    if (fileClearName == "Experience") {
      setShow(false);
      setexperienceFile(null);
    }
    if (fileClearName == "resume") {
      setShow(false);
      setresumeFile(null);
    }
    if (fileClearName == "pay1") {
      setShow(false);
      setpayslipOneFile(null);
    }
    if (fileClearName == "pay2") {
      setShow(false);
      setpayslipTwoFile(null);
    }
    if (fileClearName == "pay3") {
      setShow(false);
      setpayslipThreeFile(null);
    }
    if (fileClearName == "certificate") {
      setShow(false);
      setCertificateFile(null);
    }
    if (fileClearName == "storevideo") {
      setVideoViewer(false);
      setstorevideoFile(null);
    }
  };

  const NameValidation = (event) => {
    //accept alphabets only
    if (
      !(
        (event.charCode > 64 && event.charCode < 91) ||
        (event.charCode > 96 && event.charCode < 123) ||
        event.charCode == 32 ||
        event.charCode == 46
      )
    ) {
      event.preventDefault();
    }
  };

  const PermanentAddress = (event) => {
    if (false) {
      event.preventDefault();
    }
  };
  const AccountValidation = (event) => {
    //accept number only
    if (
      !(
        (event.charCode != 8 && event.charCode == 0) ||
        (event.charCode >= 48 && event.charCode <= 57)
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="wrapper">
      <div className="container-fluid">
        <Form onSubmit={registration}>
          <div className="row">
            <div className="col-sm-12">
              <div className="page-title-box">
                <a
                  href="#"
                  onClick={(e) => history.goBack()}
                  style={{ margin: "1%", float: "right" }}
                  className="btn btn-sm btn-primary"
                >
                  Back
                </a>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="p-20">
                        <FormGroup>
                          <label>
                            Name <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="text"
                            onKeyPress={(e) => NameValidation(e)}
                            // value={addNewUserDetails.name}
                            // onChange={(e) =>
                            //   onChangeAddNewUserDetails("name", e.target.value)
                            // }
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="form-control"
                            name="name"
                            id="name"
                            maxLength="50"
                            min="3"
                            tabIndex="1"
                            required
                          />
                        </FormGroup>
                        {/* <FormGroup>
                        <PhoneInput
                          country={"in"}
                          value={parentsContactNo}
                          name="parentsContactNo"
                          onChange={(e) => setparentsContactNo(e.target.value)}
                        />
                      </FormGroup> */}
                        <FormGroup>
                          <label>
                            Parent's/Spouse Contact no{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <PhoneInput
                            country={"in"}
                            value={parentsContactNo}
                            onChange={(phone) => setparentsContactNo(phone)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>
                            Permanent Address{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="text"
                            onKeyPress={(e) => PermanentAddress(e)}
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            className="form-control"
                            maxLength="225"
                            rows="1"
                            placeholder="Enter your address"
                            name="address"
                            id="storeName"
                            tabIndex="1"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>
                            Expected Date of Joining
                            <span className="inputImportantRed"></span>
                          </label>
                          <input
                            type="date"
                            value={expectedJoinDate}
                            onChange={(e) =>
                              setexpectedJoinDate(e.target.value)
                            }
                            // onKeyPress={(e) => AccountValidation(e)}
                            placeholder="Enter your Expected Date"
                            className="form-control"
                            name="expectedJoinDate"
                            id="expectedJoinDate"
                            tabIndex="16"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="accountNumber">
                            Account No{" "}
                            <span className="inputImportantRed">*</span>
                          </Label>
                          <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setaccountNumber(e.target.value)}
                            onKeyPress={(e) => AccountValidation(e)}
                            placeholder="Enter your savings account number"
                            className="form-control"
                            name="accountNumber"
                            id="accountNumber"
                            tabIndex="13"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="func">
                            Function<span className="inputImportantRed">*</span>
                          </Label>
                          <select
                            className="form-control"
                            name="func"
                            value={func}
                            onChange={changeHandler}
                            tabIndex="11"
                            required
                          >
                            <option value="">Select</option>
                            <option value="store">Store</option>
                            <option value="Head Office">Head Office</option>
                          </select>
                        </FormGroup>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-20">
                        <FormGroup>
                          <Label for="dateofBirth">
                            Date of birth
                            <span className="inputImportantRed">*</span>
                          </Label>
                          <input
                            type="date"
                            value={dateofBirth}
                            onChange={(e) => setdateofBirth(e.target.value)}
                            className="form-control"
                            placeholder="2017-06-04"
                            id="dateofBirth"
                            name="dateofBirth"
                            tabIndex="2"
                            required
                          />
                        </FormGroup>
                        {/* <FormGroup>
                        <Label for="mobileNumber">
                          Mobile number
                          <span className="inputImportantRed">*</span>
                        </Label>
                        <input
                          type="text"
                          // onKeyPress={(e) => mobile(e)}
                          minLength={10}
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setmobileNumber(e.target.value)}
                          placeholder="Enter your Mobile Number"
                          className="form-control"
                          name="mobileNumber"
                          id="mobileNumber"
                          tabIndex="1"
                          required
                        />
                      </FormGroup> */}
                        <FormGroup>
                          <Label for="email">
                            Pan Card no
                            <span className="inputImportantRed">*</span>
                          </Label>
                          <input
                            type="text"
                            onkeypress="return (event.charCode > 47 && event.charCode < 58)"
                            // onKeyUp={panKeyUp}
                            value={pan}
                            onChange={(e) => setpan(e.target.value)}
                            // onBlur={panOnBlur}
                            // placeholder={panCardNoPlaceHolder}
                            className="form-control"
                            name="pan"
                            minLength="10"
                            maxLength="10"
                            tabIndex="5"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="qualification">
                            Current Organisation
                          </Label>
                          <input
                            type="text"
                            value={previousExperience}
                            onChange={(e) =>
                              setpreviousExperience(e.target.value)
                            }
                            // onKeyPress={(event) => exp(event)}
                            placeholder="Enter your current organisation"
                            className="form-control"
                            name="previousExperience"
                            tabIndex="8"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>
                            State <span className="inputImportantRed">*</span>
                          </label>
                          <select
                            className="form-control"
                            name="stateUID"
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                            tabIndex="11"
                            required
                          >
                            <option value="">Select</option>
                            {stateList.map((e, key) => {
                              return (
                                <option key={key} value={e.stateUID}>
                                  {e.stateName}
                                </option>
                              );
                            })}
                          </select>
                        </FormGroup>
                        <FormGroup>
                          <label>
                            IFSC Code{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your bank IFSc code"
                            className="form-control"
                            name="ifscCode"
                            value={ifscCode}
                            onChange={(e) => setifscCode(e.target.value)}
                            // onKeyPress={(e) => ifscCode(e)}
                            tabIndex="14"
                            required
                          />
                        </FormGroup>

                        {isVisible ? (
                          <div className="dropify-wrapper">
                            <label>
                              Video Upload{" "}
                              <span className="inputImportantRed">*</span>
                            </label>
                            <FileUploader
                              multiple={true}
                              handleChange={storevideoFileChange}
                              name="file"
                              types={vidFileTypes}
                              maxSize={2}
                              required
                            />
                            <div className="row">
                              {storevideoFile ? (
                                <div className="col">
                                  <i
                                    className="fas fa-eye fileUploaEyeicon"
                                    aria-hidden="true"
                                    onClick={() => openVIDEOModel("video")}
                                  ></i>
                                </div>
                              ) : null}

                              <div className="col-10">
                                <span className={storevideoFileClass}>
                                  {storevideoFile
                                    ? `File name: ${storevideoFile[0].name}`
                                    : "no files uploaded yet"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-20">
                        <FormGroup>
                          <label>
                            Contact no{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <PhoneInput
                            country={"in"}
                            value={contactNo}
                            onChange={(phone) => setcontactNo(phone)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>
                            AADHAR No{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder={aadharNoPlaceHolder}
                            className="form-control"
                            name="aadhar"
                            onBlur={aadharOnBlur}
                            onKeyUp={aadharKeyUp}
                            onKeyPress={(event) => aadharNo(event)}
                            value={aadhar}
                            onChange={(e) => setaadhar(e.target.value)}
                            minLength="12"
                            maxLength="12"
                            tabIndex="6"
                            required
                          />
                          <div
                            className="inputImportantRed"
                            id="emailprint-error-msg-red"
                            style={{ display: aadharVisible }}
                          >
                            {aadharMssage}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label>
                            Personal Email{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder={mailPlaceHolder}
                            className="form-control"
                            name="personalEmail"
                            onBlur={mailOnBlur}
                            onKeyUp={mailKeyUp}
                            value={personalEmail}
                            onChange={(e) => setpersonalEmail(e.target.value)}
                            tabIndex="9"
                            required
                          />
                          <div
                            className="green"
                            id="emailprint-error-success"
                            style={{ display: "none" }}
                          >
                            Email Id available{" "}
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <label>
                            Pincode <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="text"
                            onKeyPress={(e) => Pincode(e)}
                            placeholder="Enter your pincode"
                            className="form-control"
                            name="pincode"
                            value={pincode}
                            onChange={(e) => setpincode(e.target.value)}
                            minLength="6"
                            maxLength="6"
                            tabIndex="12"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>
                            Branch Name{" "}
                            <span className="inputImportantRed">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your branch name"
                            className="form-control"
                            name="branchName"
                            value={branchName}
                            onKeyPress={(e) => BranchName(e)}
                            onChange={(e) => setbranchName(e.target.value)}
                            tabIndex="15"
                            required
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="mt-0 header-title">
                            Education Proof{" "}
                            <span className="inputImportantRed">
                              (Every File Max:2mb)
                            </span>{" "}
                          </h4>
                          <div className="row">
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Latest Education
                                    <span className="inputImportantRed">*</span>
                                  </h4>
                                  <div className="form-group">
                                    {/*   <label>Name <span className="inputImportantRed">*</span></label> */}
                                    <input
                                      type="text"
                                      value={latestEdu}
                                      onChange={(e) =>
                                        setlatestEdu(e.target.value)
                                      }
                                      placeholder="Enter your latest education"
                                      className="form-control"
                                      name="latestEdu"
                                      id="latestEdu"
                                      maxLength="50"
                                      min="3"
                                      tabIndex="1"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Passed out Year
                                    <span className="inputImportantRed">*</span>
                                  </h4>
                                  <div className="form-group">
                                    {/*  <label>Name <span className="inputImportantRed">*</span></label> */}
                                    <input
                                      type="text"
                                      value={passedOut}
                                      onChange={(e) =>
                                        setpassedOut(e.target.value)
                                      }
                                      placeholder="Enter your passed out year"
                                      className="form-control"
                                      name="passedOut"
                                      id="passedOut"
                                      tabIndex="1"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Certificate Upload
                                    <span className="inputImportantRed">*</span>
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={CertificateFileChange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                      required
                                    />
                                  </div>
                                  <div className="row">
                                    {CertificateFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() =>
                                            openPDFModel("certificate")
                                          }
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() =>
                                            openPDFModel("certificate")
                                          }
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-11">
                                      <span className="font-13 text-muted">
                                        {CertificateFile
                                          ? `File name: ${CertificateFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h4 className="mt-0 header-title">
                            File Uploads{" "}
                            <span className="inputImportantRed">
                              (Every File Max:2mb)
                            </span>{" "}
                          </h4>
                          <div className="row">
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Pan Upload{" "}
                                    <span className="inputImportantRed">*</span>
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={panFileChange}
                                      name="file"
                                      types={imgFileTypes}
                                      maxSize={2}
                                      required
                                    />
                                  </div>
                                  <div className="row">
                                    {panFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() => openImageModel("pan")}
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() => openImageModel("pan")}
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-10">
                                      <span className={panFileClass}>
                                        {panFile
                                          ? `File name: ${panFile[0].name}_${val}_${timestamp}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    AADHAR Front Upload{" "}
                                    <span className="inputImportantRed">*</span>
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={aadharFrontFileChange}
                                      name="file"
                                      types={imgFileTypes}
                                      maxSize={2}
                                      required
                                    />
                                  </div>

                                  <div className="row">
                                    {aadharFrontFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() =>
                                            openImageModel("faadhar")
                                          }
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() =>
                                            openImageModel("faadhar")
                                          }
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-10">
                                      <span className={aadharOneClass}>
                                        {aadharFrontFile
                                          ? `File name: ${aadharFrontFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    AADHAR back Upload{" "}
                                    <span className="inputImportantRed">*</span>
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={aadharBackFileChange}
                                      name="file"
                                      types={imgFileTypes}
                                      maxSize={2}
                                      required
                                    />
                                  </div>
                                  <div className="row">
                                    {aadharBackFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() =>
                                            openImageModel("baadhar")
                                          }
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() =>
                                            openImageModel("baadhar")
                                          }
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-10">
                                      <span className={aadharTwoClass}>
                                        {aadharBackFile
                                          ? `File name: ${aadharBackFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-12">
                              <h4 className="mt-0 header-title">
                                Current Organisation
                                <span className="inputImportantRed">
                                  (Every File Max:2mb)
                                </span>
                              </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Current Organisation (Attach last company
                                    Offer)
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={companyLetterFileChange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                    />
                                  </div>

                                  <div className="row">
                                    {companyLetterFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() =>
                                            openPDFModel("companyOfferLetter")
                                          }
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() =>
                                            openPDFModel("companyOfferLetter")
                                          }
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-11">
                                      <span className="font-13 text-muted">
                                        {companyLetterFile
                                          ? `File name: ${companyLetterFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Current Organisation (Attach last company
                                    Experience)
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={experienceFileChange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                    />
                                  </div>

                                  <div className="row">
                                    {experienceFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() =>
                                            openPDFModel("Experience")
                                          }
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() =>
                                            openPDFModel("Experience")
                                          }
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-11">
                                      <span className="font-13 text-muted">
                                        {experienceFile
                                          ? `File name: ${experienceFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Upload Resume (Attach the Latest File
                                    pdf/doc)
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={resumeFilechange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                    />
                                  </div>
                                  <div className="row">
                                    {resumeFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() => openPDFModel("resume")}
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() => openPDFModel("resume")}
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-11">
                                      <span className="font-13 text-muted">
                                        {resumeFile
                                          ? `File name: ${resumeFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-12">
                              <h4 className="mt-0 header-title">
                                Last 3 months Payslips{" "}
                                <span className="inputImportantRed">
                                  (Every File Max:2mb)
                                </span>
                              </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Payslip 1
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={payslipOneFileChange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                    />
                                  </div>
                                  <div className="row">
                                    {payslipOneFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() => openPDFModel("pay1")}
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() => openPDFModel("pay1")}
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-10">
                                      <span className="font-13 text-muted">
                                        {payslipOneFile
                                          ? `File name: ${payslipOneFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Payslip 2
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={payslipTwoFileChange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                    />
                                  </div>
                                  <div className="row">
                                    {payslipTwoFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() => openPDFModel("pay2")}
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() => openPDFModel("pay2")}
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-10">
                                      <span className="font-13 text-muted">
                                        {payslipTwoFile
                                          ? `File name: ${payslipTwoFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <div className="card">
                                <div className="card-body">
                                  <h4 className="mt-0 header-title">
                                    Payslip 3
                                  </h4>
                                  <div className="dropify-wrapper">
                                    <FileUploader
                                      multiple={true}
                                      handleChange={payslipThreeFileChange}
                                      name="file"
                                      types={docFileTypes}
                                      maxSize={2}
                                    />
                                  </div>
                                  <div className="row">
                                    {payslipThreeFile ? (
                                      <div className="col">
                                        {/* <i
                                          className="fas fa-eye fileUploaEyeicon"
                                          aria-hidden="true"
                                          onClick={() => openPDFModel("pay3")}
                                        ></i> */}
                                        <FontAwesomeIcon
                                          icon={faEye}
                                          className="fileUploadEyeIcon"
                                          onClick={() => openPDFModel("pay3")}
                                        />
                                      </div>
                                    ) : null}

                                    <div className="col-10">
                                      <span className="font-13 text-muted">
                                        {payslipThreeFile
                                          ? `File name: ${payslipThreeFile[0].name}`
                                          : "no files uploaded yet"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="col-xl-6 text-left"
                              style={{ marginTop: "15px" }}
                            >
                              {/* <input
                                name="checked"
                                type="checkbox"
                                checked={checked}
                                onChange={handleChange}
                                tabIndex="11"
                                required
                              />
                              &nbsp;&nbsp; */}
                              <label>
                                <h6>
                                  <input
                                    name="checked"
                                    type="checkbox"
                                    checked={checked}
                                    onChange={handleChange}
                                    tabIndex="11"
                                    required
                                  />
                                  &nbsp; Offer Acceptance
                                  <span className="inputImportantRed">*</span>
                                </h6>
                              </label>
                            </div>

                            <div
                              className="col-xl-6 text-right"
                              style={{ marginTop: "15px" }}
                            >
                              <div className="form-group mb-0">
                                <div>
                                  {/* {btnLoader ? ( */}
                                  {/* <button
                                    type="submit"
                                    className="btn btn-primary waves-effect waves-light"
                                    disabled="disabled"
                                  >
                                    <i
                                      className="fa fa-refresh fa-spin"
                                      style={{ marginRight: "5px" }}
                                    />{" "}
                                    Submit
                                  </button> */}
                                  {/* ) : ( */}
                                  <button
                                    type="submit"
                                    className="btn btn-primary waves-effect waves-light"
                                    // onClick={() => {
                                    //   registration();
                                    // }}
                                  >
                                    Submit
                                  </button>
                                  {/* )} */}
                                  &nbsp; &nbsp;
                                  <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn btn-secondary waves-effect m-l-5"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <Modal
          size="xl"
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="xample-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <center> PDF Viewer</center>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Document
              file={pdfViewFile}
              onLoadSuccess={(e) => onDocumentLoadSuccess(e)}
              noData={<h4>Please select a file</h4>}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Modal.Body>
          <Modal.Footer>
            {pdfViewFile ? (
              <p>
                Page {pageNumber} of {numPages}
              </p>
            ) : null}
            <button
              style={{ display: pdfPreviousBtnVisible ? "block" : "none" }}
              onClick={() => previousPage()}
              type="button"
              className="btn btn-warning waves-effect waves-light"
            >
              Previous
            </button>
            <button
              style={{ display: pdfNextBtnVisible ? "block" : "none" }}
              onClick={() => nextPage()}
              type="button"
              className="btn btn-success waves-effect waves-light"
            >
              Next
            </button>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="btn btn-primary waves-effect waves-light"
            >
              Close
            </button>
            <button
              onClick={ClearFile}
              type="button"
              className="btn btn-danger waves-effect waves-light"
            >
              Remove
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="xl"
          show={showViewer}
          onHide={() => setShowViewer(false)}
          aria-labelledby="xample-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <center> Image Viewer</center>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              style={{ maxWidth: "100%", minWidth: "100%" }}
              src={imgViewFile}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setShowViewer(false)}
              type="button"
              className="btn btn-primary waves-effect waves-light"
            >
              Close
            </button>
            <button
              onClick={ClearFile}
              defaultValue="Reset"
              type="button"
              className="btn btn-danger waves-effect waves-light"
            >
              Remove
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="xl"
          show={videoViewer}
          onHide={() => setVideoViewer(false)}
          aria-labelledby="xample-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              <center> Video Viewer</center>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <video
              style={{ maxWidth: "100%", minWidth: "100%", height: "65vh" }}
              type="video/mp4"
              src={videoViewFile}
              controls
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setVideoViewer(false)}
              type="button"
              className="btn btn-primary waves-effect waves-light"
            >
              Close
            </button>
            <button
              onClick={ClearFile}
              type="reset"
              className="btn btn-danger waves-effect waves-light"
            >
              Remove
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Newregistration;
