import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { StoreEditCellRendererComponent } from '../store-edit-cell-renderer/store-edit-cell-renderer.component';
import { StoreImageCellRendererComponent } from '../store-image-cell-renderer/store-image-cell-renderer.component';
import { StatictextComponent } from '../statictext/statictext.component';
import { GridOptions } from "@ag-grid-community/core";
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-managestores',
  templateUrl: './managestores.component.html',
  styleUrls: ['./managestores.component.css']
})
export class ManagestoresComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  public store = {
    storeUID : ''
  };
  public dummy = {
    userUID: '',
    ArchStatus: ''
  };
  storesFlag: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  gridOptions: any;
  redirectSecounds: any;
  form: FormGroup;
  editform: FormGroup;
  countryform: FormGroup;
  filedata: any;
  submitted = false;
  public State = {
    StateUID: null
  };
  public distID = {
    userUID: null,
    PROC_TYPE: ''
  };
  public compID = {
    userUID: null,
    distributorUID: null,
    PROC_TYPE: ''
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  distributors: any;
  company: any;
  states: any;
  cities: any;
  countries:any;
  regions:any;
  dummyState: string;
  stateUID: any;
  clicked: any;
  apiFlag: any;
  apiFlagModal: any;
  successMessage: any;
  storeUID: any;
  storeImage: any;
  prevImage: any;
  midwestRegionArray:String[];
  mountainRegionArray:String[];
  westRegionArray:String[];
  southRegionArray:String[];
  southeastRegionArray:String[];
  southwestRegionArray:String[];
  northernRegionArray:String[];
  northwestRegionArray:String[];
  northeastRegionArray:String[];
  eastRegionArray:String[];
  countryName:any;
  modules = [ClientSideRowModelModule,CsvExportModule];
  showDropdown: boolean = true; // Boolean variable to show/hide dropdown field
  dropdownValue: any; // Value selected from dropdown
  adddropdownValuestate: string;
  adddropdownValuecity: string;
  adddropdownValueRegion: string;
  inputValue: string; // Value entered in the input field 
  inputValueState: string;
  inputValueCity: string;
  inputValueRegion: string;
  columnDefs = [
    { headerName: 'Actions', field: 'storeUID', width: 120, sortable: false, filter: false,
    cellRenderer: 'storeEditCellRendererComponent',
    },
    { headerName: 'Store Name', field: 'storeName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor Name', field: 'distributorName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company Name', field: 'companyName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Store Country', field: 'storeCountry', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Store State', field: 'storeState', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Store Region', field: 'storeRegion', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Store City', field: 'storeCity', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Store Zipcode', field: 'storeZipcode', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Store Primary Contact Name', field: 'storePrimaryContactName', width: 250, sortable: true},
    { headerName: 'Store Address', field: 'storeAddress', width: 400, sortable: true},
    { headerName: 'Store Contact Number', field: 'storeContact', width: 250, sortable: true},
    { headerName: 'Store Email', field: 'storeEmail', sortable: true},
    { headerName: 'Store Website', field: 'storeWebsite', sortable: true},
    { headerName: 'Store Image', field: 'storeImage',  tooltipField: 'storeImage',
    tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'storeImageCellRendererComponent',
     cellRenderer: 'statictextComponent'},
  ];
  rowData: any;
  tooltipShowDelay: any;
  constructor(private http: HttpClient, private router: Router,public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  this.redirectSecounds = environment.redirectSecounds;
  this.countryName='';
  //this.StateName='';
  this.form = this.fb.group({
    storeName: ['', Validators.required],
    distributorName: ['', Validators.required],
    companyName: ['', Validators.required],
    storeAddress: [''],
    storeCountry: [''],
    storeState: [''],
    storeCity: [''],
    storeRegion: [''],
    storeZipcode: [''],
    storeImage: [''],
    storeEmail: [''],
    storeContact: [''],
    storePrimaryContact: [''],
    storeWebsite: ['']
  });
  this.editform = this.fb.group({
    storeName: ['', Validators.required],
    distributorName: ['', Validators.required],
    companyName: ['', Validators.required],
    storeAddress: [''],
    storeCountry: [''],
    storeState: [''],
    storeCity: [''],
    storeRegion: [''],
    storeZipcode: [''],
    storeImage: [''],
    storeEmail: [''],
    storeContact: [''],
    storePrimaryContact: [''],
    storeWebsite: ['']
  });
  this.countryform = this.fb.group({
    countryName: ['', Validators.required]
  });
  this.midwestRegionArray=['Missouri', 'Kansas', 'Nebraska','Iowa', 'Illinois', 'Indiana', 'Ohio']
  this.mountainRegionArray=['Colorado', 'Idaho', 'Montana', 'Utah', 'Wyoming']
  this.westRegionArray=['California', 'Nevada']
  this.southRegionArray=['Louisiana', 'Mississippi', 'Oklahoma', 'Texas', 'Arkansas']
  this.southeastRegionArray=['Alabama', 'Florida', 'Georgia']
  this.southwestRegionArray=['Arizona', 'New Mexico']
  this.northernRegionArray=['Minnesota', 'Michigan', 'North Dakota', 'South Dakota', 'Wisconsin']
  this.northwestRegionArray=['Oregon', 'Washington']
  this.northeastRegionArray=['Connecticut', 'Delaware', 'District of Columbia', 'Maine', 'Maryland', 'Massachusetts', 'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Vermont']
  this.eastRegionArray=['North Carolina', 'South Carolina', 'Tennessee', 'Kentucky', 'Virginia', 'West Virginia']
   }

  get f(): any { return this.form.controls; }
  get c(): any { return this.countryform.controls; }
  get e(): any { return this.editform.controls; }

   ngOnInit(): void {
    updatePageTitle('Manage Stores');
    //hideSearchText();
    this.tooltipShowDelay = 0;
    this.storesFlag = false;
    this.frameworkComponents = {
     storeEditCellRendererComponent: StoreEditCellRendererComponent,
     storeImageCellRendererComponent: StoreImageCellRendererComponent,
     statictextComponent: StatictextComponent
    };
    this.getCountry();
  this.getRegion();
  this.getState();
  this.getDistributor();
    /* $("select#countryindex").prop('selectedIndex', 0);
    $("select#stateindex").prop('selectedIndex', 0);
    $("select#cityindex").prop('selectedIndex', 0);
    $("select#regionindex").prop('selectedIndex', 0); */
 }

onGridReady(params): void {
 this.gridApi = params.api;
 this.gridColumnApi = params.columnApi;
 this.dummy.ArchStatus = '0';
 this.dummy.userUID = localStorage.getItem('user_id');
 this.http.post<any>(this.apiURL + '/api/getstores', this.dummy)
       .subscribe(data => {
       this.rowData = (data as any).StoreDetails;
       this.storesFlag = true;
       if (data.return_code != 1) {
        /*let temp = '';
        temp = (data as any).StoreDetails;
        temp = temp.replace(/\\/g, '');
        temp = temp.substring(0, (temp.length - 1));
        temp = '[' + temp + ']';
        this.rowData = JSON.parse(temp);*/
        this.rowData = (data as any).StoreDetails;
      } else {
        this.rowData = [];
      }
 });
}

clickEvent(): void {
  if($('#archive').prop('checked')){
    this.dummy.ArchStatus = '1';
  }
  else{
    this.dummy.ArchStatus = '0';
  }
  this.dummy.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getstores', this.dummy)
    .subscribe(data => {
        this.rowData = (data as any).StoreDetails;
        this.gridApi.setRowData(this.rowData); 
     });
 }

 onBtnExport() {
  this.gridApi.exportDataAsCsv();
}

quickSearch(): void {
 this.gridApi.setQuickFilter(this.searchValue);
}

countryOnchange(e): void {
this.countryName=e.target.value;
    if (this.countryName=='Canada' || this.countryName=='') {
      this.showDropdown = false; 
      this.inputValueState = '';
      this.inputValueCity = '';
      this.inputValueRegion = ''
    } 
    else if(this.countryName=='USA' || this.countryName=='') {
      this.showDropdown = true; 
      this.adddropdownValuestate = '';
      this.adddropdownValuecity = '';
      this.adddropdownValueRegion = '';
    }
    //this.form.get('storeRegion').patchValue(this.countryName=='USA'?'':this.countryName);
}

getCountry():void{
  this.http.post<any>(this.apiURL + '/api/getallcountrylist', {})
    .subscribe(data => {
      this.countries = data;
    });
  }

getRegion():void{
this.http.post<any>(this.apiURL + '/api/getallregionlist', {})
  .subscribe(data => {
    this.regions = data;
  });
} 

getState(): void {
  this.dummyState = '';
  this.http.post<any>(this.apiURL + '/api/getallstates', this.dummyState)
    .subscribe(data => {
      //if (data.return_code == 0) {
        this.states = data;
      //}
    });
}

getCity(e): void {
  //console.log($("#stateStore option:selected").text());
  this.State.StateUID = e.target.value;
  this.City.StateUID = e.target.value;
  this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.cities = (data as any).countyList;
      }
    });
    // this.getRegionbyState($("#stateStore option:selected").text(),'Store',0);
    this.getRegionbyState($("#stateindex option:selected").text(),'Store',0);
}

