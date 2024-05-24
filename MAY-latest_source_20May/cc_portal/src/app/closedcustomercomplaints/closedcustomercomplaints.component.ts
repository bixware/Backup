import { Component, OnInit, ViewChild, OnDestroy, NgZone, AfterViewInit,Inject } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntil, delay} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { RadioButtonComponent } from 'smart-webcomponents-angular/radiobutton';
declare var formComponent: any;
declare var qccprocessPrintDetails: any;
declare var qcrprocessPrintDetails: any;
declare var viewDetailsPrint: any;
declare var bulkViewDetailsPrint: any;
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
  selector: 'app-closedcustomercomplaints',
  templateUrl: './closedcustomercomplaints.component.html',
  styleUrls: ['./closedcustomercomplaints.component.css']
})
export class ClosedcustomercomplaintsComponent implements OnInit {
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

  scrolllistobj:scrolllist = {
    UserName: null, limitstart: 0, limitend: 10, filter: '',
    fromDate: '',
    toDate: ''
  };
  DefectAnalysis: any;
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
  ujform: FormGroup;
  justified = {
    SerialNo: ''
    };
behavior = { columnResizeMode: 'growAndShrink' }
  
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
      let qcjust = formatObject.row.data['Status'].substring(0, 12);
      if (formatObject.row.data['Status'] == 'QC Un-Justified - NROM Un-Justified' || formatObject.row.data['Status'] == 'Bulk Un-Justified') {
          formatObject.template = `<a href="javascript:loadunjustified('${formatObject.row.data['SNO']}');" style="border-bottom: 0px solid blue !important;">View Details</a>`;
        }
        else if (formatObject.row.data['Status'] == 'Awaiting GV'|| formatObject.row.data['Status'] == 'GV Requested' || formatObject.row.data['Status'] == 'Bulk Justified' || qcjust == 'QC Justified'){
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
    this.ujform = this.fb.group({
      complaintId: [''],
      analysisDate: [''],
      customerName: [''],
      storeCode: [''],
      storeName: [''],
      contactNumber: [''],
      brand: [''],
      address: [''],
      recieptDate: [''],
      city: [''],
      pinCode: [''],
      garmentType: [''],
      styleCode: [''],
      fabricCode: [''],
      //color: [''],
      size:[''],
      condition:[''],
      customerComments:[''],
      //RejectionReason:['']
    });
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
    if(localStorage.getItem('qcClosedFromDate') != null){
      this.scrolllistobj.fromDate = localStorage.getItem('qcClosedFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('qcClosedToDate');
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
    .post<any>(this.apiURL + '/api/getqcclosedlistsmartgrid', this.scrolllistobj)
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
    $('#uj_modal').css('display', 'none');
  }

  load(): void {
    this.submitted = true;
    if (this.form.invalid) {
    return;
    }
    this.dateFlag = true;
    localStorage.setItem('qcClosedFromDate',this.form.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('qcClosedToDate',this.form.value.ToDate.split('-').reverse().join('-'));
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
          localStorage.removeItem('qcClosedFromDate');
          localStorage.removeItem('qcClosedToDate');
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
    /*this.zone.run(() => {
      this.router.navigate(['home/un-justified/' + x]);
    });*/
    this.justified.SerialNo = x;
    this.http.post<any>(this.apiURL + '/api/getcomplaintdetailsbyserialno', this.justified)
      .subscribe(data => {
       console.log(data);
       if (data.return_code == 0) {
        this.ujform.patchValue({
          complaintId: data.details[0].ComplaintID != null ? data.details[0].SerialNo : '',
          //analysisDate: data.details[0].QCAnalysisDate != null ? this.formatDate(data.details[0].QCAnalysisDate.substring(0, 10)) : '',
          analysisDate: data.details[0].QCAnalysisDate != null ? data.details[0].QCAnalysisDate : '',
          customerName: data.details[0].CustomerName != null ? data.details[0].CustomerName : '',
          storeCode: data.details[0].Store != null ? data.details[0].Store : '',
          storeName: data.details[0].StoreName != null ? data.details[0].StoreName : '',
          contactNumber: data.details[0].CustomerMobile != null ? data.details[0].CustomerMobile : '',
          brand: data.details[0].Brand != null ? data.details[0].Brand : '',
          address: data.details[0].CustomerAddress != null ? data.details[0].CustomerAddress : '',
          //recieptDate: data.details[0].ReceiptDate != null ? data.details[0].ReceiptDate : '',
          recieptDate: data.details[0].ReceiptDate != null ? this.formatDate(data.details[0].ReceiptDate.substring(0, 10)) : '',
          city: data.details[0].CustCity != null ? data.details[0].CustCity : '',
          pinCode: data.details[0].CustPin != null ? data.details[0].CustPin : '',
          garmentType: data.details[0].GarmentType != null ? data.details[0].GarmentType : '',
          styleCode: data.details[0].Style != null ? data.details[0].Style : '',
          fabricCode: data.details[0].Fabric != null ? data.details[0].Fabric : '',
          //color: data.details[0].GarmentColor != null ? data.details[0].GarmentColor : '',
          size: data.details[0].Size != null ? data.details[0].Size : '',
          condition: data.details[0].GarmentCondition != null ? data.details[0].GarmentCondition  : '',
          customerComments: data.details[0].UserComments != null ? data.details[0].UserComments  : '',          
        });
        this.DefectAnalysis = data.details[0].DefectAnalysis;
       }
      });
      $('#uj_modal').css('display', 'block');
  }
  exit(): void {
    this.voucherFlag = true;
    localStorage.removeItem('qcClosedFromDate');
    localStorage.removeItem('qcClosedToDate');
    this.form.reset();
    this.submitted = false;
  }

  clear(): void{
    this.doc.defaultView.location.reload();
  }

  forPrint(blockid: any): void {
    qccprocessPrintDetails(blockid);
  }

  forUJPrint(blockid: any): void {
    bulkViewDetailsPrint(blockid);
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
    //that.xlsxBtn.addEventListener('click', () => {
    //    that.grid.exportData('xlsx');
    //});
    that.xlsxBtn.addEventListener('click', async () => {
      //that.grid.exportData('xlsx');
      $('#loader').show();
      const sqlQuery = null;
      this.scrolllistobj.limitstart = null;
      this.scrolllistobj.limitend = 10;
      this.scrolllistobj.UserName = localStorage.getItem('userName');
      if (this.dateFlag) {
        this.scrolllistobj.fromDate = this.form.value.FromDate.split('-').reverse().join('-');
        this.scrolllistobj.toDate = this.form.value.ToDate.split('-').reverse().join('-');

      }
      this.scrolllistobj.filter = null;
      const QCurl = this.apiURL + '/api/qcclosedcomplaintsdownload';
      const d = new Date();
      var filename = 'QC_closedcustomercomplaints('+this.scrolllistobj.fromDate+' TO '+this.scrolllistobj.toDate+').xlsx';

      const baseUrl = QCurl;
      const token = 'my JWT';
      const headers = new HttpHeaders().set('authorization','Bearer '+token);
      this.http.post(baseUrl,this.scrolllistobj,{headers, responseType: 'blob' as 'json'}).subscribe(
          (response: any) =>{
              let dataType = response.type;
              let binaryData = [];
              binaryData.push(response);
              let downloadLink = document.createElement('a');
              downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
              if (filename)
                  downloadLink.setAttribute('download', filename);
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
              $('#loader').hide();
          }
      )
    });
    that.growAndShrink.addEventListener('change', function (event: CustomEvent) {
      if (event.detail.value) {
          that.grid.behavior.columnResizeMode = 'growAndShrink';
      }
  });
  }

}
