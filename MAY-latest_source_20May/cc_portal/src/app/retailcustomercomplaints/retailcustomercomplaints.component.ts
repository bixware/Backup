import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
//import { RadioButtonComponent } from '@smart-webcomponents-angular/radiobutton';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntil, delay} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { RadioButtonComponent } from 'smart-webcomponents-angular/radiobutton';
declare var formComponent: any;
declare var retailprocessPrintDetails: any;
declare var $: any;
interface  scrolllist {
  UserName: string | null;
  fromDate: string;
  toDate: string;
  limitstart: number;
  limitend: number;
  filter: string;
};

@Component({
  selector: 'app-retailcustomercomplaints',
  templateUrl: './retailcustomercomplaints.component.html',
  styleUrls: ['./retailcustomercomplaints.component.css']
})
export class RetailcustomercomplaintsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('grid', { read: GridComponent, static: false }) grid: GridComponent;
  @ViewChild('button', { read: ButtonComponent, static: false }) xlsxBtn: ButtonComponent;
  //@ViewChild('radiobutton', { read: RadioButtonComponent, static: false }) empty: RadioButtonComponent;
  @ViewChild('growAndShrink', { read: RadioButtonComponent, static: false }) growAndShrink: RadioButtonComponent;
  sorting = {
    enabled: true
  };
  filtering = {
    enabled: true
  };
  grouping = {
    enabled: true
  };
  header = {
    visible: true,
    buttons: ['columns', 'filter', 'sort', 'group', 'search']
  };
  paging = {
    enabled: true,
      pageSize: 10,
      spinner: {
        enabled: true
      }
  };
	pager = {
		visible: true
	};
  appearance = {
    showRowHeader: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: true,
  };
  selection = {
    enabled: true,
    allowRowHeaderSelection: true,
    mode: 'extended'
  };

  behavior = { columnResizeMode: 'growAndShrink' }

  private destroy = new Subject<void>();
  dataSource =  new window.Smart.DataAdapter({
    dataFields: [
      'SerialNo:string',
      'InwardDate:string',
      'GarmentMRP:string',
      'Store:string',
      'CustomerName:string',
      'CustomerMobile:string',
      'Stylecode:string',
      'imgURL:string',
      'InvoiceBillName:string',
      'radio: string',
    ]
  });
  /*columns = [
    { label: 'Justify', dataField: 'justify', template: function (formatObject: any) {
    formatObject.template = `<input type="radio"  name="justify" value="'${formatObject.value}'"  style= "margin-left:17px">`;
    },width: 40},
    { label: 'Un Justify', dataField: 'unJustify', template: function (formatObject: any) {
      formatObject.template = `<input type="radio"  name="justify" value="'${formatObject.value}'"  style= "margin-left:17px">`;
    },width: 75},
    { label: 'Serial No', dataField: 'serialNo', width: 120},
    { label: 'Style Code', dataField: 'styleCode', width: 140 }, 
    { label: 'Product', dataField: 'product', width: 180 },
    { label: 'Mobile', dataField: 'mobile', width: 170 },
    { label: 'Name', dataField: 'name', width: 150 },
    { label: 'Store', dataField: 'store', width: 100 },
    { label: 'City', dataField: 'city', width: 150 },
    { label: 'Reason', dataField: 'reason', width: 210 },
    { label: 'QC Analysis', dataField: 'qcAnalysis', width: 310 },
  ];*/
  columns = [
    { label: 'Serial No', dataField: 'SNO', template: function (formatObject: any)  {
      formatObject.template = `<a href="javascript:SerialNo('${formatObject.value}');" style="border-bottom: 0px solid blue !important;">${formatObject.value}</a>`;
      }, width: '8%'},
    { label: 'Inward Date', dataField: 'inwDate', width: '10%'},
    { label: 'Garment MRP', dataField: 'GarMRP', width: '10%'},
    { label: 'Store', dataField: 'Store', width: '12%'},
    { label: 'Customer Name', dataField: 'cusName', width: '16%'},
    { label: 'Mobile', dataField: 'cusMobile', width: '10%'},
    { label: 'Style Code', dataField: 'style', width: '14%'},
    {
      label: 'Invoice Bill', dataField: 'InvoiceBillName', template: function (formatObject: any) {
        if (formatObject.value !== '') {
          formatObject.template = `<a href="https://fitguide12v.southindia.cloudapp.azure.com/ABFRL_CC/${formatObject.row.data['imgURL']}/${formatObject.row.data['InvoiceBillName']}" target="_blank" style="margin-left:15px;border-bottom: 0px solid blue !important;">Click to View</a>`;
        }
        else{
          formatObject.template =  ``;
        }
      }, width:'12%', align: 'left', cellsAlign: 'left'
    },
    { label: '', dataField: 'SNO', template: function (formatObject: any) {
      formatObject.template = `<input type="checkbox" onclick="getRetailSerialNo('${formatObject.value}')" name="radio" id="S_${formatObject.value}" value="'${formatObject.value}'" style= "margin-left:7px">`;
    }, width: '4%'},
  ];

  serialNumber: any;
  voucherFlag: any;
  form: FormGroup;
  /*loadDate = {
    fromDate: null,
    toDate:null,
    UserName:null
  };*/
  submitted: any;
  dataFlag: any;
  retailData = {
    SerialNo:[],
    returnJU:''
  };
  courier = {
    SerialNo: ''
  };
  SerialNoDetails:any;
  scrolllistobj:scrolllist = {
    UserName: null, limitstart: 0, limitend: 10, filter: '',
    fromDate: '',
    toDate: ''
  };
  tableData: any;
  apiURL: any;
  data: any;
  tableLoad: boolean;
  timer = null;
  sortedData = [];
  filteredData = [];
  dataCount: number;
  excelFlag: any;
  dateFlag: any;
  constructor(private router: Router, private http: HttpClient, @Inject(DOCUMENT) private doc: Document, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      FromDate: ['',Validators.required],
      ToDate: ['', Validators.required]
    });
    this.tableLoad = false;
    this.data = [];
    this.dataCount = 0;
    this.tableData = [];
    window.Smart.DataAdapter["TemplateRef"] = this;
   }
  
   get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.SerialNoDetails = {};
    this.retailData.SerialNo = [];
    formComponent = this;
    this.serialNumber ='';
    this.voucherFlag = true;
    this.submitted = false;
    this.dataFlag = false;
    this.excelFlag = true;
    this.dateFlag = false;
    if(localStorage.getItem('retailFromDate') != null){
      this.scrolllistobj.fromDate = localStorage.getItem('retailFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('retailToDate');
      this.loadList();
    }
  }

  formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  async getData(details): Promise<Observable<any>> {
    const sqlQuery = details.query;
    this.scrolllistobj.limitstart = details.first;
    this.scrolllistobj.limitend = 10;
    this.scrolllistobj.UserName = localStorage.getItem('userName');
    if(this.dateFlag){
    this.scrolllistobj.fromDate = this.form.value.FromDate.split('-').reverse().join('-');
    this.scrolllistobj.toDate = this.form.value.ToDate.split('-').reverse().join('-');
    }
    this.scrolllistobj.filter = sqlQuery['where'] + sqlQuery['groupBy'] + sqlQuery['orderBy']
    var test1 = await this.http
    .post<any>(this.apiURL + '/api/getretailcclistsmartgrid', this.scrolllistobj)
    .pipe(takeUntil(this.destroy))
    .toPromise();
    this.tableData = [];
    this.tableData = test1;
    return this.tableData;
  }

  load(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dateFlag = true;
    localStorage.setItem('retailFromDate',this.form.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('retailToDate',this.form.value.ToDate.split('-').reverse().join('-'));
    this.loadList();
  }

  loadList(): void {
    this.voucherFlag = false;
    this.dataFlag = false;
    
    const that = this;
    that.dataSource = new window.Smart.DataAdapter({
      virtualDataSourceCache: true,
      virtualDataSource: async function (resultCallbackFunction: any, details: any) {
        const that = window.Smart.DataAdapter.TemplateRef;
        var result = await that.getData(details);
        console.log(result.return_code);
        if(result.return_code == 1){
          resultCallbackFunction({
            dataSource: [],
            virtualDataSourceLength: 0
          });
          that.voucherFlag = true;
          that.dataFlag = true;
          localStorage.removeItem('retailFromDate');
          localStorage.removeItem('retailToDate');
        }
        else{
          const sqlQuery = details.query;
          resultCallbackFunction({
            dataSource: result.retailList,
            virtualDataSourceLength: result.totalcount
          });
          if (that.excelFlag) {
            that.init();
            that.excelFlag = false;
          }
        }
      },
      dataFields: [
      'SNO:string',
      'inwDate:string',
      'GarMRP:string',
      'Store:string',
      'cusName:string',
      'cusMobile:string',
      'style:string',
      'imgURL:string',
      'InvoiceBillName:string',
      'radio: string',
      ]
    });
  }

  /*getRetailList(): void {
    const that = this;
    var result = that.getData();
    result.subscribe(response => {
      if(response.return_code == 1){
        this.voucherFlag = true;
        this.dataFlag = true;
      }
      else{
        this.voucherFlag = false;
        this.dataFlag = false;
        that.dataSource = new Smart.DataAdapter({
          dataSource: response.retailList
        });
      }
    },
    error => {
      that.dataSource = new Smart.DataAdapter({
        dataSource: [],
      });
    });
  }

  getData(): Observable<any> {
    return this.http.post('https://fitguide12v.southindia.cloudapp.azure.com/ABFRL_CC/public/api/getretailcclist', this.loadDate);
  }*/


  addRetailSerialNo(x: any, y: any): void {
    if (y == 'add') {
      this.retailData.SerialNo.push(x);
    } else if (y == 'remove') {
      const index = this.retailData.SerialNo.indexOf(x);
      if (index > -1) { 
        this.retailData.SerialNo.splice(index, 1);
      }
    }
  }

  openSerialNo(x: any): void{
    this.courier.SerialNo = x;
    this.http.post<any>(this.apiURL + '/api/getserialnodetials',this.courier )
    .subscribe(data => {
      if (data.return_code == 0) {
      this.SerialNoDetails = data.details[0];
      $('#Modal').css('display', 'block');
    }
   });
   }

   closeModals(): void {
    $('#Modal').css('display', 'none');
  }
  
  unjustify(): void{
    this.retailData.returnJU = 'Un-Justified';
    this.http.post<any>(this.apiURL + '/api/updatejustifiedbyretailuser', this.retailData)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.loadList();
        this.retailData.SerialNo = [];
      }
    })
  }

  justify(): void{
    this.retailData.returnJU = 'Justified';
    this.http.post<any>(this.apiURL + '/api/updatejustifiedbyretailuser', this.retailData)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.loadList();
        this.retailData.SerialNo = [];
      }
    })
  }

  exit(): void {
    this.voucherFlag = true;
    localStorage.removeItem('retailFromDate');
    localStorage.removeItem('retailToDate');
    this.form.reset();
    this.submitted = false;
  }

  clear(): void{
    this.doc.defaultView.location.reload();
  }

  forretailPrint(blockid: any): void {
    retailprocessPrintDetails(blockid);
  }

  ngOnDestroy(): void {
    formComponent = null;
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      setTimeout(() => {
        if (!$('.nav-toggle').hasClass('nav-toggle--active')) {
          $('#page-content').css('margin-left', '0px');
        }
      }, 333);
    });
  }

  init(): void {
    const that = this;
    that.xlsxBtn.addEventListener('click', () => {
        that.grid.exportData('xlsx');
    });
    that.growAndShrink.addEventListener('change', function (event: CustomEvent) {
      if (event.detail.value) {
          that.grid.behavior.columnResizeMode = 'growAndShrink';
      }
  });
  }

}