getDistributor(): void {
  this.distID.userUID = localStorage.getItem('user_id');
  this.distID.PROC_TYPE = 'SELECT_DISTRIBUTOR_ADD';
  this.http.post<any>(this.apiURL + '/api/getdistributorUID', this.distID)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.distributors = (data as any).distributorList;
      }
    });
}

getCompany(e): void {
  this.compID.userUID = localStorage.getItem('user_id');
  this.compID.distributorUID = e.target.value;
  this.compID.PROC_TYPE = 'SELECT_COMPANY_ADD';
  this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.company = (data as any).companyList;
        this.form.get('companyName').patchValue('');
      }
    });
}

getRegionbyState(State,type,id): void {
  if(this.countryName=='USA')
  {
  var selectedRegion;
  if(this.midwestRegionArray.includes(State)){
   selectedRegion = "Midwest";
   
  }
  else if(this.mountainRegionArray.includes(State)){
   selectedRegion = "Mountain";
  
  }
  else if(this.westRegionArray.includes(State)){
   selectedRegion = "West";
   
  }
  else if(this.southRegionArray.includes(State)){
   selectedRegion = "South";
   
  }
  else if(this.southeastRegionArray.includes(State)){
   selectedRegion = "Southeast";
   
  }
  else if(this.southwestRegionArray.includes(State)){
   selectedRegion = "Southwest";
   
  }
  else if(this.northernRegionArray.includes(State)){
   selectedRegion = "Northern";
   
  }
   else if(this.northwestRegionArray.includes(State)){
   selectedRegion = "Northwest";
   
  } 
  else if(this.northeastRegionArray.includes(State)){
   selectedRegion = "Northeast";
   
  } 
   else if(this.eastRegionArray.includes(State)){
   selectedRegion = "East";
   
  }
  else{
   selectedRegion = '';
  }
  if(type=='Store'){
   this.form.get('storeRegion').patchValue(selectedRegion);
  }
  }
}  

