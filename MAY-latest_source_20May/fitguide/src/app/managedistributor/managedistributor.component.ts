import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { DistributorEditCellRendererComponent } from '../distributor-edit-cell-renderer/distributor-edit-cell-renderer.component';
import { DistributorImageCellRendererComponent } from '../distributor-image-cell-renderer/distributor-image-cell-renderer.component';
import { StatictextComponent } from '../statictext/statictext.component';
import { GridOptions } from "@ag-grid-community/core";
import { CsvExportModule } from '@ag-grid-community/csv-export';
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-managedistributor',
  templateUrl: './managedistributor.component.html',
  styleUrls: ['./managedistributor.component.css']
})
export class ManagedistributorComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  public dummy = {
    userUID: '',
    ArchStatus: ''
  }
  dummyState: string;
  gridOptions: any;
  searchValue: any;
  form: FormGroup;
  editform: FormGroup;
  countryform: FormGroup;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  filedata: any;
  submitted = false;
  public State = {
    StateUID: null
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  states: any;
  cities: any;
  countries:any;
  regions:any;
  stateUID: any;
  clicked: any;
  apiFlag: any;
  apiFlagModal: any;
  successMessage: any;
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
  distributorUID: any;
  prevImage: any;
  public Addcountry = {
    countryName: null,
  };
  public distributor = {
    distributorUID : '',
    userUID: ''

  };
  modules = [ClientSideRowModelModule,CsvExportModule];

  columnDefs = [
    { headerName: 'Actions', field: 'distributorUID', width: 120, sortable: false, filter: false,
    cellRenderer: 'distributorEditCellRendererComponent',
    },
    { headerName: 'Distributor Name', field: 'distributorName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor State', field: 'distributorState', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor City', field: 'distributorCity', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor Region', field: 'distributorRegion', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor Zipcode', field: 'distributorZip', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor Primary Contact Name', field: 'distributorPrimaryContactName', width: 250, sortable: true},
    { headerName: 'Distributor Address', field: 'distributorAddress', width: 400, sortable: true},
    { headerName: 'Distributor Contact Number', field: 'distributorContact', width: 250, sortable: true},
    { headerName: 'Distributor Email', field: 'distributorEmail', sortable: true},
    { headerName: 'Distributor Website', field: 'distributorWebsite', sortable: true},
    { headerName: 'Distributor Image', field: 'distributorImage',  tooltipField: 'distributorImage',
    tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'distributorImageCellRendererComponent',
     cellRenderer: 'statictextComponent'},
  ];
  rowData: any;
  tooltipShowDelay: any;
  constructor(private http: HttpClient, private router: Router, public fb: FormBuilder) { 
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.countryName='';
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  this.form = this.fb.group({
    distributorName: ['', Validators.required],
    distributorPrimaryContact: [''],
    distributorAddress: [''],
    distributorCountry: [''],
    distributorState: [''],
    distributorCity: [''],
    distributorRegion: [''],
    distributorZip: [''],
    distributorEmail: [''],
    distributorContact: ['', Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)],
    distributorImage: [''],
    distributorWebsite: ['']
  });
  this.editform = this.fb.group({
    distributorName: ['', Validators.required],
    distributorPrimaryContact: [''],
    distributorAddress: [''],
    distributorCountry: [''],
    distributorState: [''],
    distributorCity: [''],
    distributorRegion: [''],
    distributorZip: [''],
    distributorEmail: [''],
    distributorContact: ['', Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)],
    distributorImage: [''],
    distributorWebsite: ['']
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
    updatePageTitle('Manage Distributor');
    //hideSearchText();
    this.tooltipShowDelay = 0;
    this.frameworkComponents = {
     distributorEditCellRendererComponent: DistributorEditCellRendererComponent,
     distributorImageCellRendererComponent: DistributorImageCellRendererComponent,
     statictextComponent: StatictextComponent
    };
    this.getState();
    this.filedata = '';
    this.clicked = false;
    this.apiFlag = false;
    this.apiFlagModal = false;
    this.getCountry();
    this.getRegion();
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.dummy.userUID = localStorage.getItem('user_id');
    this.dummy.ArchStatus = '0';
    this.http.post<any>(this.apiURL + '/api/getdistributor', this.dummy)
          .subscribe(data => {
          console.log(data);
          if (data.return_code != 1) {
           /*let temp = '';
           temp = (data as any).StoreDetails;
           temp = temp.replace(/\\/g, '');
           temp = temp.substring(0, (temp.length - 1));
           temp = '[' + temp + ']';
           this.rowData = JSON.parse(temp);*/
           this.rowData = (data as any).distributorList;
         } else {
           this.rowData = [];
         }
    });
   }

refreshGrid(){
  this.dummy.userUID = localStorage.getItem('user_id');
  this.dummy.ArchStatus = '0';
  this.http.post<any>(this.apiURL + '/api/getdistributor', this.dummy)
        .subscribe(data => {
        console.log(data);
        if (data.return_code != 1) {
         /*let temp = '';
         temp = (data as any).StoreDetails;
         temp = temp.replace(/\\/g, '');
         temp = temp.substring(0, (temp.length - 1));
         temp = '[' + temp + ']';
         this.rowData = JSON.parse(temp);*/
         this.rowData = (data as any).distributorList;
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
      this.http.post<any>(this.apiURL + '/api/getdistributor', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).distributorList;
          this.gridApi.setRowData(this.rowData); 
       });
   }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
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
    this.State.StateUID = e.target.value;
    this.City.StateUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.cities = (data as any).countyList;
        }
      });
      this.getRegionbyStateDistributor($("#stateDistributor option:selected").text()); 
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

  getRegionbyStateDistributor(State): void {
    if(this.countryName=='USA')
    {
      if(this.midwestRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Midwest");
       }
       else if(this.mountainRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Mountain");
       }
       else if(this.westRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("West");
       }
       else if(this.southRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("South");
       }
       else if(this.southeastRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Southeast");
       }
       else if(this.southwestRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Southwest");
       }
       else if(this.northernRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Northern");
       }
        else if(this.northwestRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Northwest");
       } 
       else if(this.northeastRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("Northeast");
       } 
        else if(this.eastRegionArray.includes(State)){
        this.form.get('distributorRegion').patchValue("East");
       }
       else{
        this.form.get('distributorRegion').patchValue('');
       }
    }
    
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

countryOnchange(e): void {
  this.countryName=e.target.value;
  this.form.get('distributorRegion').patchValue(this.countryName=='USA'?'':this.countryName);
}

addcountry():void {
  $('#myModal').css('display', 'block');
  this.submitted = false;
  this.countryform.reset();
  $('#myModal').css('height', document.body.scrollHeight);
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
  myFormData.append('distributorName', this.form.value.distributorName);
  myFormData.append('distributorPrimaryContactName', this.form.value.distributorPrimaryContact);
  myFormData.append('distributorAddress', this.form.value.distributorAddress);
  myFormData.append('distributorCountry', this.form.value.distributorCountry);
  myFormData.append('distributorStateUID', this.form.value.distributorState);
  myFormData.append('distributorCityUID', this.form.value.distributorCity);
  myFormData.append('distributorRegion', this.form.value.distributorRegion);
  myFormData.append('distributorZip', this.form.value.distributorZip);
  myFormData.append('distributorEmail', this.form.value.distributorEmail);
  myFormData.append('distributorContact', this.form.value.distributorContact);
  myFormData.append('distributorImage', this.filedata);
  myFormData.append('distributorWebsite', this.form.value.distributorWebsite);
  console.log(this.filedata);
  this.http.post<any>(this.apiURL + '/api/adddistributor', myFormData)
   .subscribe(data => {
     document.getElementById('text').style.display = 'none';
     if (data.return_code == 0) {
      this.successMessage = 'Distributed Added Successfully !';
      $('#myModal').css('display', 'none');
      document.getElementById('info_success').style.display = 'block';
      this.gridApi.refreshCells();
      this.refreshGrid();
      setTimeout(() => {
        this.close1();
      },  this.redirectSecounds);
     }
     else{
      this.successMessage = data.errors[0];
      this.clicked = false;
      $('#myModal').css('display', 'none');
      document.getElementById('info_alert').style.display = 'block';
     }
   });
}

clickDistributorEdit(params):void{
console.log(params);
this.editform.patchValue({
  distributorName: params.data.distributorName,
  distributorPrimaryContact: params.data.distributorPrimaryContactName != null ? params.data.distributorPrimaryContactName : '',
  distributorAddress: params.data.distributorAddress != null ? params.data.distributorAddress : '',
  distributorZip: params.data.distributorZip != null ? params.data.distributorZip : '',
  distributorEmail: params.data.distributorEmail != null ? params.data.distributorEmail : '',
  distributorContact: params.data.distributorContact != null ? params.data.distributorContact : '',
  distributorWebsite: params.data.distributorWebsite != null ? params.data.distributorWebsite : ''
});
this.editform.get('distributorCountry').patchValue(params.data.distributorCountry != null ? params.data.distributorCountry : '');
this.editform.get('distributorRegion').patchValue(params.data.distributorRegion != null ? params.data.distributorRegion : '');
this.editform.get('distributorState').patchValue(params.data.distributorStateUID != null ? params.data.distributorStateUID : '');
this.getRegionbyStateDistributor($("#stateDistributor option:selected").text()); 
this.distributorUID = params.data.distributorUID != null ? params.data.distributorUID : '';
if (params.data.distributorStateUID != null) {
  this.getCityDynamic(params.data.distributorStateUID);
  this.editform.get('distributorCity').patchValue(params.data.distributorCityUID != null ? params.data.distributorCityUID : '');
}
if (params.data.distributorImage != null && params.data.distributorImage != '')
{
  this.prevImage = this.imgURL + 'storage/app/public/uploads/distributor/' + params.data.distributorImage;
}
}

editSubmitForm(): void {
  this.submitted = true;
  console.log(this.form.value);
  if (this.editform.invalid) {
      return;
  }
  this.apiFlag = true;
  this.clicked = true;
  const myFormData = new FormData();
  myFormData.append('userUID', localStorage.getItem('user_id'));
  myFormData.append('distributorName', this.editform.value.distributorName);
  myFormData.append('distributorPrimaryContactName', this.editform.value.distributorPrimaryContact);
  myFormData.append('distributorAddress', this.editform.value.distributorAddress);
  myFormData.append('distributorCountry', this.editform.value.distributorCountry);
  myFormData.append('distributorStateUID', this.editform.value.distributorState);
  myFormData.append('distributorCityUID', this.editform.value.distributorCity);
  myFormData.append('distributorRegion', this.editform.value.distributorRegion);
  myFormData.append('distributorZip', this.editform.value.distributorZip);
  myFormData.append('distributorEmail', this.editform.value.distributorEmail);
  myFormData.append('distributorContact', this.editform.value.distributorContact);
  myFormData.append('distributorImage', this.filedata);
  myFormData.append('distributorWebsite', this.editform.value.distributorWebsite);
  myFormData.append('distributorUID', this.distributorUID);
  this.http.post<any>(this.apiURL + '/api/updatedistributor', myFormData)
   .subscribe(data => {
    this.submitted = false;
    document.getElementById('text').style.display = 'none';
    if (data.return_code == 0) {
      this.successMessage = 'Distributor Edited Successfully !';
      $('#modalEditDistributor').css('display', 'none');
      document.getElementById('info_success').style.display = 'block';
      this.gridApi.refreshCells();
      this.refreshGrid();
      setTimeout(() => {
        this.close1();
      }, this.redirectSecounds);
     }
     else{
      this.successMessage = data.errors[0];
      this.clicked = false;
      $('#modalEditDistributor').css('display', 'none');
      document.getElementById('info_alert').style.display = 'block';
     }
   });
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


close1(): void{
  this.apiFlag = false;
  if (this.clicked == true) {
    this.clicked = false;
  }
  this.cancelDistributorAdd();
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

cancelDistributorAdd(): void {
  $('#modalAddDistributor').css('display', 'none');
  /* this.apiFlag = false;
  if (this.clicked == true) {
    this.clicked = false;
  } */
  this.form.reset();
  $("select#countryList").prop('selectedIndex', 0);
  $("select#stateDistributor").prop('selectedIndex', 0);
  $("select#cityList").prop('selectedIndex', 0);
  $("select#regionList").prop('selectedIndex', 0);
  
}

back(): void {
  // this.location.back();
}

addDistributorModal(): void{
  this.submitted = false;
  $("select#countryList").prop('selectedIndex', 0);
  $("select#stateDistributor").prop('selectedIndex', 0);
  $("select#cityList").prop('selectedIndex', 0);
  $("select#regionList").prop('selectedIndex', 0);
  $('#modalAddDistributor').css('display', 'block');
}

cancelDistributorEdit():void{
  $('#modalEditDistributor').css('display', 'none');
}

}

