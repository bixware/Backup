import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { RadioButtonComponent } from 'smart-webcomponents-angular/radiobutton';
declare var formComponent: any;
declare var $: any;
interface scrolllist {
  UserName: string | null;
  fromDate: string;
  toDate: string;
  limitstart: number;
  limitend: number;
  filter: string;
  listID: string | null;
};
@Component({
  selector: 'app-qcreport',
  templateUrl: './qcreport.component.html',
  styleUrls: ['./qcreport.component.css']
})
export class QCReportComponent implements OnInit, OnDestroy, AfterViewInit {
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
  dataSource = new window.Smart.DataAdapter({
    dataFields: [
      'SerialNo:string',
      'Analyst:string',
      'Type:string',
      'LRNO:string',
      'StoreCode:string',
      'StoreName:string',
      'MDPRegion:string',
      'HouseOf:string',
      'EntryDate:string',
      'SubmittedDate:string',
      'CourierReceivedDt:string',
      'InDate:string',
      'AnalysisDate:string',
      'BillDate:string',
      'Brand:string',
      'SubBrand:string',
      'Style:string',
      'Category:string',
      'Product:string',
      'Size:string',
      'Fabric:string',
      'MfgMonthYear:string',
      'VCODE:string',
      'VNAME:string',
      'FCODE:string',
      'FNAME:string',
      'Justification:string',
      'Status:string',
      'DefType:string',
      'DefectRelated:string',
      'DefectAnalysis:string',
      'GarmentCondition:string',
      'GarmentType:string',
      'Saleability:string',
      'GarmentQuality:string',
      'CloseDate:string',
      'ComplaintRemarks:string'
    ]
  });

  columns = [
    { label: 'Serial No', dataField: 'SNO', width: 60 },
    { label: 'Analyst', dataField: 'Analyst', width: 90 },
    { label: 'Type', dataField: 'Type', width: 180 },
    { label: 'LR No', dataField: 'courieLRNO', width: 140 },
    { label: 'Store Code', dataField: 'StoreCode', width: 90 },
    { label: 'Store Name', dataField: 'SName', width: 200 },
    { label: 'MDP Region', dataField: 'MDPRegion', width: 100 },
    { label: 'House Of', dataField: 'HOF', width: 90 },
    { label: 'Entry Date', dataField: 'EDATE', width: 90 },
    { label: 'Submitted Date', dataField: 'SubmittedDate', width: 90 },
    { label: 'Courier Received Dt', dataField: 'CourierReceivedDt', width: 90 },
    { label: 'Inward Date', dataField: 'InDate', width: 90 },
    { label: 'Analysis Date', dataField: 'AnDate', width: 100 },
    { label: 'Bill Date', dataField: 'BDATE', width: 90 },
    { label: 'Brand', dataField: 'Brand', width: 160 },
    { label: 'Sub Brand', dataField: 'SubBrand', width: 160 },
    { label: 'Style', dataField: 'Style', width: 160 },
    { label: 'Category', dataField: 'Category', width: 160 },
    { label: 'Product', dataField: 'Product', width: 80 },
    { label: 'Size', dataField: 'Size', width: 60 },
    { label: 'Sleeve', dataField: 'Sleeve', width: 60 },
    { label: 'Fabric', dataField: 'Fabric', width: 120 },
    { label: 'Mfg Month Year', dataField: 'MfgMonthYear', width: 130 },
    { label: 'Vendor Code', dataField: 'VCODE', width: 120 },
    { label: 'Vendor Name', dataField: 'VNAME', width: 200 },
    { label: 'Factory Code', dataField: 'FCODE', width: 120 },
    { label: 'Factory Name', dataField: 'FNAME', width: 200 },
    { label: 'Justification', dataField: 'Justification', width: 100 },
    { label: 'Status By', dataField: 'Status', width: 90 },
    { label: 'Defect Type', dataField: 'DefType', width: 200 },
    { label: 'Defect Related', dataField: 'DefectRelated', width: 200 },
    { label: 'Defect Analysis', dataField: 'DefAnalysis', width: 120 },
    { label: 'Garment Condition', dataField: 'GarmentCondition', width: 130 },
    { label: 'Garment Type', dataField: 'Gartype', width: 120 },
    { label: 'Saleability', dataField: 'Saleability', width: 120 },
    { label: 'Garment Quality', dataField: 'GarQuality', width: 120 },
    { label: 'Close Date', dataField: 'CDATE', width: 90 },
    { label: 'Remarks', dataField: 'comRemark', width: 350 }
  ];