// back(): void {
//   this.location.back();
// }

close1(): void{
  this.apiFlag = false;
  if (this.clicked == true) {
    // this.location.back();
    this.clicked = false;
  }
}


closeModal(): void{
  this.apiFlagModal = false;
  this.cancel();
}

closeModalError(): void{
  this.apiFlagModal = false;
}

cancel():void{
  $('#myModal').css('display', 'none');
}

addStoreModal(): void{
  /* this.getCountry();
  this.getRegion();
  this.getState();
  this.getDistributor(); */
  this.submitted = false;
  $('#modalAddStore').css('display', 'block');
  this.form.reset();
  this.showDropdown= true;
  $("select#regionindex").prop('selectedIndex', 0);
    $("select#cityindex").prop('selectedIndex', 0);
    $("select#stateindex").prop('selectedIndex', 0);
    $("select#countryindex").prop('selectedIndex', 0);
    $("select#distributorsName").prop('selectedIndex', 0);
    $("select#companyindex").prop('selectedIndex', 0);
    this.countryform.reset();
}

cancelStoreAdd(){
  this.submitted = false;
  $('#modalAddStore').css('display', 'none');
}

cancelStoreEdit(){
  this.submitted = false;
  $('#modalEditStore').css('display', 'none');
}

addcountry():void {
  $('#myModal').css('display', 'block');
  this.submitted = false;
  this.countryform.reset();
  $('#myModal').css('height', document.body.scrollHeight);
}

saveCountry(): void{
  this.submitted = true;
    if (this.countryform.invalid) {
    return;
  }
  const myFormData = new FormData();
  myFormData.append('countryName', this.countryform.value.countryName);
  this.apiFlagModal = true;
  this.http.post<any>(this.apiURL + '/api/addcountry', myFormData)
   .subscribe(data => {
    if (data.return_code == 0) {
      $('#text_modal').css('display', 'none');
      this.successMessage = 'Country Added Successfully !';
      $('#info_success').css('display', 'block');
      setTimeout(() => {
        this.closeModal();
      },  this.redirectSecounds);
      this.getCountry();
      this.getRegion();
     }
     else{
      $('#text_modal').css('display', 'none');
      this.successMessage = data.err_message;
      $('#info_alert').css('display', 'block');
     }
   });
   
  }

fileEvent(e): void {
  this.filedata = e.target.files[0];
}

