import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidationErrors } from '@angular/forms';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { Subject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, delay} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AbstractControl, ValidatorFn } from '@angular/forms';
declare var $: any;
declare var formComponent: any;
declare var processPrint: any;
interface  scrolllist {
  UserName: string | null;
  fromDate: string;
  toDate: string;
  limitstart: number;
  limitend: number;
  filter: string;
};
@Component({
  selector: 'app-customer-complain',
  templateUrl: './customer-complain.component.html',
  styleUrls: ['./customer-complain.component.css']
})
export class CustomerComplainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('grid', { read: GridComponent, static: false }) grid: GridComponent;
  @ViewChild('button', { read: ButtonComponent, static: false }) xlsxBtn: ButtonComponent;
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

  form: FormGroup;
  dateForm: FormGroup;
  submitted: any;
  voucherFlag: any;
  dataFlag: any;
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
  dateFlag: any;
  //showRed: any;
  excelFlag: any;
  private destroy = new Subject<void>();
  dataSource = new window.Smart.DataAdapter({
    dataFields: [
      'SNO:string',
      'ReceiptDate:string',
      'CustomerName:string',
      'CustomerMobile:string',
      'Stylecode:string',
      'SizeCode:string',
      'Status:string',
      'Action:string'
    ]
  });
  columns = [
    { label: 'Serial No', dataField: 'SNO', template: function (formatObject: any)  {
      formatObject.template = `<a href="javascript:SerialNo('${formatObject.value}');" style="border-bottom: 0px solid blue !important;">${formatObject.value}</a>`;
      },/*template: '<a href="#{{value}}">{{value}}</a>',*/ width:90},
    { label: 'Date', dataField: 'RDate', width:100},
    { label: 'Customer Name', dataField: 'CusName', width:170 },
    { label: 'Mobile', dataField: 'CusMobile', width:120 },
    { label: 'Style/size', dataField: 'codeStyle', width:200, template: function (formatObject: any) {
      if(Object.keys(formatObject.row.data).length!=0)
      {
      formatObject.template = `<div style='padding-left:10px'> ${formatObject.row.data['codeStyle']} / ${formatObject.row.data['codeSize']} </div>`;
    }
    else {
      formatObject.template = ``;
    }
    }},
    { label: 'Status', dataField: 'Status', width:270 },
    {
      label: 'Action', dataField: 'Action', template: function (formatObject: any) {
        if (formatObject.value === '1') {
          formatObject.template = `<a href="javascript:courierDetails('${formatObject.row.data['SNO']}');" style="margin-left:15px;"><i class="fa fa-pencil-square handCursor" title="Enter Courier Details"></i></a>`;
        }
        else{
          formatObject.template =  ``;
        }
      }, width:90, align: 'left', cellsAlign: 'left'
    }
  ];

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router, @Inject(DOCUMENT) private doc: Document) { 
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      courierName: ['', [Validators.required, firstLetterValidator(), Validators.minLength(0),Validators.maxLength(100)]],
      airwayBillNo: ['', [Validators.required, Validators.minLength(0),Validators.maxLength(60)]],
      lrDate: ['', Validators.required],
    });
    this.dateForm = this.fb.group({
      FromDate: ['',Validators.required],
      ToDate: ['', Validators.required]
    });
    this.tableLoad = false;
    this.data = [];
    this.dataCount = 0;
    this.tableData = [];
    window.Smart.DataAdapter["TemplateRef"] = this;
  }

  ngOnInit(): void {
    //this.getCCList();
    formComponent = this;
    this.voucherFlag = true;
    this.submitted = false;
    this.dataFlag = false;
    this.dateFlag = false;
    this.excelFlag = true;
    this.SerialNoDetails = {};
    if(localStorage.getItem('storeFromDate') != null){
      this.scrolllistobj.fromDate = localStorage.getItem('storeFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('storeToDate');
      this.loadList();
    }
    //this.showRed = true;
  }

  get f(): any { return this.form.controls; }
  get d(): any { return this.dateForm.controls; }

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
      this.scrolllistobj.fromDate = this.dateForm.value.FromDate.split('-').reverse().join('-');
      this.scrolllistobj.toDate = this.dateForm.value.ToDate.split('-').reverse().join('-');
    }
    this.scrolllistobj.filter = sqlQuery['where'] + sqlQuery['groupBy'] + sqlQuery['orderBy']
    var test1 = await this.http
    .post<any>(this.apiURL + '/api/getstorecclistsmartgrid', this.scrolllistobj)
    .pipe(takeUntil(this.destroy))
    .toPromise();
    this.tableData = [];
    this.tableData = test1;
    return this.tableData;
  }

  load(): void {
    this.submitted = true;
    if (this.dateForm.invalid) {
      return;
    }
    this.dateFlag = true;
    localStorage.setItem('storeFromDate', this.dateForm.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('storeToDate', this.dateForm.value.ToDate.split('-').reverse().join('-'));
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
          localStorage.removeItem('storeFromDate');
          localStorage.removeItem('storeToDate');
        }
        else{
          const sqlQuery = details.query;
          resultCallbackFunction({
            dataSource: result.cusComplaintDetails,
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
      'RDate:string',
      'CusName:string',
      'CusMobile:string',
      'codeStyle:string',
      'codeSize:string',
      'Status:string',
      'Action:string'
      ]
    });
  }

  /*getCCList(): void {
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
          dataSource: response.cusComplaintDetails
        });
      }
    },
    error => {
      that.dataSource = new Smart.DataAdapter({
        dataSource: [],
      });
    });
  }*/

  /*getData(): Observable<any> {
    return this.http.post('https://fitguide12v.southindia.cloudapp.azure.com/ABFRL_CC/public/api/getcusqccomplaint', {userName: localStorage.getItem('userName')});
  }*/
  
  openCourier(x: any): void {
    this.courier.SerialNo = x;
    $('#myModal').css('display', 'block');
    this.submitted = false;
  }

  openSerialNo(x: any): void {
    this.courier.SerialNo = x;
    this.http.post<any>(this.apiURL + '/api/getserialnodetials',this.courier )
    .subscribe(data => {
      if (data.return_code == 0) {
      this.SerialNoDetails = data.details[0];
      $('#Modal').css('display', 'block');
    }
   });
  }

  save(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('SerialNo', this.courier.SerialNo);
    myFormData.append('Couriername', this.form.value.courierName);
    myFormData.append('AirwayBillNo', this.form.value.airwayBillNo);
    myFormData.append('LRDate', this.form.value.lrDate.split('-').reverse().join('-'));
    this.http.post<any>(this.apiURL + '/api/addqccomplaintdata', myFormData)
     .subscribe(data => {
      $('#myModal').css('display', 'none');
      this.loadList();
    });
  }

  exit(): void {
    this.voucherFlag = true;
    localStorage.removeItem('storeFromDate');
    localStorage.removeItem('storeToDate');
    this.dateForm.reset();
    this.submitted = false;
  }

  closeModal(): void {
    $('#myModal').css('display', 'none');
  }

  closeModals(): void {
    $('#Modal').css('display', 'none');
  }

  clear(): void{
    this.doc.defaultView.location.reload();
  }

  forPrint(blockid: any): void {
    processPrint(blockid);
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
  }

  ngOnDestroy(): any {
    formComponent = null;
  }
 /* public print() {
    window.print();
  }*/
}
export function firstLetterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !value.length) {
      return null;
    }

    const firstLetter = value[0];
    if (!isNaN(firstLetter)) {
      return { 'firstLetter': 'The first letter must be a letter.' };
    }

    return null;
  };
}