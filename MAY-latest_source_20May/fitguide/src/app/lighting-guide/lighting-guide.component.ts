import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostService } from '../post.service';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { IDatasource } from '@ag-grid-community/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-lighting-guide',
  templateUrl: './lighting-guide.component.html',
  styleUrls: ['./lighting-guide.component.css']
})
export class LightingGuideComponent implements OnInit {
  redirectSecounds: any;
  apiURL: any;
  searchValue: any;
  public list = {
    PROC_TYPE: 'List',
    userUID: ''
  };
  sData: any;
  apiFlag: any;
  successMessage: any;
  gridApi: any;
  gridColumnApi;
  modules = [InfiniteRowModelModule];
  columnDefs: any;
  defaultColDef: any;
  components: any;
  rowBuffer = 0;
  rowModelType = 'infinite';
  cacheBlockSize = 100;
  cacheOverflowSize = 2;
  maxConcurrentDatasourceRequests = 1;
  infiniteInitialRowCount = 100;
  maxBlocksInCache = 10;
  rowData: [];
  form: FormGroup;
  submitted = false;
  datas = {
    userUID: '',
    PROC_TYPE : '',
    MAKE : '',
    MODEL : ''
  };
  vehicleData = {
    Make : '',
    Model : '',
    Year : [],
    PROC_TYPE: 'Add',
    userUID : '',
    qualifier: '',
    shortdescription: '',
    displayheader : '',
    partvalue1: '',
    partvalue2: '',
    partvalue3: '',
    partvalue4: '',
    partvalue5: ''
  };
  makes: any;
  models: any;
  years: any;
 
  vehicle = {
    PROC_TYPE : 'Add'
  }

  selectedYear: any;

  public Adduser = {
    userUID: '',
    PROC_TYPE:'',
    make: '',
    Model: null,
    Year: null,
    qualifier: null,
    shortdescription: null,
    displayheader : null,
    partvalue1: null,
    partvalue2: null,
    partvalue3: null,
    partvalue4: null,
    partvalue5: null
  }