submitForm(): void {
  this.submitted = true;
  if (this.form.invalid) {
      return;
  }
  this.apiFlag = true;
  this.clicked = true;
  const myFormData = new FormData();
  myFormData.append('userUID', localStorage.getItem('user_id'));
  myFormData.append('storeName', this.form.value.storeName);
  myFormData.append('storePrimaryContactName', this.form.value.storePrimaryContact == null?"":this.form.value.storePrimaryContact);
  myFormData.append('distributorUID', this.form.value.distributorName == null?"":this.form.value.distributorName);
  myFormData.append('companyUID', this.form.value.companyName == null?"":this.form.value.companyName);
  myFormData.append('storeAddress', this.form.value.storeAddress == null?"":this.form.value.storeAddress);
  myFormData.append('storeCountry', this.form.value.storeCountry == null?"":this.form.value.storeCountry);
  myFormData.append('storeState', this.form.value.storeState == null?"":this.form.value.storeState);
  myFormData.append('storeCity', this.form.value.storeCity == null?"":this.form.value.storeCity);
  myFormData.append('storeRegion', this.form.value.storeRegion == null?"":this.form.value.storeRegion);
  myFormData.append('storeZipcode', this.form.value.storeZipcode == null?"":this.form.value.storeZipcode);
  myFormData.append('storeImage', this.filedata);
  myFormData.append('storeEmail', this.form.value.storeEmail == null?"":this.form.value.storeEmail);
  myFormData.append('storeContact', this.form.value.storeContact == null?"":this.form.value.storeContact);
  myFormData.append('storeWebsite', this.form.value.storeWebsite == null?"":this.form.value.storeWebsite);
  console.log(this.filedata);
  this.http.post<any>(this.apiURL + '/api/createstore', myFormData)
   .subscribe(data => {
     document.getElementById('text').style.display = 'none';
     if (data.return_code == 0) {
      this.successMessage = 'Store Added Successfully !';
      $('#modalAddStore').css('display', 'none');
      document.getElementById('info_success').style.display = 'block';
      this.gridApi.refreshCells();
      this.clickEvent();
      setTimeout(() => {
        this.close1();
      },  this.redirectSecounds);
     }
     else{
      this.successMessage = data.errors[0];
      this.clicked = false;
      $('#modalAddStore').css('display', 'none');
      document.getElementById('info_alert').style.display = 'block';
     }
   });
}

clickEditStore(params){
  /* this.getCountry();
  this.getRegion();
  this.getState();
  this.getDistributor(); */
  this.filedata = '';
  this.store.storeUID = params.value;
  this.http.post<any>(this.apiURL + '/api/editstore/' + this.store.storeUID, this.store)
  .subscribe(data => {
    console.log(data);
    this.editform.patchValue({
      storeName: data.store_details[0].storeName != null ? data.store_details[0].storeName : '',
      storeAddress: data.store_details[0].storeAddress != null ? data.store_details[0].storeAddress : '',
      storePrimaryContact: data.store_details[0].storePrimaryContactName != null ? data.store_details[0].storePrimaryContactName : '',
      storeZipcode: data.store_details[0].storeZipcode != null ? data.store_details[0].storeZipcode : '',
      storeEmail: data.store_details[0].storeEmail != null ? data.store_details[0].storeEmail : '',
      storeContact: data.store_details[0].storeContact != null ? data.store_details[0].storeContact : '',
      storeWebsite: data.store_details[0].storeWebsite != null ? data.store_details[0].storeWebsite : '',
      storeRegion: data.store_details[0].storeRegion != null ? data.store_details[0].storeRegion : ''
    });
    this.storeUID = data.store_details[0].storeUID != null ? data.store_details[0].storeUID : '';
    if (data.store_details[0].storeCountry != null) {
    this.editform.get('storeCountry').patchValue(data.store_details[0].storeCountry != null ? data.store_details[0].storeCountry : '');
    if (data.store_details[0].storeCountry=='Canada' &&  this.inputValueState != '' &&  this.inputValueCity != '' &&  this.inputValueRegion != '' ) {
       
      this.editform.get('storeState').patchValue(data.store_details[0].storeState != null ? data.store_details[0].storeState : '' );
      this.editform.get('storeRegion').patchValue(data.store_details[0].storeRegion != null ? data.store_details[0].storeRegion : '');
      this.editform.get('storeCity').patchValue(data.store_details[0].storeCity != null ? data.store_details[0].storeCity : '');
      this.showDropdown = false;
    } 
    else if(data.store_details[0].storeCountry=='USA' ||  this.adddropdownValuestate != '' ||  this.adddropdownValuecity != '' ||  this.adddropdownValueRegion || '') {
      
      this.editform.get('storeState').patchValue(data.store_details[0].storeStateUID != null ? data.store_details[0].storeStateUID : '');
      this.editform.get('storeRegion').patchValue(data.store_details[0].storeRegion != null ? data.store_details[0].storeRegion : '');
      this.getCityDynamic(data.store_details[0].storeStateUID);
      this.editform.get('storeCity').patchValue(data.store_details[0].storeCityUID != null ? data.store_details[0].storeCityUID : '');
      this.showDropdown = true; 
    }
    }
    /* if (data.store_details[0].storeStateUID != null) {
    this.editform.get('storeState').patchValue(data.store_details[0].storeStateUID != null ? data.store_details[0].storeStateUID : '');
    } */
    /* this.editform.get('storeRegion').patchValue(data.store_details[0].storeRegion != null ? data.store_details[0].storeRegion : ''); */
    /* if (params.data.storeStateUID != null) {
    this.getCityDynamic(params.data.storeStateUID);
    this.editform.get('storeCity').patchValue(params.data.storeCityUID != null ? params.data.storeCityUID : '');
    } */
    //this.getRegionbyState($("#stateStore option:selected").text(),'Store',0);
    if (data.store_details[0].distributorUID != null) {
      this.editform.get('distributorName').patchValue(data.store_details[0].distributorUID);
    }
    
    if (data.store_details[0].distributorUID != null && data.store_details[0].companyUID != null) {
      this.getCompanyDynamic(data.store_details[0].distributorUID);
      this.editform.get('companyName').patchValue(data.store_details[0].companyUID);
    }
    if (data.store_details[0].storeImage != null && data.store_details[0].storeImage != '')
    {
      this.prevImage = this.imgURL + 'storage/app/public/uploads/store/' + data.store_details[0].storeImage;
    }
  });
}