  voucherFlag: any;
  form: FormGroup;
  submitted: any;
  dataFlag: any;

  courier = {
    SerialNo: ''
  }
  SerialNoDetails: any;
  scrolllistobj: scrolllist = {
    UserName: null, limitstart: 0, limitend: 10, filter: '',
    fromDate: '',
    toDate: '',
    listID: null
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
      FromDate: ['', Validators.required],
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
    this.SerialNoDetails = {};
    this.excelFlag = true;
    this.dateFlag = false;
    if (localStorage.getItem('qcreportFromDate') != null) {
      this.scrolllistobj.fromDate = localStorage.getItem('qcreportFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('qcreportToDate');
      this.scrolllistobj.listID = localStorage.getItem('qcListID');
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
    this.scrolllistobj.listID = localStorage.getItem('qcListID');
    if (this.dateFlag) {
      this.scrolllistobj.fromDate = this.form.value.FromDate.split('-').reverse().join('-');
      this.scrolllistobj.toDate = this.form.value.ToDate.split('-').reverse().join('-');

    }
    this.scrolllistobj.filter = sqlQuery['where'] + sqlQuery['groupBy'] + sqlQuery['orderBy']
    var test1 = await this.http
      .post<any>(this.apiURL + '/api/getqclistreport', this.scrolllistobj)
      .pipe(takeUntil(this.destroy))
      .toPromise();
    this.tableData = [];
    this.tableData = test1;
    localStorage.setItem('qcListID', test1.listID);
    return this.tableData;
  }

  load(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.dateFlag = true;
    localStorage.removeItem('qcListID');
    localStorage.setItem('qcreportFromDate', this.form.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('qcreportToDate', this.form.value.ToDate.split('-').reverse().join('-'));
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
        if (result.return_code == 1) {
          resultCallbackFunction({
            dataSource: [],
            virtualDataSourceLength: 0
          });
          that.voucherFlag = true;
          that.dataFlag = true;
          localStorage.removeItem('qcreportFromDate');
          localStorage.removeItem('qcreportToDate');

        }
        else {
          const sqlQuery = details.query;
          resultCallbackFunction({
            dataSource: result.QCReportList,
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
        'Analyst:string',
        'Type:string',
        'courieLRNO:string',
        'StoreCode:string',
        'SName:string',
        'MDPRegion:string',
        'HOF:string',
        'EDATE:string',
        'SubmittedDate:string',
        'CourierReceivedDt:string',
        'InDate:string',
        'AnDate:string',
        'BDATE:string',
        'Brand:string',
        'SubBrand:string',
        'Style:string',
        'Category:string',
        'Product:string',
        'Size:string',
        'Sleeve:string',
        'Fabric:string',
        'MfgMonthYear:string',
        'VCODE:string',
        'VNAME:string',
        'FCODE:string',
        'FNAME:string',
        'Justification:string',
        'Status:string',
        'DefType:string',
        'DefectRelated:string',
        'DefAnalysis:string',
        'GarmentCondition:string',
        'Gartype:string',
        'Saleability:string',
        'GarQuality:string',
        'CDATE:string',
        'comRemark:string'
      ]
    });
  }

  openSerialNo(x: any): void {
    this.courier.SerialNo = x;
    this.http.post<any>(this.apiURL + '/api/getserialnodetials', this.courier)
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

  exit(): void {
    this.voucherFlag = true;
    localStorage.removeItem('qcreportFromDate');
    localStorage.removeItem('qcreportToDate');
    this.form.reset();
    this.submitted = false;
  }

  clear(): void {
    this.doc.defaultView.location.reload();
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
    that.xlsxBtn.addEventListener('click', async () => {
      //that.grid.exportData('xlsx');
      $('#loader').show();
      const sqlQuery = null;
      this.scrolllistobj.limitstart = null;
      this.scrolllistobj.limitend = 10;
      this.scrolllistobj.UserName = localStorage.getItem('userName');
      this.scrolllistobj.listID = localStorage.getItem('qcListID');
      if (this.dateFlag) {
        this.scrolllistobj.fromDate = this.form.value.FromDate.split('-').reverse().join('-');
        this.scrolllistobj.toDate = this.form.value.ToDate.split('-').reverse().join('-');

      }
      this.scrolllistobj.filter = null;
      const QCurl = this.apiURL + '/api/qcreportexceldownload';
      const d = new Date();
      var filename = 'QC_Report('+this.scrolllistobj.fromDate+' TO '+this.scrolllistobj.toDate+').xlsx';

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
