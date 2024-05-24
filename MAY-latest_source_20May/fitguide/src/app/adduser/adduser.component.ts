import { Component, OnInit, OnDestroy, Type, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
declare var $: any;
declare var addOptions: any;
declare var getOptions: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  apiURL: any;
  redirectSecounds: any;  
  public role = {
    roleUID: null,
    userUID: null
  };
  public menuRole = {
    roleUID: null,
    userUID: null
  };
   public branch = {
     userUID: '',
     storeUID: '',
  };
  public distID = {
    userUID: null,
    PROC_TYPE: ''
  };
  public compID = {
    userUID: null,
    distributorUID: null,
    PROC_TYPE: null
  };
  public dummy = {
    userUID: null,
    distributorUID: null,
    companyUID: null,
    ArchStatus: '',
    PROC_TYPE: ''
  };
  public State = {
    StateUID: null
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  gridApi: any;
  distributors: any;
  company: any;
  states: any;
  cities: any;
  country:any;
  stateUID: any;
  params: any;
  filedata: any;
  submitted = false;
  apiFlagModal: any;
  countries : any;
  checkboxcountries:any;
  // dropdowncountries: any;
  //storedropdowncountries:any;
  regions:any;
  countyUID: any;
  public Adduser = {
      userUID: null,
      roleUID: null,
      email: null,
      firstName: null,
      lastName: null,
      password : null,
      phone: null,
      userName: null,
      distributorUID: null,
      companyUID: null,
      menuUID: null,
      brandUID: null,
      sectionUID: null,
      singleStoreUID: null,
      storeUID: [],
      isDistributorAds: null,
      isCompanyPic: null,
      isCompanyNotes: null,
      isAdminPic: null,
      isAdminNotes: null,
      istrail: null,
      isBannerAds:null,
      trailDate: null,
      terms: null,
      userNotes:[],
      countryUID: null,
      pricing:null,
  };
  public Adddistributor = {
    userUID: null,
    distributorName: null,
    distributorPrimaryContact: null,
    distributorAddress: null,
    distributorState: null,
    distributorCity: null,
    distributorRegion : null,
    distributorZip: null,
    distributorEmail: null,
    distributorUID: null,
    distributorContact: null,
    distributorImage: null,
    distributorWebsite: null
};
public Addcompany = {
  userUID: null,
  companyName: null,
  companyAddress: null,
  companyStateUID: null,
  companyCityUID: null,
  companyRegion: null,
  companyZip : null,
  companyEmail: null,
  companyContact: null,
  distributorUID: null,
  companyImage: null,
  companyPrimaryContactName: null,
  companyWebsite: null,
  distributorName: null
};
public Addstore = {
  userUID: null,
  storeName: null,
  distributorName: null,
  companyName: null,
  storeAddress: null,
  storeState: null,
  storeCity: null,
  storeRegion: null,
  storeZipcode : null,
  storeEmail: null,
  storeContact: null,
  storeImage: null,
  storePrimaryContact: null,
  storeWebsite: null
  };
  public sectionGroup = {
  section1: null,
  section2: null,
  section3: null,
  section4: null,
  section5: null,
  section6: null,
  section7: null,
  section8: null,
  section9: null,
  section10: null,
  section11: null,
  distributorName: null,
  companyName: null
  };
  formErrorSection1: any;
  formErrorSection2: any;
  formErrorSection3: any;
  formErrorSection4: any;
  formErrorSection5: any;
  formErrorSection6: any;
  formErrorSection7: any;
  menus: any;
  sections: any;
  brands: any;
  stores: any;
  storeUID: any;
  sectionList: string;
  roles: any;
  apiFlag: any;
  successMessage: any;
  clicked: any;
  dateFlag: any;
  currentDate: any;
  trialSetDate: any;
  userNotes:any;
  countryUID: any;
  userNoteCount:any;
  userCountryChecked: any = [];
  isCountryChecked = true;
  dummyState: string;
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
  storeinputValueState: string;
  storeinputValueCity:string;
  storeinputValueRegion:string;
  storedropdownValueRegion:string;
  storedropdownValuecity:string;
  storedropdownValuestate:string;  
  countryName: any;
  showDropdown: boolean = true; // Boolean variable to show/hide dropdown field
  adddropdownValuestate: string;
  adddropdownValuecity: string;
  adddropdownValueRegion: string;
  inputValueRegion: string;
  inputValueCity: string;
  inputValueState: string;
  form: FormGroup;
  countryform: FormGroup;
  distributorform: FormGroup;
  storeform: FormGroup;
  constructor(private http: HttpClient, private location: Location, private datePipe: DatePipe, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.countryName = '';
    this.userNotes=[];
    this.checkboxcountries=[];    
    this.distributorform = this.fb.group({
      distributorName: ['', Validators.required],
      distributorPrimaryContact: [''],
      distributorAddress: [''],
      distributorState: [''],
      distributorCity: [''],
      distributorRegion: [''],
      distributorZip: [''],
      distributorEmail: [''],
      distributorContact: [''],
      distributorImage: [''],
      distributorWebsite: ['']
    });
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
  this.countryform = this.fb.group({
    countryName: ['', Validators.required]
  });
  this.storeform = this.fb.group({
    storeName: ['', Validators.required],
    distributorName: ['', Validators.required],
    companyName:['', Validators.required],
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

  get d(): any { return this.distributorform.controls; }
  get f(): any { return this.form.controls; }
  get c(): any { return this.countryform.controls; }
  get s(): any { return this.storeform.controls; }  

  ngOnInit(): void {
    updatePageTitle('Add User');
    this.getOptionBrand();
    this.getOptionSection();
    this.getDistributor();
    this.getvehicleCountry();
    this.getOptionCountry();
    this.dateFlag = false;
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + 5);
    this.trialSetDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    this.role.roleUID = localStorage.getItem('role_id');
    this.role.userUID = localStorage.getItem('user_id');
    this.dummy.userUID = localStorage.getItem('user_id');
    this.roleDetails();
    this.apiFlag = false;
    this.clicked = false;
    this.apiFlagModal = false;
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.formErrorSection3 = false;
    this.formErrorSection4 = false;
    this.formErrorSection5 = false;
    this.formErrorSection6 = false;
    //this.formErrorSection7 = false;
   /*  this.getState();
    this.getCountry();
    this.getStoreCountry();
    this.getRegion(); */
    this.filedata = '';
    this.getState();
    this.getCountry();
    this.getRegion();
  }

  countryOnchange(e): void {
    this.countryName=e.target.value;
    if (this.countryName=='Canada' || this.countryName=='') {
      this.showDropdown = false; 
      this.inputValueState = '';
      this.inputValueCity = '';
      this.inputValueRegion = '';
      this.storeinputValueState = '';
      this.storeinputValueCity = '';
      this.storeinputValueRegion = '';
    } 
    else if(this.countryName=='USA' || this.countryName=='') {
      this.showDropdown = true; 
      //$("select#stateCompany option[value=this.state.StateName]").attr('selected', 'selected');
      //$("select#cityList option[value=null]").attr('selected', 'selected');
      //$("select#regionList option[value=null]").attr('selected', 'selected');
      this.adddropdownValuestate = '';
      this.adddropdownValuecity = '';
      this.adddropdownValueRegion = '';
      this.storedropdownValueRegion = '';
      this.storedropdownValuecity = ''
      this.storedropdownValuestate = '';
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
      this.getRegionbyStateStore($("#stateStore option:selected").text()); 
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

   getRegionbyStateStore(State): void {
    if(this.countryName=='USA')
    {
    if(this.midwestRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Midwest");
    }
    else if(this.mountainRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Mountain");
    }
    else if(this.westRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("West");
    }
    else if(this.southRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("South");
    }
    else if(this.southeastRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Southeast");
    }
    else if(this.southwestRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Southwest");
    }
    else if(this.northernRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Northern");
    }
     else if(this.northwestRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Northwest");
    } 
    else if(this.northeastRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("Northeast");
    } 
     else if(this.eastRegionArray.includes(State)){
     this.storeform.get('storeRegion').patchValue("East");
    }
    else{
     this.storeform.get('storeRegion').patchValue("");
    }
    }
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

  addStoreModal(): void {
    this.submitted = false;
    $('#modalAddStore').css('display', 'block');
    this.form.reset();
    this.showDropdown= true;
    $("select#stateStore").prop('selectedIndex', 0);
    $("select#cityListstore").prop('selectedIndex', 0);
    $("select#regionListstore").prop('selectedIndex', 0);
    $("select#countryListstore").prop('selectedIndex', 0);
    //$("select#stateCompany option[value='']").attr('selected', 'selected');
    //$("select#cityList option[value='']").attr('selected', 'selected');
    //$("select#regionList option[value='']").attr('selected', 'selected');
    //this.dropdownValue = null;
  }

  cancelStoreAdd(): void {
    $('#modalAddStore').css('display', 'none');
  }

  cancelCompanyAdd(): void{
    $('#modalAddCompany').css('display', 'none');
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

  
  submitForm(): void {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.apiFlagModal = true;
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
       if (data.return_code == 0) {
        $('#text_modal').css('display', 'none');
        this.successMessage = 'Company Added Successfully !';
        document.getElementById('info_successadd').style.display = 'block';
        $('#modalAddCompany').css('display', 'none');
        $("select#distributorName").prop('selectedIndex', 1);       
        this.sectionGroup.distributorName = '5';
        this.getCompanyDynamic();
        $("select#companyName").prop('selectedIndex', 0);
        $("select#section11").prop('selectedIndex', 0);
        setTimeout(() => {
          this.closeModal();
        },  this.redirectSecounds);
       }
       else{
        $('#text_modal').css('display', 'none');
        this.successMessage = data.errors[0];
        $('#modalAddCompany').css('display', 'none');
        document.getElementById('info_alertadd').style.display = 'block';
       }
     });
  }

  getCompanyDynamic(): void {
    this.compID.userUID = localStorage.getItem('user_id');
    this.compID.PROC_TYPE = 'SELECT_COMPANY_ADD';
    this.compID.distributorUID = '5';
    //this.dummy.distributorUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
      .subscribe(data => {
        this.company = (data as any).companyList;
        this.sectionGroup.companyName = '';
        this.storeform.get('companyName').patchValue('');
      });
  }

  saveStore(): void{
    this.submitted = true;
    if (this.storeform.invalid) {
        return;
    }
    this.apiFlagModal = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('storeName', this.storeform.value.storeName);
    myFormData.append('storePrimaryContactName', this.storeform.value.storePrimaryContact);
    myFormData.append('distributorUID', this.storeform.value.distributorName);
    myFormData.append('companyUID', this.storeform.value.companyName);
    myFormData.append('storeAddress', this.storeform.value.storeAddress);
    myFormData.append('storeState', this.storeform.value.storeState);
    myFormData.append('storeCity', this.storeform.value.storeCity);
    myFormData.append('storeRegion', this.storeform.value.storeRegion);
    myFormData.append('storeZipcode', this.storeform.value.storeZipcode);
    myFormData.append('storeImage', this.filedata);
    myFormData.append('storeEmail', this.storeform.value.storeEmail);
    myFormData.append('storeContact', this.storeform.value.storeContact);
    myFormData.append('storeWebsite', this.storeform.value.storeWebsite);
    this.apiFlagModal = true;
    this.http.post<any>(this.apiURL + '/api/createstore', myFormData)
    .subscribe(data => {
        if (data.return_code == 0) {
          $('#text_modal').css('display', 'none');
          this.successMessage = 'Store Added Successfully !';
          $('#info_successadd').css('display', 'block');
          $('#modalAddStore').css('display', 'none');
          $("select#distributorName").prop('selectedIndex', 1);        
          this.sectionGroup.distributorName = '5';
          this.getCompanyDynamic();
          $("select#companyName").prop('selectedIndex', 0);
          $("select#section11").prop('selectedIndex', 0);
          setTimeout(() => {
            this.closeModal();
          },  this.redirectSecounds);
       }
          $('#text_modal').css('display', 'none');
          this.successMessage = data.errors[0];
          $('#modalAddStore').css('display', 'none');
          $('#info_alertadd').css('display', 'block');
     });
  }

  getOptionStoresDynamic(): void {
    this.http.post<any>(this.apiURL + '/api/getstorebycomapanyuidanddistributoruid', this.dummy)
      .subscribe(data => {
        if (data.return_code != 1) {
          // let temp = '';
          // temp = (data as any).StoreDetails;
          // temp = temp.replace(/\\/g, '');
          // temp = temp.substring(0, (temp.length - 1));
          // temp = '[' + temp + ']';
          this.stores = (data as any).StoreDetails;
        }
        else {
          this.stores = [];
          this.Adduser.singleStoreUID = '';
        }
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
        $('#info_successadd').css('display', 'block');
        $('#myModal').css('display', 'none');
        setTimeout(() => {
          this.closeModal();
        },  this.redirectSecounds);
        this.getCountry();
        this.getRegion();
       }
       else{
        $('#text_modal').css('display', 'none');
        $('#myModal').css('display', 'none');
        this.successMessage = data.err_message;
        $('#info_alertadd').css('display', 'block');
       }
     });
    }
 

  getOptionCountry(): void {
    this.http.post<any>(this.apiURL + '/api/getvehiclecountrylist', '')
      .subscribe(data => {
        const tempCountries = (data as any);
        this.checkboxcountries = tempCountries.map((country) => {
          if (country.countryName === "USA") {
            country.checked = true;
            this.userCountryChecked.push(country.countryUID);
          }
          else
            country.checked = false;
          return country;
        })
      });
  }



  onCheckboxChange(country, event) {
    if (event.target.checked === true) {
      this.userCountryChecked.push(country.countryUID);
    } else {
      const index = this.userCountryChecked.findIndex(list => list == country.countryUID);
      if (index != null && index != undefined)
        this.userCountryChecked.splice(index, 1);
    }
    const isChecked = this.checkboxcountries.find(country => country.checked === true)
    if (isChecked && this.isCountryChecked === false)
      this.isCountryChecked = true;
    console.log(this.userCountryChecked);

  }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  saveDistributor(): void{
    this.submitted = true;
      if (this.distributorform.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('distributorName', this.distributorform.value.distributorName);
    myFormData.append('distributorPrimaryContactName', this.distributorform.value.distributorPrimaryContact);
    myFormData.append('distributorAddress', this.distributorform.value.distributorAddress);
    myFormData.append('distributorStateUID', this.distributorform.value.distributorState);
    myFormData.append('distributorCityUID', this.distributorform.value.distributorCity);
    myFormData.append('distributorRegion', this.distributorform.value.distributorRegion);
    myFormData.append('distributorZip', this.distributorform.value.distributorZip);
    myFormData.append('distributorEmail', this.distributorform.value.distributorEmail);
    myFormData.append('distributorContact', this.distributorform.value.distributorContact);
    myFormData.append('distributorImage', this.filedata);
    myFormData.append('distributorWebsite', this.distributorform.value.distributorWebsite);
    console.log(this.filedata);
    this.apiFlagModal = true;
    this.http.post<any>(this.apiURL + '/api/adddistributor', myFormData)
     .subscribe(data => {
      if (data.return_code == 0) {
        $('#text_modal').css('display', 'none');
        $('#myDistributorModal').css('display', 'none');
        this.successMessage = 'Distributed Added Successfully !';
        $('#info_successadd').css('display', 'block');
        $("select#distributorName").prop('selectedIndex', 0);
        $("select#companyName").prop('selectedIndex', 0);
        $("select#section11").prop('selectedIndex', 0);
        setTimeout(() => {
          this.closeModal();
        },  this.redirectSecounds);
       }
       else{
        $('#text_modal').css('display', 'none');
        $('#myDistributorModal').css('display', 'none');
        this.successMessage = data.errors[0];
        $('#info_alertadd').css('display', 'block');
       }
     });
    }

  

  adddistributor():void {
    $('#myDistributorModal').css('display', 'block');
    this.submitted = false;
    this.distributorform.reset();
    this.distributorform.patchValue({
      distributorState: [''],
      distributorCity: ['']
    });
    $('#myDistributorModal').css('height', document.body.scrollHeight);
  }

  

  back(): void {
      this.location.back();
  }

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
  }

  closeModal(): void{
    this.apiFlagModal = false;
    this.cancel();
    //this.getDistributor();
  }

  closeModalError(): void{
    this.apiFlagModal = false;
  }

  cancel():void{
    $('#myModal').css('display', 'none');
    $('#myDistributorModal').css('display', 'none');
    $('#modalAddStore').css('display', 'none');
    $('#modalAddCompany').css('display', 'none');
  }

  

 /*  setTerms(): void {
    if ($('#terms').prop('checked') === true)
      {
        this.formErrorSection7 = false;
      }
      else {
        this.formErrorSection7 = true;
      }
  } */

  setDate(): void {
    if ($('#istrail').prop('checked') === true)
    {
      this.dateFlag = true;
    }
    else {
      this.dateFlag = false;
    }
  }

  addUser(f: NgForm): void {
    const isChecked = this.checkboxcountries.find(country => country.checked === true)
   if (f.invalid) {
      /*if ($('#terms').prop('checked') === true)
      {
        this.formErrorSection7 = false;
      }
      else {
        this.formErrorSection7 = true;
        return;
      }*/
      if (!isChecked || isChecked == undefined)
      this.isCountryChecked = false;
    return;
    }
    if (isChecked)
    this.isCountryChecked = true;
  else {
    this.isCountryChecked = false;
    return;
  }
    /*if ($('#terms').prop('checked') === true)
      {
        this.formErrorSection7 = false;
      }
      else {
        this.formErrorSection7 = true;
        return;
      } */
    this.Adduser.userUID = localStorage.getItem('user_id');
    this.Adduser.roleUID = f.value.roleUID;
    /*if (this.Adduser.roleUID == 6)
    {
    this.Adduser.storebranchUID = getOptions('section10');

    if (this.Adduser.storebranchUID.length == 0)
    {
      this.formErrorSection5 = true;
      return;
    }

    }*/
    /*if(this.Adduser.roleUID != 6 && this.Adduser.roleUID != 7)
    {
    this.Adduser.storeUID = getOptions('section2');
    for (let i = 0; i < this.Adduser.storeUID.length; i++)
    {
      this.Adduser.storeUID[i] = this.Adduser.storeUID[i].replace(/\'/gi,'');
    }
    if (this.Adduser.storeUID.length == 0)
    {
      this.formErrorSection1 = true;
      return;
    }
    }*/
    this.Adduser.menuUID =  getOptions('section4');
    this.Adduser.menuUID =  this.Adduser.menuUID.map(function(e) { return parseInt(e.replace(/'/g, '')); });
    this.Adduser.brandUID = getOptions('section6');
    this.Adduser.sectionUID = getOptions('section8');
    this.Adduser.email = f.value.email;
    this.Adduser.firstName = f.value.firstName;
    this.Adduser.lastName = f.value.lastName;
    this.Adduser.password = f.value.password;
    this.Adduser.phone = f.value.phone;
    this.Adduser.userName = f.value.userName;
    this.Adduser.distributorUID = f.value.distributorName;
    this.Adduser.companyUID = f.value.companyName;
    this.Adduser.countryUID = this.userCountryChecked;
   
    if (this.Adduser.menuUID.length == 0)
    {
      this.formErrorSection2 = true;
      return;
    }
    if (this.Adduser.brandUID.length == 0)
    {
      this.formErrorSection3 = true;
      return;
    }
    if (this.Adduser.sectionUID.length == 0)
    {
      this.formErrorSection4 = true;
      return;
    }   
    // Checkbox Values
    if ($('#isDistributorAds').prop('checked') === true)
    {
      this.Adduser.isDistributorAds = 1;
    }
    else
    {
      this.Adduser.isDistributorAds = 0;
    }
    if ($('#isCompanyPic').prop('checked') === true)
    {
      this.Adduser.isCompanyPic = 1;
    }
    else
    {
      this.Adduser.isCompanyPic = 0;
    }
    if ($('#isCompanyNotes').prop('checked') === true)
    {
      this.Adduser.isCompanyNotes = 1;
    }
    else
    {
      this.Adduser.isCompanyNotes = 0;
    }
    if ($('#isAdminPic').prop('checked') === true)
    {
      this.Adduser.isAdminPic = 1;
    }
    else
    {
      this.Adduser.isAdminPic = 0;
    }
    if ($('#isAdminNotes').prop('checked') === true)
    {
      this.Adduser.isAdminNotes = 1;
    }
    else
    {
      this.Adduser.isAdminNotes = 0;
    }
    if ($('#istrail').prop('checked') === true)
    {
      this.Adduser.istrail = 1;
      this.Adduser.trailDate = this.trialSetDate;
    }
    else
    {
      this.Adduser.istrail = 0;
      this.Adduser.trailDate = '';
    }
    if ($('#addPricing').prop('checked') === true) {
      this.Adduser.pricing = 1;
    }
    else {
      this.Adduser.pricing = 0;
    }
    if (this.Adduser.roleUID != 5 && this.Adduser.roleUID != 6 && this.Adduser.roleUID != 7) {
      this.Adduser.pricing = null;
    }
    if ($('#terms').prop('checked') === true)
    {
      this.Adduser.terms = 1;
    }
    else
    {
      this.Adduser.terms = 0;
    }
    if ($('#addBanner').prop('checked') === true) {
      this.Adduser.isBannerAds = 1;
    }
    else {
      this.Adduser.isBannerAds = 0;
    }
    this.Adduser.userNotes=this.userNotes;
    //console.log(this.Adduser);
    this.apiFlag = true;
    this.clicked = true;
    this.http.post<any>(this.apiURL + '/api/adduser', this.Adduser)
        .subscribe(data => {
          document.getElementById('text').style.display = 'none';
          if (data.return_code == 0) {
            this.successMessage = 'User Added Successfully !';
            document.getElementById('info_success').style.display = 'block';
            setTimeout(() => {
              this.close1();
            }, this.redirectSecounds);
          }
          else{
            this.successMessage = data.errors[0];
            this.clicked = false;
            document.getElementById('info_alert').style.display = 'block';
          }

    });
  }

  swap(s1, s2): void {
    addOptions(s1, s2);
    if (s1 === 'section1') {
      this.formErrorSection1 = false;
    }
    if (s1 === 'section3') {
      this.formErrorSection2 = false;
    }
    if (s1 === 'section5') {
      this.formErrorSection3 = false;
    }
    if (s1 === 'section7') {
      this.formErrorSection4 = false;
    }
    if (s1 === 'sectionbranch') {
      this.formErrorSection5 = false;
    }
  }

 

  getvehicleCountry(): void {
    
    /* this.Adduser.countryUID = this.countryUID;
    console.log(this.countryUID); */
    
    this.http.post<any>(this.apiURL + '/api/getvehiclecountrylist ', {})
      .subscribe(data => {
          this.country = (data as any).countryName;
          //this.country = (data as any).countryName;
          console.log(data);
        
      });
  }

  getDistributor(): void {
    this.distID.userUID = localStorage.getItem('user_id');
    this.distID.PROC_TYPE = 'SELECT_DISTRIBUTOR_ADD';
    this.http.post<any>(this.apiURL + '/api/getdistributorUID', this.distID)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.distributors = (data as any).distributorList;
          this.sectionGroup.distributorName = '';
        }
        else {
          this.distributors = [];
          this.sectionGroup.distributorName = '';
        }
        this.getOptionBrand();
      });
  }

  getCompany(e): void {
    this.compID.userUID = localStorage.getItem('user_id');
    this.compID.PROC_TYPE = 'SELECT_COMPANY_ADD';
    this.compID.distributorUID = e.target.value;
    //this.dummy.distributorUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
      .subscribe(data => {
        this.company = (data as any).companyList;
        this.sectionGroup.companyName = '';
        this.storeform.get('companyName').patchValue('');
      });
  }

  getOptionStores(e): void {
    this.dummy.userUID = localStorage.getItem('user_id');
   this.dummy.companyUID = e.target.value;
   this.dummy.distributorUID = this.compID.distributorUID;
   this.http.post<any>(this.apiURL + '/api/getstorebycomapanyuidanddistributoruid', this.dummy)
    .subscribe(data => {
    if (data.return_code != 1) {
      // let temp = '';
      // temp = (data as any).StoreDetails;
      // temp = temp.replace(/\\/g, '');
      // temp = temp.substring(0, (temp.length - 1));
      // temp = '[' + temp + ']';
     // console.log(temp);
      this.stores = (data as any).StoreDetails;
      this.sectionGroup.section11 = '';
    } else {
      this.stores = [];
      this.sectionGroup.section11 = '';
    }
    });
  }

  getOptionBranch(e): void {
    this.Adduser.singleStoreUID = e.target.value;
  }


  roleDetails(): void {
    this.http.post<any>(this.apiURL + '/api/getrolesbyroleid', this.role)
      .subscribe(data => {
       this.roles = (data as any).partDetails;
    });
  }

  getOptionMenu(): void {
    this.menuRole.roleUID = this.Adduser.roleUID;
    this.menuRole.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmenubyroleid', this.menuRole)
    .subscribe(data => {
        this.menus = (data as any).menuDetails;  
    });
    $(function () {
      $('#section11').find('option:selected').prop('selected', false);
      $('#section12 option').remove();
      $('#sectionbranch option').remove();
    });
  }

  getOptionBrand(): void {
    this.dummy.ArchStatus = '0';
    this.http.post<any>(this.apiURL + '/api/getbrand', this.dummy)
      .subscribe(data => {
        this.brands = (data as any).brandDetails;
      });
  }

  getOptionSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }

  addUserNotes():void{
    var note=$('#userNoteTextArea').val();
    if(note!='')
    {
      var name=localStorage.getItem('name');
      var roleName=localStorage.getItem('roleName');
      var timestamp=getDateFormate()+' '+getDateTimeFormate();
      var user_id=localStorage.getItem('user_id');
      this.userNotes[this.userNotes.length]={name:name,roleName:roleName,timestamp:timestamp,user_id:user_id,note:note};
      $('#userNoteTextArea').val('');
    }
    
  }
  
  deleteUserNotes(n):void{
    this.userNotes.splice(n, 1);
    this.userNotes = [...this.userNotes];
  }




}

function getDateFormate()
{
  var date = new Date();
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
}
function getDateTimeFormate()
{
  var date = new Date();
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  var strTime = hours + ':' + (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ' ' + ampm;

  return strTime;
}

