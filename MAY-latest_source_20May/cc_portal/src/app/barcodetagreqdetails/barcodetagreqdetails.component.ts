import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit,Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonComponent } from 'smart-webcomponents-angular/button';
import { GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { Router } from '@angular/router';
import { Subject, Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { takeUntil, delay} from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { RadioButtonComponent } from 'smart-webcomponents-angular/radiobutton';
declare var $: any;
interface  scrolllist {
  UserName: string | null;
  fromDate: string;
  toDate: string;
  limitstart: number;
  limitend: number;
  filter: string;
  listID: string;
};

@Component({
  selector: 'app-barcodetagreqdetails',
  templateUrl: './barcodetagreqdetails.component.html',
  styleUrls: ['./barcodetagreqdetails.component.css']
})
export class BarcodetagreqdetailsComponent implements OnInit, AfterViewInit {
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
  dataSource =  new window.Smart.DataAdapter({
    dataFields: [
      'RequestNo:string',
      'Shrno:string',
      'style:string',
      'Brand:string',
      'RDATE:string',
      'LRNo:string',
      'LRDATE:string',
      'Color:string',
      'HF:string',
      'size:string',
      'Price:string'
    ]
  });
  columns = [
    { label: 'Barcode Tag Id', dataField: 'RequestNo', width: '10%'},
    { label: 'Showroom No', dataField: 'Shrno', width: '10%'},
    { label: 'Style code', dataField: 'style', width: '12%'},
    { label: 'Brand', dataField: 'Brand', width: '7%'},
    { label: 'Date', dataField: 'RDATE', width: '8%'},
    { label: 'LR Number', dataField: 'LRNo', width: '13%'},
    { label: 'LR Date', dataField: 'LRDATE', width: '8%'},
    { label: 'Color', dataField: 'Color', width: '8%' },
    { label: 'Sleeve', dataField: 'HF', width: '6%' },
    { label: 'Size', dataField: 'size', width: '6%' },
    { label: 'Garment MRP', dataField: 'Price', width: '9%' }
  ];
  

  voucherFlag: any;
  form: FormGroup;
  submitted: any;
  dataFlag: any;
  scrolllistobj:scrolllist = {
    UserName: null, limitstart: 0, limitend: 10, filter: '',
    fromDate: '',
    toDate: '',
    listID: ''
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
  constructor(private router: Router, @Inject(DOCUMENT) private doc: Document, private http: HttpClient, public fb: FormBuilder) {
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
    this.voucherFlag = true;
    this.submitted = false;
    this.dataFlag = false;
    this.excelFlag = true;
    this.dateFlag = false;
    if(localStorage.getItem('whacFromDate') != null){
      this.scrolllistobj.fromDate = localStorage.getItem('whacFromDate');
      this.scrolllistobj.toDate = localStorage.getItem('whacToDate');
      this.scrolllistobj.listID = localStorage.getItem('tagListID');
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
    .post<any>(this.apiURL + '/api/getrequestnewtaglistsmartgrid', this.scrolllistobj)
    .pipe(takeUntil(this.destroy))
    .toPromise();
    this.tableData = [];
    this.tableData = test1;
    localStorage.setItem('tagListID', test1.listID);
    return this.tableData;
  }

  load(): void {
    this.submitted = true;
    if (this.form.invalid) {
    return;
    }
    this.dateFlag = true;
    localStorage.setItem('whacFromDate',this.form.value.FromDate.split('-').reverse().join('-'));
    localStorage.setItem('whacToDate',this.form.value.ToDate.split('-').reverse().join('-'));
    this.loadList();
  }
  
  loadList(): void{
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
          localStorage.removeItem('whacFromDate');
          localStorage.removeItem('whacToDate');
        }
        else {
          const sqlQuery = details.query;
          resultCallbackFunction({
            dataSource: result.requestTagList,
            virtualDataSourceLength: result.totalcount
          });
          if (that.excelFlag) {
            that.init();
            that.excelFlag = false;
          }
        }
      },
      dataFields: [
        'RequestNo:string',
        'Shrno:string',
        'style:string',
        'Brand:string',
        'RDATE:string',
        'LRNo:string',
        'LRDATE:string',
        'Color:string',
        'HF:string',
        'size:string',
        'Price:string'
      ]
    });
  }



  /*ngOnInit(): void {
    this.getTagReqList();
  }

  getTagReqList(): void {
    const that = this;
    var result = that.getData();
    result.subscribe(response => {
      that.dataSource = new Smart.DataAdapter({
        dataSource: response.requestTagList
      });
    },
    error => {
      that.dataSource = new Smart.DataAdapter({
        dataSource: [],
      });
    });
  }

  getData(): Observable<any> {
    return this.http.post('https://fitguide12v.southindia.cloudapp.azure.com/ABFRL_CC/public/api/getrequestnewtag', {userName: localStorage.getItem('userName')});
  }*/

  exit(): void {
    this.voucherFlag = true;
    localStorage.removeItem('whacFromDate');
    localStorage.removeItem('whacToDate');
    this.form.reset();
    this.submitted = false;
  }
  
  clear(): void{
    this.doc.defaultView.location.reload();
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
      this.scrolllistobj.listID = localStorage.getItem('tagListID');
      if (this.dateFlag) {
        this.scrolllistobj.fromDate = this.form.value.FromDate.split('-').reverse().join('-');
        this.scrolllistobj.toDate = this.form.value.ToDate.split('-').reverse().join('-');

      }
      this.scrolllistobj.filter = null;
      const QCurl = this.apiURL + '/api/whacreportexceldownload';
      const d = new Date();
      var filename = 'BarCode_Tag_Details('+this.scrolllistobj.fromDate+' TO '+this.scrolllistobj.toDate+').xlsx';

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
