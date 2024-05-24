import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CompanyEditCellRendererComponent } from '../company-edit-cell-renderer/company-edit-cell-renderer.component';
import { CompanyImageCellRendererComponent } from '../company-image-cell-renderer/company-image-cell-renderer.component';
import { StatictextComponent } from '../statictext/statictext.component';
import { GridOptions } from "@ag-grid-community/core";
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-managecompany',
  templateUrl: './managecompany.component.html',
  styleUrls: ['./managecompany.component.css']
})
export class ManagecompanyComponent implements OnInit {

  apiURL: any;
  imgURL: any;
  public dummy = {
    userUID: '',
    ArchStatus: ''
  }
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
    PROC_TYPE:''
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  public company = {
    userUID: null,
    companyUID : ''
  };
  states: any;
  distributors: any;
  cities: any;
  countries:any;
  regions:any;
  dummyState: string;
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
 
  companyUID: any;
  hidden_distributorUID: any;
  prevImage: any;
  modules = [ClientSideRowModelModule,CsvExportModule];
  countryName: any;
  showDropdown: boolean = true; // Boolean variable to show/hide dropdown field
  dropdownValue: any; // Value selected from dropdown
  adddropdownValuestate: string;
  adddropdownValuecity: string;
  adddropdownValueRegion: string;
  inputValueRegion: string;
  inputValueCity: string;
  inputValueState: string;
  inputValue: string; // Value entered in the input field
  columnDefs = [
    { headerName: 'Actions', field: 'companyUID', width: 120, sortable: false, filter: false,
    cellRenderer: 'companyEditCellRendererComponent',
    },
    { headerName: 'Company Name', field: 'companyName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Distributor Name', field: 'distributorName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company Country', field: 'companyCountry', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company State', field: 'companyState', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company City', field: 'companyCity', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company Region', field: 'companyRegion', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company Zipcode', field: 'companyZip', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Company Primary Contact Name', field: 'companyPrimaryContactName', width: 250, sortable: true},
    { headerName: 'Company Address', field: 'companyAddress', width: 400, sortable: true},
    { headerName: 'Company Contact Number', field: 'companyContact', width: 250, sortable: true},
    { headerName: 'Company Email', field: 'companyEmail', sortable: true},
    { headerName: 'Company Website', field: 'companyWebsite', sortable: true},
    { headerName: 'Company Image', field: 'companyImage',  tooltipField: 'companyImage',
    tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'companyImageCellRendererComponent',
     cellRenderer: 'statictextComponent'},
  ];
  rowData: any;
  tooltipShowDelay: any;
  constructor(private router: Router,private http: HttpClient, private location: Location, public fb: FormBuilder) { 
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
    companyName: ['', Validators.required],
    distributorName: ['', Validators.required],
    companyAddress: [''],
    companyCountry: [''],
    companyState: [''],
    companyCity: [''],
    companyRegion: [''],
    companyZip: [''],
    companyEmail: [''],
    companyContact: ['', Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)],
    companyImage: [''],
    companyPrimaryContact: [''],
    companyWebsite: [''],
    searchLimiter: ['']
  });

  this.editform = this.fb.group({
    companyName: ['', Validators.required],
    distributorName: ['', Validators.required],
    companyAddress: [''],
    companyCountry:[''],
    companyState: [''],
    companyCity: [''],
    companyRegion: [''],
    companyZip: [''],
    companyEmail: [''],
    companyContact: ['', Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)],
    companyImage: [''],
    companyPrimaryContact: [''],
    companyWebsite: [''],
    searchLimiter: ['']
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
    updatePageTitle('Manage Company');
    //hideSearchText();
    this.tooltipShowDelay = 0;
    this.frameworkComponents = {
     companyEditCellRendererComponent: CompanyEditCellRendererComponent,
     companyImageCellRendererComponent: CompanyImageCellRendererComponent,
     statictextComponent: StatictextComponent
    };
    this.getState();
    this.getDistributor();
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
    this.dummy.ArchStatus = '0';
    this.dummy.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getcompany', this.dummy)
          .subscribe(data => {
          if (data.return_code != 1) {
           /*let temp = '';
           temp = (data as any).StoreDetails;
           temp = temp.replace(/\\/g, '');
           temp = temp.substring(0, (temp.length - 1));
           temp = '[' + temp + ']';
           this.rowData = JSON.parse(temp);*/
           this.rowData = (data as any).companyList;
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
      this.http.post<any>(this.apiURL + '/api/getcompany', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).companyList;
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
      this.inputValueRegion = '';
    } 
    else if(this.countryName=='USA' || this.countryName=='') {
      this.showDropdown = true; 
      //$("select#stateCompany option[value=this.state.StateName]").attr('selected', 'selected');
      //$("select#cityList option[value=null]").attr('selected', 'selected');
      //$("select#regionList option[value=null]").attr('selected', 'selected');
      this.adddropdownValuestate = '';
      this.adddropdownValuecity = '';
      this.adddropdownValueRegion = '';
    }
   /*  else if(this.countryName=='') {
      $("select#stateCompany").prop('selectedIndex', 0);
      $("select#cityList").prop('selectedIndex', 0);
      $("select#regionList").prop('selectedIndex', 0);
    }  */ 
    //this.form.get('companyRegion').patchValue(this.countryName=='USA'?'':this.countryName);
    //this.form.get('companyState').patchValue(this.countryName=='USA'?null:this.countryName);
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
      this.getRegionbyStateCompany($("#stateCompany option:selected").text()); 
      
  }

  getRegionbyStateCompany(State): void {
    if(this.countryName=='USA')
    {
    if(this.midwestRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Midwest");
    }
    else if(this.mountainRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Mountain");
    }
    else if(this.westRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("West");
    }
    else if(this.southRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("South");
    }
    else if(this.southeastRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Southeast");
    }
    else if(this.southwestRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Southwest");
    }
    else if(this.northernRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Northern");
    }
     else if(this.northwestRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Northwest");
    } 
    else if(this.northeastRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("Northeast");
    } 
     else if(this.eastRegionArray.includes(State)){
     this.form.get('companyRegion').patchValue("East");
    }
    else{
     this.form.get('companyRegion').patchValue("");
    }
    }
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

  back(): void {
    this.location.back();
  }

  close1(): void{
    this.apiFlag = false;
   /*  if (this.clicked == true) {
      this.clicked = false;
    } */
   /*  this.cancelCompanyAdd();
    this.cancelCompanyEdit(); */
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

  addCompanyModal(): void{
    this.submitted = false;
    $('#modalAddCompany').css('display', 'block');
    this.form.reset();
    this.showDropdown= true;
    $("select#stateCompany").prop('selectedIndex', 0);
    $("select#cityList").prop('selectedIndex', 0);
    $("select#regionList").prop('selectedIndex', 0);
    $("select#countryList").prop('selectedIndex', 0);
    //$("select#stateCompany option[value='']").attr('selected', 'selected');
    //$("select#cityList option[value='']").attr('selected', 'selected');
    //$("select#regionList option[value='']").attr('selected', 'selected');
    //this.dropdownValue = null;

  }

  cancelCompanyAdd(): void{
    //this.submitted = false;
    $('#modalAddCompany').css('display', 'none');
  }
  cancelCompanyEdit(){
    $('#modalEditCompany').css('display', 'none'); 
    /* this.editform.reset(); */
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
    myFormData.append('companyName', this.form.value.companyName == null?"":this.form.value.companyName);
    myFormData.append('distributorUID', this.form.value.distributorName == null?"":this.form.value.distributorName);
    myFormData.append('companyAddress', this.form.value.companyAddress == null?"":this.form.value.companyAddress);
    myFormData.append('companyCountry', this.form.value.companyCountry == null?"":this.form.value.companyCountry);
    myFormData.append('companyStateUID', this.form.value.companyState == null?"":this.form.value.companyState);
    myFormData.append('companyCityUID', this.form.value.companyCity == null?"":this.form.value.companyCity);
    myFormData.append('companyRegion', this.form.value.companyRegion == null?"":this.form.value.companyRegion);
    myFormData.append('companyZip', this.form.value.companyZip == null?"":this.form.value.companyZip);
    myFormData.append('companyEmail', this.form.value.companyEmail == null?"":this.form.value.companyEmail);
    myFormData.append('companyContact', this.form.value.companyContact == null?"":this.form.value.companyContact);
    myFormData.append('companyImage', this.filedata);
    myFormData.append('companyPrimaryContactName', this.form.value.companyPrimaryContact== null?"":this.form.value.companyPrimaryContact);
    myFormData.append('companyWebsite', this.form.value.companyWebsite == null?"":this.form.value.companyWebsite);
    myFormData.append('searchLimit', this.form.value.searchLimiter == null?"":this.form.value.searchLimiter);
    this.http.post<any>(this.apiURL + '/api/addcompany', myFormData)
     .subscribe(data => {
       document.getElementById('text').style.display = 'none';
       if (data.return_code == 0) {
        this.successMessage = 'Company Added Successfully !';
        document.getElementById('info_success').style.display = 'block';
        $('#modalAddCompany').css('display', 'none');
        
        this.gridApi.refreshCells();
        this.clickEvent();
        setTimeout(() => {
          this.close1();
        },  this.redirectSecounds);
       }
       else{
        this.successMessage = data.errors[0];
        this.clicked = false;
        $('#modalAddCompany').css('display', 'none');
        document.getElementById('info_alert').style.display = 'block';
       }
     });
  }

  clickEditCompany(params){
    
    /* this.getCountry();
    this.getRegion();
    this.getState();
    this.getDistributor(); */
    this.filedata = '';
    this.company.companyUID = params.value;
   /*  this.company.userUID = params.value;
    this.http.post<any>(this.apiURL + '/api/editcompany/' + this.company.companyUID, this.company)
    .subscribe(data => {
    console.log(data); */
    this.editform.patchValue({
      companyName: params.data.companyName,
      companyPrimaryContact: params.data.companyPrimaryContactName != null ? params.data.companyPrimaryContactName : '',
      companyAddress:params.data.companyAddress != null ? params.data.companyAddress : '',
      companyZip: params.data.companyZip != null ? params.data.companyZip : '',
      companyEmail: params.data.companyEmail != null ? params.data.companyEmail : '',
      companyContact: params.data.companyContact != null ? params.data.companyContact : '',
      companyWebsite:params.data.companyWebsite != null ? params.data.companyWebsite : '',
      companyRegion: params.data.companyRegion != null ? params.data.companyRegion : '',
      searchLimiter: params.data.searchLimit != null ? params.data.searchLimit : ''
    });
    this.companyUID =params.data.companyUID != null ? params.data.companyUID : '';
    // this.editform.get('companyCountry').patchValue(params.data.companyCountry != null ? params.data.companyCountry : '');
    // if (params.data.companyStateUID != null) {
    // this.editform.get('companyState').patchValue(params.data.companyStateUID != null ? params.data.companyStateUID : '');
    // }
    // this.editform.get('companyRegion').patchValue(params.data.companyRegion != null ? params.data.companyRegion : '');
    // if (params.data.companyStateUID != null ) {
    // this.getCityDynamic(params.data.companyStateUID);
    // this.editform.get('companyCity').patchValue(params.data.companyCityUID != '' ? params.data.companyCityUID : '');
    // }
    if (params.data.companyCountry != null) {
      this.editform.get('companyCountry').patchValue(params.data.companyCountry != null ? params.data.companyCountry : '');
      if (params.data.companyCountry=='Canada' &&  this.inputValueState != '' &&  this.inputValueCity != '' &&  this.inputValueRegion != '' ) {
         
        this.editform.get('companyState').patchValue(params.data.companyState != null ? params.data.companyState : '' );
        this.editform.get('companyRegion').patchValue(params.data.companyRegion != null ? params.data.companyRegion : '');
        this.editform.get('companyCity').patchValue(params.data.companyCity != null ? params.data.companyCity : '');
        this.showDropdown = false;
      } 
      else if(params.data.companyCountry=='USA' ||  this.adddropdownValuestate != '' ||  this.adddropdownValuecity != '' ||  this.adddropdownValueRegion || '') {
        
        this.editform.get('companyState').patchValue(params.data.companyStateUID != null ? params.data.companyStateUID : '');
        this.editform.get('companyRegion').patchValue(params.data.companyRegion != null ? params.data.companyRegion : '');
        this.getCityDynamic(params.data.companyStateUID);
        this.editform.get('companyCity').patchValue(params.data.companyCityUID != null ? params.data.companyCityUID : '');
        this.showDropdown = true; 
      }
      }
    if(params.data.distributorUID != null) {
      this.editform.get('distributorName').patchValue(params.data.distributorUID);
      this.hidden_distributorUID=params.data.distributorUID;
    }
   
    if (params.data.companyImage != null && params.data.companyImage != '')
    {
      this.prevImage = this.imgURL + 'storage/app/public/uploads/company/' + params.data.companyImage;
    }
  /* }); */
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
    myFormData.append('companyUID', this.companyUID);
    myFormData.append('companyName', this.editform.value.companyName);
    myFormData.append('companyPrimaryContactName', this.editform.value.companyPrimaryContact);
    myFormData.append('distributorUID', this.editform.value.distributorName);
    myFormData.append('companyAddress', this.editform.value.companyAddress);
    myFormData.append('companyCountry', this.editform.value.companyCountry);
    myFormData.append('companyStateUID', this.editform.value.companyState);
    myFormData.append('companyCityUID', this.editform.value.companyCity);
    myFormData.append('companyRegion', this.editform.value.companyRegion);
    myFormData.append('companyZip', this.editform.value.companyZip);
    myFormData.append('companyImage', this.filedata);
    myFormData.append('companyEmail', this.editform.value.companyEmail);
    myFormData.append('companyWebsite', this.editform.value.companyWebsite);
    myFormData.append('companyContact', this.editform.value.companyContact);
    myFormData.append('hidden_distributorUID', this.hidden_distributorUID);
    myFormData.append('searchLimit', this.editform.value.searchLimiter)
    console.log(this.editform); 
    this.http.post<any>(this.apiURL + '/api/updatecompany', myFormData)
     .subscribe(data => {
      this.submitted = false;
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Company Edited Successfully !';
        $('#modalEditCompany').css('display', 'none');
        document.getElementById('info_success').style.display = 'block';
        this.gridApi.refreshCells();
        this.clickEvent();
        setTimeout(() => {
          this.close1();
        }, this.redirectSecounds);
       }
       else{
        this.successMessage = data.errors[0];
        this.clicked = false;
        $('#modalEditCompany').css('display', 'none');
        document.getElementById('info_alert').style.display = 'block';
       }
     });
  }

  

}

