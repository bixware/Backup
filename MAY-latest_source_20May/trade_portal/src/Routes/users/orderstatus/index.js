/**
 * News Dashboard
 */
import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import baseURL from '../../../baseurl';
import { format, parse } from 'date-fns';
import Button from "@material-ui/core/Button";
//import { Grid } from 'smart-webcomponents-react/grid';
import { Table } from 'smart-webcomponents-react/table';
import { MultiComboInput } from 'smart-webcomponents-react/multicomboinput';
import { Bars } from "react-loader-spinner";
import 'smart-webcomponents-react/source/styles/smart.default.css';
import "../../../style.css";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import moment from 'moment';
//import { Button } from 'smart-webcomponents-react/button';

export default function OrderStatus() {
  const [CustomerList, setCustomerList] = useState([]);
  const [fromDate, setFromDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [toDate, setToDate] = React.useState(format(new Date(), "yyyy-MM-dd"));
  const [custCode, setCustCode] = useState('');
  const [reqType, setReqType] = useState('');
  const [reqTypeValues, setReqTypeValues] = useState([]);
  const [allType, setAllReqType] = useState('');
  const [proctype, setProcType] = useState('SIZE_WISE');
  const [productValues, setProductValues] = useState([]);
  const [brandValues, setBrandValues] = useState([]);
  const [brandCode, setBrandCode] = useState([]);
  const [productCode, setProductCode] = useState('');
  const [gridData, setGridData] = useState([]);
  const [isgetRowData, setIsgetRowData] = useState(false);
  const [reportsFormat, setreportsFormat] = useState('HTML');
  const [reportsType, setReportsType] = useState('');
  const [csvReportsType, setCsvReportsType] = useState('');
  const gridRef = useRef();
  const multicomboinput = React.createRef();
  const multicomboinputBrand = React.createRef();
  const multicomboinputProduct = React.createRef();
  const [isOpeningOrderStatus, setIsOpeningOrderStatus] = useState(true);
  const [isOpeningBrandProduct, setIsOpeningBrandProduct] = useState(true);
  const [isOpeningStyleSize, setIsOpeningStyleSize] = useState(true);
  const [columnDynamicState, setColumnDynamicState] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [dynamicDataSourceSettings, setDynamicDataSourceSettings] = useState([]);
  const [noRecordFound, setNorecordFound] = useState({ display: "none", marginTop: "5rem" });
  const [validationMessage, setValidationMessage] = useState("");
  const [downloadType, setDownloadType] = useState('');
  const [downloadFlag, setDownloadFlag] = useState(false);  
  
  const [agentName, setAgentName] = useState('');
  const keyboardNavigation = true;
  const paging = true;
  const grouping = true;
  const table = React.createRef();
  const csvRef = React.createRef();
  const reqAllTypeValues = [
    {
      label: "All",
      value: 0
    },
  ]

  const reqReportTypeValues = [
    {
      label: "SIZE_WISE",
      value: 0
    },
    {
      label: "STYLE_WISE",
      value: 1
    },
    {
      label: "CUSTOMER_BRAND_PRODUCT_SUMMARY",
      value: 2
    },
    {
      label: "BRAND_PRODUCT_SUMMARY",
      value: 3
    }
  ]

  const getCustomerList = async () => {
    try {
      const returnapi = await axios.post(`${baseURL}/api/getcustomerlist`, { userUID: localStorage.getItem('userUID') });

      if (!returnapi.data.error) {
        let array = []
        let obj = {}
        for (var name_id of returnapi.data.data) {
          // Object.assign(obj, { value: name_id.CustCode, label: name_id.CustName });
          Object.assign(obj, { value: name_id.CustCode, label: name_id.CustCode + ' ' + name_id.CustName });
          array.push({ ...obj })
        }
        setCustomerList(array);
      }
    }
    catch (error) {
      // console.log(error);
    }
  }

  const getBrandList = async () => {
    const returnapi = await axios.post(`${baseURL}/api/getstylecodelist`, {});
    if (!returnapi.data.error) {
      // console.log(returnapi.data.data)
      let array1 = []
      let obj1 = {}
      for (var name_id of returnapi.data.data) {
        Object.assign(obj1, { value: name_id.Code, label: name_id.Description });
        array1.push({ ...obj1 })
      }
      setBrandValues(array1);
    }
  };

  const getCSVFile = async () => {
    let data1 = {};
    if(reportsType == 'SIZE_WISE') {
      setCsvReportsType('SIZE_WISE_CSV');
    }else if (reportsType == 'STYLE_WISE') {
      setCsvReportsType('STYLE_WISE_CSV');
    }else if (reportsType == 'CUSTOMER_BRAND_PRODUCT_SUMMARY') {
      setCsvReportsType('CUSTOMER_BRAND_PRODUCT_SUMMARY_CSV');
    }else if (reportsType == 'BRAND_PRODUCT_SUMMARY') {
      setCsvReportsType('BRAND_PRODUCT_SUMMARY_CSV');
    }
    if (isOpeningOrderStatus === true && isOpeningStyleSize === false && isOpeningBrandProduct === true) {
      data1 = {
        customer: customerCode(),
        from: fromDate,
        to: toDate,
        all: allType,
        reportFormat: reportsFormat,
        brand: brandCode,
        product: multicomboinputProduct.current.selectedValues,
        ordertype: reqType,
        REPORT_TYPE: csvReportsType
      }
    }
    else if(isOpeningBrandProduct === true && isOpeningOrderStatus === true) {
      data1 = {
        customer: customerCode(),
        from: fromDate,
        to: toDate,
        all: allType,
        brand: brandCode,
        product: multicomboinputProduct.current.selectedValues,
        reportFormat: reportsFormat,
        ordertype: reqType,
        REPORT_TYPE: csvReportsType
      }
    }
    else {
      data1 = {
        customer: customerCode(),
        from: fromDate,
        to: toDate,
        all: allType,
        brand: null,
        product: null,
        reportFormat: reportsFormat,
        ordertype: reqType,
        REPORT_TYPE: csvReportsType
      }
    }
    const returnapi = await axios.post(`${baseURL}/api/getorderstatus`, data1);
    if (returnapi?.data.data) {
      console.log(returnapi?.data.data);
      const file = new File([returnapi.data], 'test', {
        type: 'application/pdf'
      });
      function download() {
          if (file.size == 0) {
            alert("Sorry, file not present to download !")
          } else {
          const link = document.createElement('a')
          const url = window.URL.createObjectURL(file)
          link.href = url
          link.download = file.name
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }
      }
      download();
    }
  };

  const getReqTypeList = async () => {
    try {
      const returnapi = await axios.get(`${baseURL}/api/getordertypeList `, {});

      if (!returnapi.data.error) {
        setReqTypeValues(returnapi.data.data);
        /*  returnapi.data.data.forEach((value) => {
           customerValue.push({ "label": value.CustName, "value": value.CustCode });
       });
       setCustomerList([...customerValue]); */
      }

    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCustomerList();
    getBrandList();
    getReqTypeList();
  }, []);

  useEffect(() => {
    if (downloadFlag) {
      csvRef.current.link.click();
      setDownloadFlag(false);
    }
  }, [downloadFlag]);

  const getPDF = () => {
    const doc = new jsPDF();
    const arr = table.current.props.dataSource;
    const result = Array.isArray(arr) ? arr.reduce((acc, curr) => acc + curr, 0) : 0;
    console.log(result);
    //const data = table.current.props.dataSource;
    //console.log(table.current.props.dataSource);
    doc.table(0,0, result, {
      callback: function (doc) {
        doc.save();
      }
    });
  }
  
  useEffect(() => {
    init();
  }, [table])
  
  const init = () => {
    if (table.current) {
      const tableValue = table.current;
      if (reportsType == "SIZE_WISE") {
        tableValue.addGroup('OrdCustCode');
        tableValue.addGroup('OrdRef');   
        tableValue.addGroup('OrdSizeCode');   
      } else if (reportsType == "STYLE_WISE") {
        tableValue.addGroup('OrdCustCode');
        tableValue.addGroup('OrdRef');
      } else if (reportsType == "CUSTOMER_BRAND_PRODUCT_SUMMARY") {
        tableValue.addGroup('CustName');
        tableValue.addGroup('Brand');        
      } else if (reportsType == "BRAND_PRODUCT_SUMMARY") {
        //tableValue.addGroup('CustName');
        tableValue.addGroup('Brand');       
      }
    }
  }

  const customerCode = () => {
    if (localStorage.getItem('roleUID') !== '1') {
      return multicomboinput.current.selectedValues
    } else if (CustomerList.length > 0) {
      return [CustomerList[0].value]
    } else {
      return null
    }
  }

  const getData = async () => {
    if(downloadType == 'CSV') {
      Promise.all([
        Promise.resolve(handleCsvBtnClick()),
        Promise.resolve(getDetails())
      ])
    } else {
      Promise.all([
        Promise.resolve(getDetails())
      ])
    }
  }

  const getDetails = () => {
    setIsgetRowData(true);
    async function fetchData() {
      try {
        let data1 = {}
        if (isOpeningOrderStatus === true && isOpeningStyleSize === false && isOpeningBrandProduct === true) {
          data1 = {
            customer: customerCode(),
            from: fromDate,
            to: toDate,
            all: allType,
            reportFormat: reportsFormat,
            brand: brandCode,
            product: multicomboinputProduct.current.selectedValues,
            ordertype: reqType,
            REPORT_TYPE: reportsType,
            userUID: localStorage.getItem("userUID")
          }
        }
        else if(isOpeningBrandProduct === true && isOpeningOrderStatus === true) {
          data1 = {
            customer: customerCode(),
            from: fromDate,
            to: toDate,
            all: allType,
            brand: brandCode,
            product: multicomboinputProduct.current.selectedValues,
            reportFormat: reportsFormat,
            ordertype: reqType,
            REPORT_TYPE: reportsType,
            userUID: localStorage.getItem("userUID")
          }
        }
        else {
          data1 = {
            customer: customerCode(),
            from: fromDate,
            to: toDate,
            all: allType,
            brand: null,
            product: null,
            reportFormat: reportsFormat,
            ordertype: reqType,
            REPORT_TYPE: reportsType,
            userUID: localStorage.getItem("userUID")
          }
        }
        const returnapi = await axios.post(`${baseURL}/api/getorderstatus`, data1);
        
        if (returnapi?.data.data.result) {
          setGridData(returnapi?.data.data.result);          
          setIsgetRowData(false); 
          setAgentName(returnapi.data.data.agentname);
          console.log(returnapi.data.data.agentname);
          if (returnapi?.data.data.result.length == 0) {
            setNorecordFound({ display: "block", marginTop: "5rem" })
            setValidationMessage("No record found")
            
          }
        } else {
          setNorecordFound({ display: "block", marginTop: "5rem" })
          setValidationMessage("Something went wrong")
          setGridData([])
          setIsgetRowData(false);
        }
      } catch (error) {
        setValidationMessage("Something went wrong")
        setIsgetRowData(false);
      }
    }
    fetchData();
  }

  async function handleBrandChange(e) {
    const array = e.detail.value.split(',');
    // console.log(array)
    setBrandCode(array)
    try {
      let data = { "ProdCode": array };
      const returnapi = await axios.post(`${baseURL}/api/getproductList`, data);
      if (!returnapi.data.error) {
        let array3 = []
        let obj3 = {}
        for (var name_id of returnapi.data.data) {
          Object.assign(obj3, { value: name_id.ProdCode, label: name_id.Product });
          array3.push({ ...obj3 })
        }
        setProductValues(array3);

      }
    } catch (error) {

    }
  }

  const behavior = {
    columnResizeMode: 'growAndShrink'
  }
  const sorting = {
    enabled: true
  }

  const columnsDynamic = (reportType) => {
    if (reportType == "SIZE_WISE") {
      setColumnDynamicState([
        { label: 'Order Customer Code', dataField: 'OrdCustCode', width: '20%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Order Customer Name', dataField: 'CustName', width: '20%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Order Ref', dataField: 'OrdRef', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'SAP Order No', dataField: 'SAPOrdno', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Order Date', dataField: 'OrdDate', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Exp Del Date', dataField: 'ExpDelDt', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Style Code', dataField: 'OrdStyleCode', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Size', dataField: 'OrdSizeCode', width: '15%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Order Qty', dataField: 'OrdQty', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Awt Conf', dataField: 'AwtConf', width: '7%' , formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Awt Stock', dataField: 'AwtStock', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Awt Desp', dataField: 'AwtDesp', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        }},
        { label: 'supp qty', dataField: 'suppqty', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'can qty', dataField: 'canqty', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'drop qty', dataField: 'dropqty', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        }},
        { label: 'PPO hold', dataField: 'PPOhold', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } },
        { label: 'Reason', dataField: 'Reason', width: '7%', formatFunction: (settings) => {
          if(settings.data.total != ''){
            settings.template = null;
          } else {
            settings.template = settings.value;
          }          
        } }
      ])
      setHeaders([
        { label: 'Cust Code', key: 'OrdCustCode' },
        { label: 'CustomerName', key: 'CustName' },
        { label: 'Order Ref', key: 'OrdRef' },
        { label: 'Order Date', key: 'OrdDate' },
        { label: 'Brand', key: 'Brand' },
        { label: 'Product', key: 'Product' },
        { label: 'StyleCode', key: 'OrdStyleCode' },
        { label: 'HFInd', key: 'OrdHfInd' },
        { label: 'Order Qty', key: 'OrdQty' },
        { label: 'AwtConf', key: 'AwtConf'},
        { label: 'AwtStkQty', key: 'AwtStock'},
        { label: 'AwtDespQty', key: 'AwtDesp'},
        { label: 'AwtDespOnHold', key: 'awtdesphld'},       
        { label: 'SuppQty', key: 'suppqty'},
        { label: 'OverBkQty', key: 'suppqty'},   
        { label: 'DropQty', key: 'dropqty'},
        { label: 'CancelQty', key: 'canqty'},
        { label: 'OnHoldQty', key: 'Hold'},        
        { label: 'PPOHold', key: 'PPOhold'},
        { label: 'OrdErrStatus', key: 'OrdErrStatus'},   
        { label: 'ExpDelDate', key: 'ExpDelDt' },
        { label: 'OrdSize', key: 'OrdSizeCode' },
        { label: 'SAPOrdno', key: 'SAPOrdno' },
        { label: 'SapStatus', key: 'SapStatus' },
        { label: 'OrderType', key: 'OrderType' }
      ])
    } else if (reportType == "STYLE_WISE") {
      setColumnDynamicState(
        [
          { label: 'Cust Code', dataField: 'OrdCustCode', width: '20%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },          
          { label: 'Order Ref', dataField: 'OrdRef', width: '15%' , formatFunction: (settings) => {
            if(settings.data.total != '') {
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'SAP Ordno', dataField: 'SAPOrdno', width: '15%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Order Date', dataField: 'OrdDate', width: '12%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Exp Del Date', dataField: 'ExpDelDt', width: '12%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Ord Style Code', dataField: 'OrdStyleCode', width: '15%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Sleeve', dataField: 'OrdHfInd', width: '9%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Ord Qty', dataField: 'OrdQty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'Awt Conf', dataField: 'AwtConf', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'Awt Stock', dataField: 'AwtStock', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'Awt Desp', dataField: 'AwtDesp', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'Hold', dataField: 'Hold', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'supp qty', dataField: 'suppqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'can qty', dataField: 'canqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'drop qty', dataField: 'dropqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'PPO hold', dataField: 'PPOhold', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  },
          { label: 'Reason', dataField: 'Reason', width: '12%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }  }
        ]
      )
      setHeaders([
        { label: 'Cust Code', key: 'OrdCustCode' },
        { label: 'Order Ref', key: 'OrdRef' },
        { label: 'SAP Ordno', key: 'SAPOrdno' },
        { label: 'Order Date', key: 'OrdDate' },
        { label: 'Exp Del Date', key: 'ExpDelDt' },
        { label: 'Ord Style Code', key: 'OrdStyleCode' },
        { label: 'Sleeve', key: 'OrdHfInd' },
        { label: 'Ord Qty', key: 'OrdQty' },
        { label: 'Awt Conf', key: 'AwtConf'},
        { label: 'AwtStock', key: 'AwtStock'},
        { label: 'AwtDesp', key: 'AwtDesp'},
        { label: 'Hold', key: 'Hold'},
        { label: 'supp qty', key: 'suppqty'},
        { label: 'can qty', key: 'canqty'},
        { label: 'drop qty', key: 'dropqty'},                
        { label: 'PPO hold', key: 'PPOhold'},
        { label: 'Reason', key: 'Reason' }
      ])
    } else if (reportType == "CUSTOMER_BRAND_PRODUCT_SUMMARY") {
      setColumnDynamicState(
        [
          { label: 'Brand', dataField: 'Brand', width: '20%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }},
          { label: 'Customer Name', dataField: 'CustName', width: '20%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }},
          { label: 'Product', dataField: 'Product', width: '12%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }},
          /*{ label: 'Brand', dataField: 'Brand', width: '20%' },
          { label: 'Customer Name', dataField: 'CustName', width: '20%' },
          { label: 'Product', dataField: 'Product', width: '20%' },*/
          { label: 'Order Qty', dataField: 'OrdQty', width: '8%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Awt Conf', dataField: 'AwtConf', width: '8%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Awt Stock', dataField: 'AwtStock', width: '8%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Awt Desp', dataField: 'AwtDesp', width: '8%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Hold', dataField: 'Hold', width: '8%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Supp qty', dataField: 'suppqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Can qty', dataField: 'canqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Drop qty', dataField: 'dropqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'PPO hold', dataField: 'PPOhold', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } }
          /*{ label: 'Total', dataField: 'total', width: '7%' }*/
        ]
      )
      setHeaders([
        { label: 'Brand', key: 'Brand' },
        { label: 'Product', key: 'Product' },
        { label: 'Ord Qty', key: 'OrdQty' },        
        { label: 'Awt Conf', key: 'AwtConf'},
        { label: 'Awt Stock', key: 'AwtStock'},
        { label: 'Awt Desp', key: 'AwtDesp'},        
        { label: 'Hold', key: 'Hold'},
        { label: 'Supp qty', key: 'suppqty'},
        { label: 'Can qty', key: 'canqty'},
        { label: 'Drop qty', key: 'dropqty'},                
        { label: 'PP Hold', key: 'PPOhold'}
      ])
    } else if (reportType == "BRAND_PRODUCT_SUMMARY") {
      setColumnDynamicState(
        [
          { label: 'Brand', dataField: 'Brand', width: '20%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Product', dataField: 'Product', width: '20%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Order Qty', dataField: 'OrdQty', width: '7%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Awt Conf', dataField: 'AwtConf', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Awt Stock', dataField: 'AwtStock', width: '7%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Awt Desp', dataField: 'AwtDesp', width: '7%', formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'Hold', dataField: 'Hold', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'supp qty', dataField: 'suppqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'can qty', dataField: 'canqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'drop qty', dataField: 'dropqty', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          } },
          { label: 'PPO hold', dataField: 'PPOhold', width: '7%' , formatFunction: (settings) => {
            if(settings.data.total != ''){
              settings.template = null;
            } else {
              settings.template = settings.value;
            }          
          }},
        ]
      )
      setHeaders([
        { label: 'Brand', key: 'Brand' },
        { label: 'Product', key: 'Product' },
        { label: 'Ord Qty', key: 'OrdQty' },        
        { label: 'Awt Conf', key: 'AwtConf'},
        { label: 'Awt Stock', key: 'AwtStock'},
        { label: 'Awt Desp', key: 'AwtDesp'},        
        { label: 'Hold', key: 'Hold'},
        { label: 'Supp qty', key: 'suppqty'},
        { label: 'Can qty', key: 'canqty'},
        { label: 'Drop qty', key: 'dropqty'},                
        { label: 'PP Hold', key: 'PPOhold'}
      ])
    } else {
      setColumnDynamicState([])
      setDynamicDataSourceSettings([])
    }
  }

  const handleHtmlBtnClick = () => {

    if (table.current) {
      table.current.exportData('html', reportsType);
    }
    else {
      alert("Sorry, No records to download!");
    }
  };

  const handleCsvBtnClick = async () => {
    /*if (table.current) {
      table.current.exportData('xlsx', reportsType);
      setDownloadFlag(true);
    } else {
      alert("Sorry, No records to download!");
    }*/
    try {
      let data1 = {}
      if (isOpeningOrderStatus === true && isOpeningStyleSize === false && isOpeningBrandProduct === true) {
        data1 = {
          customer: customerCode(),
          from: fromDate,
          to: toDate,
          all: allType,
          reportFormat: reportsFormat,
          brand: brandCode,
          product: multicomboinputProduct.current.selectedValues,
          ordertype: reqType,
          REPORT_TYPE: reportsType,
          userUID: localStorage.getItem("userUID"),
        }
      }
      else if(isOpeningBrandProduct === true && isOpeningOrderStatus === true) {
        data1 = {
          customer: customerCode(),
          from: fromDate,
          to: toDate,
          all: allType,
          brand: brandCode,
          product: multicomboinputProduct.current.selectedValues,
          reportFormat: reportsFormat,
          ordertype: reqType,
          REPORT_TYPE: reportsType,
          userUID: localStorage.getItem("userUID")
        }
      }
      else {
        data1 = {
          customer: customerCode(),
          from: fromDate,
          to: toDate,
          all: allType,
          brand: null,
          product: null,
          reportFormat: reportsFormat,
          ordertype: reqType,
          REPORT_TYPE: reportsType,
          userUID: localStorage.getItem("userUID")
        }
      }
      const returnapi = await axios.post(`${baseURL}/api/getorderstatuscsv`, data1);
      if (returnapi?.data.message == 'Successfully downloaded')
      {
          const link = document.createElement('a');
          link.href = 'https://mgorder1.abfrl.com/TradePortal/API/' + returnapi?.data.download;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handlePdfBtnClick = () => {

    if (table.current) {
      table.current.exportData('pdf', reportsType);
      //getPDF();
    } else {
      alert("Sorry, No records to download!");
    }
  };

  const downloadTypes = [
    /*{
      label: "HTML",
      value: 0,
    },*/
    {
      label: "CSV",
      value: 1
    }
    /*{
      label: "PDF",
      value: 2,
    }*/
  ];

  return (
    // <div className="user-management">
    <>
      <div className="top-filter clearfix p-6">
        <div style={{ justifyContent: "start", display: "flex", marginTop: "-20px", }}>
          <h3 style={{
            padding: "5px 5px 0px 5px",
            borderRadius: "5px"
          }}>Order Status</h3>
        </div>
        <div style={{ justifyContent: "end", display: "flex", marginTop: "-30px", height: "25px" }}>
          <FormGroup className="frmgrp" style={{ width:"140px" }}>
            <div className="app-selectbox-sm">
              <Input type="select" name="select" id="Select-2"
                onChange={(e) => {
                  setDownloadFlag(false);
                  if (e.target.value === "HTML") {
                    handleHtmlBtnClick();
                    setDownloadType(e.target.value);
                  }
                  else if (e.target.value === "CSV") {
                    //handleCsvBtnClick();
                    setDownloadType(e.target.value);
                    //getCSVFile();
                  }
                  else if (e.target.value === "PDF") {
                    handlePdfBtnClick();
                    setDownloadType(e.target.value);
                  } else {
                    setDownloadType('');
                  }

                }}
              >
                <option value={0}>Select Download</option>
                {downloadTypes.map((option) => (
                  // <MenuItem key={option.CustCode} value={option.CustCode}>
                  //   {option.CustName}
                  // </MenuItem>
                  <option key={option.value} value={option.label}>{option.label}</option>

                ))}
              </Input>
            </div>
          </FormGroup>
        </div>

      </div>

      <div className="top-filter clearfix p-5">
        <FormGroup className="w-20 mb-5">
          <Label for="startDate">From Date</Label>
          <Input type="date" name="fromDate" id="fromDate"
            value={fromDate}
            onChange={(e) => {
              // console.log((e.target.value));
              setFromDate((e.target.value));
            }} />
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="toDate">To Date</Label>
          <Input type="date" name="toDate" id="toDate"
            value={toDate}
            onChange={(e) => {
              console.log((e.target.value));
              setToDate((e.target.value));
            }} />
        </FormGroup>
        {isOpeningOrderStatus ? (
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Customer Name</Label>
          {localStorage.getItem('roleUID') !== '1' ? (<><MultiComboInput ref={multicomboinput} dataSource={CustomerList} dropDownButtonPosition="right" selectAll animation='advanced'
            placeholder="Select / Search customer name"
            inputTagsMode="one"
            inputPurpose="on"
            filterable
          ></MultiComboInput></>) : (<><Input type="select" name="select">
            {CustomerList.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>
            ))}
          </Input>
          </>)}
        </FormGroup>
        ) : null}
        {isOpeningBrandProduct ? (
          <FormGroup className="w-20 mb-5">
            <Label for="Select-1">Brand</Label>
            <MultiComboInput ref={multicomboinputBrand} dataSource={brandValues} dropDownButtonPosition="right" selectAll animation='advanced'
              placeholder="Select / Search brand"
              inputTagsMode="one"
              inputPurpose="on"
              filterable
              onChange={(e) => handleBrandChange(e)}
            ></MultiComboInput>
          </FormGroup>
        ) : null}
      </div>
      <div className="top-filter clearfix p-5">
        {isOpeningBrandProduct ? (
          <FormGroup className="w-20 mb-5">
            <Label for="Select-1">Product</Label>

            <MultiComboInput ref={multicomboinputProduct} dataSource={productValues} dropDownButtonPosition="right" selectAll animation='advanced'
              placeholder="Select / Search Product"
              inputTagsMode="one"
              inputPurpose="on"
              filterable
            ></MultiComboInput>
          </FormGroup>
        ) : null}
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Order Type</Label>
          <div className="app-selectbox-sm">
            <Input type="select" name="select" id="Select-2"
              onChange={(e) => {
                setReqType(e.target.value);
              }}
            >
              <option value={0}>Select Type</option>
              <option value={'ALL'}>All</option>
              {reqTypeValues.map((option) => (
                <option key={option.OrderValue} value={option.OrderValue}>{option.OrderTypeName}</option>

              ))}
            </Input>
          </div>
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Order Type</Label>
          <div className="app-selectbox-sm">
            <Input type="select" name="select" id="Select-2"
              onChange={(e) => {
                setAllReqType(e.target.value);
              }}
            >
              <option value={0}>Select Type</option>
              {reqAllTypeValues.map((option) => (
                <option key={option.value} value={option.label}>{option.label}</option>
              ))}
            </Input>
          </div>
        </FormGroup>
        <FormGroup className="w-20 mb-5">
          <Label for="Select-1">Report Options</Label>
          <div className="app-selectbox-sm">
            <Input type="select" name="select" id="Select-2"
              onChange={(e) => {
                setGridData([])
                console.log(e.target.value)
                columnsDynamic(e.target.value)
                if (e.target.value == "CUSTOMER_BRAND_PRODUCT_SUMMARY") {
                  setIsOpeningOrderStatus(true);
                  setIsOpeningBrandProduct(false);
                  setIsOpeningStyleSize(true);
                  columnsDynamic(e.target.value)
                }
                
                else if(e.target.value == "BRAND_PRODUCT_SUMMARY") {
                  setIsOpeningOrderStatus(true);
                  setIsOpeningBrandProduct(true);
                  columnsDynamic(e.target.value);
                }
                else {
                  setIsOpeningOrderStatus(true);
                  setIsOpeningBrandProduct(true);
                  setIsOpeningStyleSize(false);
                }
                setReportsType(e.target.value);
              }}
            >
              <option value={0}>Select Type</option>
              {reqReportTypeValues.map((option) => (
                <option key={option.value} value={option.label}>{option.label}</option>
              ))}
            </Input>
          </div>
        </FormGroup>
        <FormGroup className="mb-5">
          <Label className="d-block">&nbsp;</Label>
          <Button className="btn-primary text-white" onClick={getData}>Get Report</Button>
        </FormGroup>
      </div>
      {/* <div style={{ height: "1px", width: "100%", backgroundColor: "#9f538675" }} /> */}
      <div className="top-filter clearfix p-6">
        {!isgetRowData ? (<>
            {gridData && gridData.length > 0 ? (<>
            {reportsType == "SIZE_WISE" ? (<>
            <h5>Madura Fashion & Lifestyle Division.</h5>
            <h5>Aditya Birla Fashion & Retail Ltd.</h5>
            <h5 className="redColor">Normal Order Status Size-Wise Detailed Report for the Period {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5>
            <h5>Report for customer: {localStorage.getItem('roleUID') !== '1' ? null : customerCode()} as on {moment().format("DD/MM/YYYY")}</h5>
            <h5>MDP: {agentName}</h5>
            <Table ref={table} id="orderstatus" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
            {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} headers={headers} filename={reportsType+".csv"} target="_blank"></CSVLink> : null}
            </>) : (null)}

            {reportsType == "STYLE_WISE" ? (<>
            <h5>Madura Fashion & Lifestyle Division.</h5>
            <h5>Aditya Birla Fashion & Retail Ltd.</h5>
            <h5 className="redColor">Normal Order Status Style-Wise Detailed Report for the Period from {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5>
            {/* <h5>Report for customer: {customerCode()} as on {moment().format("DD/MM/YYYY")}</h5> */}
            <h5>MDP: {agentName}</h5>
            <Table ref={table} id="orderstatus" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
            {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} headers={headers} filename={reportsType+".csv"} target="_blank"></CSVLink> : null}
            </>) : (null)}

            {reportsType == "CUSTOMER_BRAND_PRODUCT_SUMMARY" ? (<>
            <h5>Madura Fashion & Lifestyle Division.</h5>
            <h5>Aditya Birla Fashion & Retail Ltd.</h5>
            <h5 className="redColor">Brand Product Wise Normal Orders Summary Report for the Period</h5>
            <h5>Report for Brand:All, Product:All, Customer: {localStorage.getItem('roleUID') !== '1' ? null : customerCode()} as on {moment(toDate).format("DD/MM/YYYY")}</h5>
            {/* <h5 className="redColor">Normal Order Status Size-Wise Detailed Report for the Period {moment(fromDate).format("DD/MM/YYYY")} to {moment(toDate).format("DD/MM/YYYY")}</h5>
            <h5>Report for customer: {customerCode()} as on {moment().format("DD/MM/YYYY")}</h5>*/}
            <h5>MDP: {agentName}</h5>
            <Table ref={table} id="orderstatus" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>
            {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} headers={headers} filename={reportsType+".csv"} target="_blank"></CSVLink> : null}
            </>) : (null)}

            {reportsType == "BRAND_PRODUCT_SUMMARY" ? (<>
            <h5>Madura Fashion & Lifestyle Division.</h5>
            <h5>Aditya Birla Fashion & Retail Ltd.</h5>
            <h5 className="redColor">Brand Product Wise Normal Orders Summary Report for the Period</h5>
            <h5>Report for Brand:All, Product:All as on {moment(toDate).format("DD/MM/YYYY")}</h5>
            {/* <h5>Report for customer: {customerCode()} as on {moment().format("DD/MM/YYYY")}</h5>*/}
            <h5>MDP: {agentName}</h5>
            <Table ref={table} id="orderstatus" dataSource={gridData} keyboardNavigation={keyboardNavigation} grouping={grouping} paging={paging} columns={columnDynamicState}></Table>

            {downloadFlag == true ? <CSVLink ref={csvRef} data={gridData} headers={headers} filename={reportsType+".csv"} target="_blank"></CSVLink> : null}
            </>) : (null)}
            </>) : (<div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
              <h3 style={noRecordFound}>{validationMessage}</h3></div>)}
              </>) : <div className="spinner_SVG"> <Bars
              className="spinner_position"
              height="5vh"
              width="5vw"
              color="#1197f2"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /></div>}
      </div>
      {/* // </div > */}
    </>
  )
}