  dataSource: IDatasource = {
    rowCount: null,
    getRows: ({startRow, endRow, sortModel, filterModel, successCallback, failCallback}) => this.postService
    .getNonList(startRow, endRow,filterModel,sortModel,localStorage.getItem('user_id'))
    .pipe(takeUntil(this.destroy))
    .subscribe((data) => {
      console.log((data as any).NonVehicleScrolling);
      let dataAfterSortingAndFiltering = (data as any).NonVehicleScrolling;
      
      let lastRow = -1;
      
      if(endRow>=data.totalcount)
      {
        lastRow=data.totalcount;
       
      }

      let rowsThisPage = dataAfterSortingAndFiltering;
      /* console.log(
        'asking for ' + startRow + ' to ' + endRow
      + ' lastrow ' + lastRow); */
      console.log('rowsThisPage',rowsThisPage);
      successCallback(rowsThisPage, lastRow);

      },
    error => failCallback())
  };
  private destroy = new Subject<void>();
  constructor(private http: HttpClient, private router: Router, private postService: PostService, public fb: FormBuilder) {
    this.columnDefs = [
      { headerName: 'vehicleDetailNonVehUID', field: 'vehicleDetailNonVehUID', hide: true},
      { headerName: 'Make', field: 'make', editable: true, cellRenderer: 'loadingRenderer', filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Model', field: 'model', editable: true, filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Year', field: 'year', editable: true, filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Qualifier', field: 'qualifier', editable: true},
      { headerName: 'Short Description', field: 'shortDescription', editable: true, filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Part Display Header', field: 'partDisplayHeader', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true,editable: true },
    { headerName: 'Part Value 1', field: 'partValue1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Part Value 2', field: 'partValue1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Part Value 3', field: 'partValue1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Part Value 4', field: 'partValue1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Part Value 5', field: 'partValue1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true}
    ];
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      Year: ['', Validators.required],
      Qualifier: ['', Validators.required],
      ShortDescription: ['', Validators.required],
      PartDispHeader: [''],
      Partval1: [''],
      Partval2: [''],
      Partval3: [''],
      Partval4: [''],
      Partval5: [''],
    });
    this.redirectSecounds = environment.redirectSecounds;
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      sortable: true,
      resizable: true
    };
    this.components = {
      loadingRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return "<img src=\"https://www.ag-grid.com/example-assets/loading.gif\">";
        }
      },
    };
  }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    //hideSearchText();
    this.apiFlag = false;
    updatePageTitle('Lighting Guide');
    this.getMake();
  }

  getMake(): void {
    this.datas.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmake', this.datas)
      .subscribe(data => {
        // console.log(data.makeDetails);
        this.makes = (data as any).makeDetails;
      });
  }

  getModel(e): void {
    //  console.log(e.target.options[e.target.options.selectedIndex].text);
    this.datas.userUID = localStorage.getItem('user_id');
    this.vehicleData.Year =[];
    this.vehicleData.Make = '';
    this.vehicleData.Model = '';
    this.datas.PROC_TYPE = 'MODEL';
    this.datas.MAKE = e.target.options[e.target.options.selectedIndex].text;
    this.vehicleData.Make = e.target.options[e.target.options.selectedIndex].text;
    
    this.http.post<any>(this.apiURL + '/api/getmodel', this.datas)
      .subscribe(data => {
        // console.log(data);
        this.models = (data as any).ModelDetails;
      });
  }

  getYear(e): void {
    this.datas.userUID = localStorage.getItem('user_id');
    this.vehicleData.Year = [];
    this.vehicleData.Model = '';
    this.datas.PROC_TYPE = 'YEAR';
    this.datas.MODEL = e.target.value;
    this.vehicleData.Model = e.target.value;
    // console.log(this.data);
   
    this.http.post<any>(this.apiURL + '/api/getyear', this.datas)
      .subscribe(data => {
        // console.log(data);
        this.years = (data as any).yearDetails;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addVehicleModal(): void {
    this.form.reset();
    $('#modalAdd').css('display', 'block');
   // this.getOptionCountry();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setDatasource(this.dataSource);
    this.submitted = false;
  }

  sortAndFilter(allOfTheData, sortModel, filterModel): any {
    return allOfTheData;
  }

  onCellValueChanged(event): void {
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('PROC_TYPE', 'Update');
    myFormData.append('updateString', JSON.stringify(event.data));
    myFormData.append('vehicleDetailNonVehUID', event.data.vehicleDetailNonVehUID);
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/updatingnonvehicles', myFormData)
         .subscribe(data => {
          $('#text').css('display', 'none');
          if (data.return_code == 0) {
            this.successMessage = 'Updated Successfully !';
            $('#info_success').css('display', 'block');
          }
          else{
            this.successMessage = 'Update Failed !';
            $('#info_alert').css('display', 'block');
        }
    });
  }

  addLightingModal(): void {
    this.form.reset();
    $('#modalAdd').css('display', 'block');
   // this.getOptionCountry();
  }

  addLighting(): void {
    this.submitted = true;
    if (this.form.invalid) {
    return;
    }
    
    /* const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('PROC_TYPE', 'Add');
    myFormData.append('Make', this.form.value.Make);
    myFormData.append('Model', this.form.value.Model);
    myFormData.append('Year', this.form.value.Year);
    myFormData.append('qualifier', this.form.value.Qualifier);
    myFormData.append('shortdescription', this.form.value.ShortDescription ?? '');
    myFormData.append('displayheader', this.form.value.PartDispHeader ?? '');
    myFormData.append('partvalue1', this.form.value.Partval1 ?? '');
    myFormData.append('partvalue2', this.form.value.Partval2 ?? '');
    myFormData.append('partvalue3', this.form.value.Partval3 ?? '');
    myFormData.append('partvalue4', this.form.value.Partval4 ?? '');
    myFormData.append('partvalue5', this.form.value.Partval5 ?? ''); */
    //this.Adduser.make = this.form.value.Make;
    this.vehicleData.Make = this.form.value.Make != null ? this.form.value.Make : '';
    this.vehicleData.Model = this.form.value.Model  ?? '';
    this.vehicleData.Year = this.form.value.Year  ?? '';
    this.selectedYear = $('#year_list').val();
    this.vehicleData.Year = this.selectedYear;
    this.vehicleData.qualifier = this.form.value.Qualifier;
    this.vehicleData.shortdescription = this.form.value.ShortDescription;
    this.vehicleData.displayheader = this.form.value.PartDispHeader;
    this.vehicleData.partvalue1 = this.form.value.Partval1;
    this.vehicleData.partvalue2 = this.form.value.Partval2;
    this.vehicleData.partvalue3 = this.form.value.Partval3;
    this.vehicleData.partvalue4 = this.form.value.Partval4;
    this.vehicleData.partvalue5 = this.form.value.Partval5;

    this.vehicleData.userUID = localStorage.getItem('user_id');
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/addnonvehicles' , this.vehicleData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          console.log('test');
          this.successMessage = 'Lighting Guide Added Successfully !';
          $('#modalAdd').css('display', 'none');
          document.getElementById('info_success').style.display = 'block';
          //this.gridApi.refreshCells();
          this.gridApi.purgeInfiniteCache();
          this.submitted = false;
          //this.clickEvent();
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          //this.clicked = false;
          $('#modalAdd').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  cancelAdd(): void {
    $('#modalAdd').css('display', 'none');
    //this.submitted = false;
    this.form.reset();
    this.submitted = false;
  }

  close1(): void{
    this.form.reset();
    this.apiFlag = false;
  }  

}

/* export function YearValidator(control: AbstractControl): { [key: string]: boolean } | null {

  let value: number = control.value;
  if ((value < 1900) || (value > (new Date().getFullYear() + 1))) {
    return { 'invalid': true };
  }
  else {
    return null;
  }

} */