getCityDynamic(val): void {
  this.State.StateUID = val;
  this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
    .subscribe(data => {
      if (data.return_code == 0) {
      this.cities = (data as any).countyList;
      }
    });
  }

 getCompanyDynamic(val): void {
  this.compID.distributorUID = val;
  this.compID.userUID = localStorage.getItem('user_id');
  this.compID.PROC_TYPE = 'SELECT_COMPANY_ALL';
  this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
    .subscribe(data => {
      if (data.return_code == 0) {
      this.company = (data as any).companyList;
      }
    });
}

editSubmitForm(): void {
  this.submitted = true;
  if (this.editform.invalid) {
      return;
  }
  this.apiFlag = true;
  this.clicked = true;
  const myFormData = new FormData();
  myFormData.append('userUID', localStorage.getItem('user_id'));
  myFormData.append('storeName', this.editform.value.storeName);
  myFormData.append('storePrimaryContactName', this.editform.value.storePrimaryContact);
  myFormData.append('distributorUID', this.editform.value.distributorName);
  myFormData.append('companyUID', this.editform.value.companyName);
  myFormData.append('storeAddress', this.editform.value.storeAddress);
  myFormData.append('storeCountry', this.editform.value.storeCountry);
  myFormData.append('storeState', this.editform.value.storeState);
  myFormData.append('storeCity', this.editform.value.storeCity);
  myFormData.append('storeRegion', this.editform.value.storeRegion);
  myFormData.append('storeZipcode', this.editform.value.storeZipcode);
  myFormData.append('storeImage', this.filedata);
  myFormData.append('storeEmail', this.editform.value.storeEmail);
  myFormData.append('storeContact', this.editform.value.storeContact);
  myFormData.append('storeWebsite', this.editform.value.storeWebsite);
  myFormData.append('storeUID', this.storeUID);
  console.log(this.form);
  console.log(this.filedata);
  this.http.post<any>(this.apiURL + '/api/updatestore', myFormData)
   .subscribe(data => {
     document.getElementById('text').style.display = 'none';
     if (data.return_code == 0) {
      this.successMessage = 'Store Edited Successfully !';
      $('#modalEditStore').css('display', 'none');
      document.getElementById('info_success').style.display = 'block';
      this.gridApi.refreshCells();
      this.clickEvent();
      setTimeout(() => {
        this.close1();
      }, this.redirectSecounds);
     }
     else{
      this.successMessage = data.errors;
      this.clicked = false;
      $('#modalEditStore').css('display', 'none');
      document.getElementById('info_alert').style.display = 'block';
     }
   });
}

}

