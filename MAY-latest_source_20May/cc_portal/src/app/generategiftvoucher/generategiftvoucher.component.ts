import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs';
import { takeUntil, delay} from 'rxjs/operators';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { DOCUMENT} from '@angular/common';
import { environment } from 'src/environments/environment';
import { RadioButtonComponent } from 'smart-webcomponents-angular/radiobutton';
declare var formComponent: any;
declare var $: any;
declare var ggvprocessPrintDetails: any;
interface  scrolllist {
  UserName: string | null;
  fromDate: string;
  toDate: string;
  limitstart: number;
  limitend: number;
  filter: string;
};

@Component({
  selector: 'app-generategiftvoucher',
  templateUrl: './generategiftvoucher.component.html',
  styleUrls: ['./generategiftvoucher.component.css']
})
export class GenerategiftvoucherComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('grid', { read: GridComponent, static: false }) grid: GridComponent;
  @ViewChild('button', { read: ButtonComponent, static: false }) xlsxBtn: ButtonComponent;
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
  dataSource =  new  window.Smart.DataAdapter({
    dataFields: [
      'SerialNo:string',
      'InwardDate:string ',
      'Store:string',
      'CustomerName:string',
      'Status:string',
      'CustomerMobile:string',
      'Stylecode:string',
      'GarmentMRP:string',
      'imgURL:string',
      'InvoiceBillName:string',
      'checkbox: bool'
    ]
  });

  columns = [
    { label: 'Serial No', dataField: 'SNO', template: function (formatObject: any)  {
      formatObject.template = `<a href="javascript:SerialNo('${formatObject.value}');" style="border-bottom: 0px solid blue !important;">${formatObject.value}</a>`;
      }, width: '5%'},
    { label: 'Date', dataField: 'inDATE', width: '10%'},
    { label: 'Store', dataField: 'Store', width: '10%'},
    { label: 'Customer Name', dataField: 'CusName', width: '15%'},
    { label: 'Status', dataField: 'Status', width: '9%'},
    { label: 'Mobile', dataField: 'CusMobile', width: '10%'},
    { label: 'Style Code', dataField: 'codeStyle', width: '15%'},
    { label: 'Garment MRP', dataField: 'GARMRP', width: '7%'},
    {
      label: 'Invoice Bill', dataField: 'InvoiceBillName', template: function (formatObject: any) {
        if (formatObject.value !== '') {
          formatObject.template = `<a href="https://fitguide12v.southindia.cloudapp.azure.com/ABFRL_CC/${formatObject.row.data['imgURL']}/${formatObject.row.data['InvoiceBillName']}" target="_blank" style="margin-left:15px;border-bottom: 0px solid blue !important;">Click to View</a>`;
        }
        else{
          formatObject.template =  ``;
        }
      }, width:'10%', align: 'left', cellsAlign: 'left'
    },
    { label: '', dataField: 'SNO', template: function (formatObject: any) {
      formatObject.template = `<input type="checkbox" onclick="getSerialNo('${formatObject.value}')" name="checkbox" id="S_${formatObject.value}" value="'${formatObject.value}'" style= "margin-left:17px">`;
    }, width: '2%'},
  ];

  serialArray: any;
  voucherFlag: any;
  form: FormGroup;
  loadDate = {
    fromDate: null,
    toDate:null
  };
  submitted: any;
  dataFlag: any;
  gvSerialNo = {
    SerialNo: ''
  };
  courier = {
    SerialNo: ''
  }
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
  constructor(private router: Router, private http: HttpClient,  @Inject(DOCUMENT) private doc: Document, public fb: FormBuilder) { 
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
    formComponent = this;
    this.serialArray = [];
    this.voucherFlag = true;
    this.submitted = false;
    this.dataFlag = false;
    this.SerialNoDetails = {};
    this.excelFlag = true;
    this.dateFlag = false;
    if(localStorage.getItem('accountsFromDate') != null){
      this.scrolllistobj.fromDate = localStorage.getItem('accountsFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('accountsToDate');
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
    .post<any>(this.apiURL + '/api/getawaitinggvlistsmartgrid', this.scrolllistobj)
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
    localStorage.setItem('accountsFromDate',this.form.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('accountsToDate',this.form.value.ToDate.split('-').reverse().join('-'));
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
          localStorage.removeItem('accountsFromDate');
          localStorage.removeItem('accountsToDate');
        }
        else{
          const sqlQuery = details.query;
          resultCallbackFunction({
            dataSource: result.awitingList,
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
        'inDATE:string ',
        'Store:string',
        'CusName:string',
        'Status:string',
        'CusMobile:string',
        'codeStyle:string',
        'GARMRP:string',
        'imgURL:string',
        'InvoiceBillName:string',
        'checkbox: bool'
      ]
    });
  } 

  /*getAccList(): void {
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
          dataSource: response.awitingList
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
    return this.http.post('https://fitguide12v.southindia.cloudapp.azure.com/ABFRL_CC/public/api/getawaitinggv',this.loadDate);
  }*/

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

  addSerialNo(x: any): void {
    this.serialArray.push(x);
  }

  removeSerialNo(x: any): void {
    for (var i = 0; i < this.serialArray.length; i++) {
      if(this.serialArray[i] === x ){
        this.serialArray.splice(i, 1);
      }
    }
  }

  generateGiftVoucher(): void {
    this.gvSerialNo.SerialNo = this.serialArray;
    console.log(this.gvSerialNo.SerialNo);
    this.http.post<any>(this.apiURL + '/api/generategv', this.gvSerialNo)
    .subscribe(data => {
      this.serialArray = [];
      this.gvSerialNo.SerialNo = this.serialArray;
      this.loadList();
    });
  }

  exit(): void {
    this.voucherFlag = true;
    this.serialArray = [];
    this.gvSerialNo.SerialNo = this.serialArray;
    localStorage.removeItem('accountsFromDate');
    localStorage.removeItem('accountsToDate');
    this.form.reset();
    this.submitted = false;
  }

  clear(): void{
    this.doc.defaultView.location.reload();
  }

  forgvPrint(blockid: any): void {
    ggvprocessPrintDetails(blockid);
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
