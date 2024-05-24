import { Component, OnInit, ViewChild, OnDestroy, NgZone, AfterViewInit,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntil, delay} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var formComponent: any;
declare var qccprocessPrintDetails: any;
declare var qcrprocessPrintDetails: any;
declare var viewDetailsPrint: any;
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
  selector: 'app-qccustomercomplaints',
  templateUrl: './qccustomercomplaints.component.html',
  styleUrls: ['./qccustomercomplaints.component.css']
})
export class QccustomercomplaintsComponent implements OnInit, OnDestroy, AfterViewInit {
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
  voucherFlag: any;
  form: FormGroup;
  submitted: any;
  dataFlag: any;
  courier = {
    SerialNo: '',
  }
  SerialNoDetails:any;
  dateFlag: any;
  excelFlag: any;
  private destroy = new Subject<void>();
  dataSource = new window.Smart.DataAdapter({
      dataFields: [
        'SNO:string',
        'RDate:string',
        'Store:string',
        'raisedBy:string',
        'comType:string',
        'CusName:string',
        'CusMobile:string',
        'codeStyle:string',
        'codeSize:string',
        'Status:string',
        'Action:string'
      ]
  });
  columns = [
    { label: 'Serial No', dataField: 'SNO', template: function (formatObject: any)  {
      if (formatObject.row.data['comType'].toLowerCase() == 'bulk') {
        formatObject.template = `<a href="javascript:BulkSerialNo('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">${formatObject.value}</a>`;
      }
      else{
        formatObject.template = `<a href="javascript:SerialNo('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">${formatObject.value}</a>`;
      }
      }, width:80},
    { label: 'Date', dataField: 'RDate', width:100},
    { label: 'Store', dataField: 'Store', width:110},
    { label: 'Raised by', dataField: 'raisedBy', width:170},
    { label: 'Complaint Type', dataField: 'comType', width:120},
    { label: 'Customer Name', dataField: 'CusName', width:130},
    { label: 'Mobile', dataField: 'CusMobile', width:100},
    { label: 'Style/size', dataField: 'codeStyle', width:170, template: function (formatObject: any) {
      if(Object.keys(formatObject.row.data).length!=0)
      {
      formatObject.template = `<div style='padding-left:10px'> ${formatObject.row.data['codeStyle']} / ${formatObject.row.data['codeSize']} </div>`;
    }
    else {
      formatObject.template = ``;
    }
    }},
    { label: 'Status', dataField: 'Status', width:250},
    { label: 'Action', dataField: 'Action', template: function (formatObject: any) {
      if (formatObject.row.data['Status'] == 'QC Inwarded, Analysis Pending') {
        formatObject.template = `<a href="javascript:loadEnteranalysis('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">Enter Analysis</a>`;
        }
        else if (formatObject.row.data['Status'] == 'Complaint submitted, QC inward pending') {
          formatObject.template = `<a href="javascript:loadTakeinwards('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">Take Inwards</a>`;
        }
        else if (formatObject.row.data['Status'] == 'QC Un-Justified - NROM Un-Justified' || formatObject.row.data['Status'] == 'Bulk Un-Justified') {
          formatObject.template = `<a href="javascript:loadunjustified('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">View Details</a>`;
        }
        else if (formatObject.row.data['Status'] == 'Awaiting GV'|| formatObject.row.data['Status'] == 'GV Requested' || formatObject.row.data['Status'] == 'Bulk Justified'){
          formatObject.template = `<a href="javascript:loadViewdetails('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">View Details</a>`;
        }
        else {
          formatObject.template = ``;
        }
    } , width:110, allowEdit: false,  align: 'center', cellsAlign: 'center'}
  ];

  constructor(private router: Router, private http: HttpClient,  @Inject(DOCUMENT) private doc: Document, private zone: NgZone, public fb: FormBuilder) { 
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
    this.voucherFlag = true;
    this.submitted = false;
    this.dataFlag = false;
    this.dateFlag = false;
    this.excelFlag = true;
    this.SerialNoDetails = {};
    if(localStorage.getItem('qcFromDate') != null){
      this.scrolllistobj.fromDate = localStorage.getItem('qcFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('qcToDate');
      this.loadList();
    };
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
    .post<any>(this.apiURL + '/api/getqclistsmartgrid', this.scrolllistobj)
    .pipe(takeUntil(this.destroy))
    .toPromise();
    this.tableData = [];
    this.tableData = test1;
    return this.tableData;
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

   openBulkSerialNo(x: any): void {
    this.courier.SerialNo = x;
    this.http.post<any>(this.apiURL + '/api/getserialnodetials',this.courier )
    .subscribe(data => {
      if (data.return_code == 0) {
      this.SerialNoDetails = data.details[0];
      $('#Bulk').css('display', 'block');
    }
   });
   }

   viewDetails(x: any): void {
    this.courier.SerialNo = x;
    this.http.post<any>(this.apiURL + '/api/getretailqcdetailsbyserialno',this.courier )
    .subscribe(data => {
      if (data.return_code == 0) {
      this.SerialNoDetails = data.details[0];
      $('#details').css('display', 'block');
      }
     });
     
   }

   closeModals(): void {
    $('#Modal').css('display', 'none');
    $('#Bulk').css('display', 'none');
    $('#details').css('display', 'none');
  }

  load(): void {
    this.submitted = true;
    if (this.form.invalid) {
    return;
    }
    this.dateFlag = true;
    localStorage.setItem('qcFromDate',this.form.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('qcToDate',this.form.value.ToDate.split('-').reverse().join('-'));
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
          localStorage.removeItem('qcFromDate');
          localStorage.removeItem('qcToDate');
        }
        else{
          const sqlQuery = details.query;
          resultCallbackFunction({
            dataSource: result.QCReturnsList,
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
        'Store:string',
        'raisedBy:string',
        'comType:string',
        'CusName:string',
        'CusMobile:string',
        'codeStyle:string',
        'codeSize:string',
        'Status:string',
        'Action:string'
      ]
    });
  }


  takeinwards(x): void {
    this.zone.run(() => {
      this.router.navigate(['home/qcinwards/' + x]);
    });
  }

  enteranalysis(x): void {
    this.zone.run(() => {
      this.router.navigate(['home/qcanalysis/' + x]);
    });
  }

  loadUnjustified(x): void {
    this.zone.run(() => {
      this.router.navigate(['home/un-justified/' + x]);
    });
  }

  exit(): void {
    this.voucherFlag = true;
    localStorage.removeItem('qcFromDate');
    localStorage.removeItem('qcToDate');
    this.form.reset();
    this.submitted = false;
  }

  clear(): void{
    this.doc.defaultView.location.reload();
  }

  forPrint(blockid: any): void {
    qccprocessPrintDetails(blockid);
  }

  forqcPrint(blockid: any): void {
    qcrprocessPrintDetails(blockid);
  }

  fordetailsPrint(blockid: any): void {
    viewDetailsPrint(blockid);
  }

  ngOnDestroy(): any {
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
  }

}