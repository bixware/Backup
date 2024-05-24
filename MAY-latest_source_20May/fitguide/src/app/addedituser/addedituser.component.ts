import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
declare var $: any;
declare var addOptions: any;
declare var getOptions: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.css']
})
export class AddedituserComponent implements OnInit, AfterViewInit {
  apiURL: any;
  redirectSecounds: any;
  isReadOnly: boolean;
  countries: any;
  regions:any;
  states:any;
  cities:any;
  country:any;
  public State = {
    StateUID: null
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  dropdowncountries: any;
  Pricing:any;
  userCountryChecked: any = [];
  isCountryChecked = true;
  userPricingChecked:any;
  public user = {
    userUID: ''
  };
  public role = {
    roleUID: null,
    userUID: null
  };
  public menuRole = {
    roleUID: null,
    userUID: null
  };
  public distID = {
    userUID: null,
    PROC_TYPE: ''
  };
  public compID = {
    userUID: null,
    distributorUID: null
  };
  public dummy = {
    userUID: null,
    distributorUID: null,
    companyUID: null,
    ArchStatus: '',
    PROC_TYPE: ''
  };
  public usercredentials= {
    userUID:''
  }
  distributors: any;
  company: any;
  public name = null;
  public id = null;
  public Edituser = {
    usercredentials:'',
    userUID: null,
    roleUID: null,
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
    userName: null,
    distributorUID: null,
    companyUID: null,
    menuUID: null,
    brandUID: null,
    sectionUID: null,
    storeUID: [],
    singleStoreUID: null,
    hidden_userUID: null,
    isDistributorAds: null,
    isCompanyPic: null,
    isCompanyNotes: null,
    isAdminPic: null,
    isAdminNotes: null,
    istrail: null,
    trailDate: null,
    isBannerAds:null,
    terms: null,
    countryUID: [],
    userNotes: [],
    pricing:null
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
    sectionbranch: null,
    distributorName: null,
    companyName: null
  };
  formErrorSection1: any;
  formErrorSection2: any;
  formErrorSection3: any;
  formErrorSection4: any;
  formErrorSection5: any;
  menus: any;
  sections: any;
  brands: any;
  stores: any;
  storeUID: any;
  sectionList: string;
  brandList: string;
  roles: any;
  selectedMenus: any;
  selectedBrands: any;
  selectedSections: any;
  finalStores: any;
  finalMenus: any;
  finalBrands: any;
  finalSections: any;
  finalSeletedStores: any;
  finalSeletedMenus: any;
  finalSelectedBrands: any;
  finalSelectedSections: any;
  temp1: any;
  temp2: any;
  temp3: any;
  temp4: any;
  count: any;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  dateFlag: any;
  currentDate: any;
  trialSetDate: any;
  params: any;
  userNotes: any;
  userNoteCount: any;
  userUID: string;
  submitted = false;
  dummyState: string;
  filedata: any;
  apiFlagModal: any;
  checkboxcountries:any;
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
  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, private datePipe: DatePipe, public fb: FormBuilder) {
    this.userNotes=[];
    this.countries=[]; 
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    console.log(localStorage.getItem('role_id'));
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


  get d(): any { return this.distributorform.controls; }
  get f(): any { return this.form.controls; }
  get c(): any { return this.countryform.controls; }
  get s(): any { return this.storeform.controls; }  
 

  back(): void {
    this.location.back();
  }

  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
  }

  setDate(): void {
    if ($('#istrail').prop('checked') === true) {
      this.dateFlag = true;
    }
    else {
      this.dateFlag = false;
    }
  }

  ngOnInit(): void {
    updatePageTitle('Edit User');
    this.dateFlag = false;
    this.getOptionSection();
    this.getDistributor();
    this.getvehicleCountry();
    this.getOptionCountry();
    this.role.roleUID = localStorage.getItem('role_id');
    this.role.userUID = localStorage.getItem('user_id');
    this.dummy.userUID = localStorage.getItem('user_id');
    this.roleDetails();
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.formErrorSection3 = false;
    this.formErrorSection4 = false;
    this.formErrorSection5 = false;
    this.clicked = false;
    this.apiFlag = false;
    this.getState();
    this.getCountry();
    //this.getStoreCountry();
    this.getRegion();
    this.filedata = '';
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
    
      addStoreModal(): void{
        this.submitted = false;
        $('#modalAddStore').css('display', 'block');
        this.storeform.reset();
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

  /* saveCompany(): void{
    this.submitted = true;
    if (this.companyform.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('companyName', this.companyform.value.companyName);
    myFormData.append('distributorUID', this.companyform.value.distributorName);
    myFormData.append('companyAddress', this.companyform.value.companyAddress);
    myFormData.append('companyStateUID', this.companyform.value.companyState);
    myFormData.append('companyCityUID', this.companyform.value.companyCity);
    myFormData.append('companyRegion', this.companyform.value.companyRegion);
    myFormData.append('companyZip', this.companyform.value.companyZip);
    myFormData.append('companyEmail', this.companyform.value.companyEmail);
    myFormData.append('companyContact', this.companyform.value.companyContact);
    myFormData.append('companyImage', this.filedata);
    myFormData.append('companyPrimaryContactName', this.companyform.value.companyPrimaryContact);
    myFormData.append('companyWebsite', this.companyform.value.companyWebsite);
    this.apiFlagModal = true;
    this.http.post<any>(this.apiURL + '/api/addcompany', myFormData)
    .subscribe(data => {
      if (data.return_code == 0) {
        $('#text_modal').css('display', 'none');
        this.successMessage = 'Company Added Successfully !';
        $('#info_success').css('display', 'block');
        setTimeout(() => {
          this.closeModal();
        },  this.redirectSecounds);
       }
       else{
        $('#text_modal').css('display', 'none');
        this.successMessage = data.errors[0];
        $('#info_alert').css('display', 'block');
       }
      });
  }

  saveStore(): void{
    this.submitted = true;
    if (this.storeform.invalid) {
        return;
    }
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
          $('#info_success').css('display', 'block');
          setTimeout(() => {
            this.closeModal();
          },  this.redirectSecounds);
       }
          $('#text_modal').css('display', 'none');
          this.successMessage = data.errors[0];
          $('#info_alert').css('display', 'block');
     });
  } */

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

   
  submitForm(): void {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.apiFlagModal = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('companyName', this.form.value.companyName);
    myFormData.append('distributorUID', this.form.value.distributorName);
    myFormData.append('companyAddress', this.form.value.companyAddress);
    myFormData.append('companyCountry', this.form.value.companyCountry);
    myFormData.append('companyStateUID', this.form.value.companyState);
    myFormData.append('companyCityUID', this.form.value.companyCity);
    myFormData.append('companyRegion', this.form.value.companyRegion);
    myFormData.append('companyZip', this.form.value.companyZip);
    myFormData.append('companyEmail', this.form.value.companyEmail);
    myFormData.append('companyContact', this.form.value.companyContact);
    myFormData.append('companyImage', this.filedata);
    myFormData.append('companyPrimaryContactName', this.form.value.companyPrimaryContact);
    myFormData.append('companyWebsite', this.form.value.companyWebsite);
    myFormData.append('searchLimit', this.form.value.searchLimiter)
    this.http.post<any>(this.apiURL + '/api/addcompany', myFormData)
     .subscribe(data => {
       if (data.return_code == 0) {
        $('#text_modal').css('display', 'none');
        this.successMessage = 'Company Added Successfully !';
        $('#modalAddCompany').css('display', 'none');
        document.getElementById('info_successadd').style.display = 'block';
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

  saveStore(): void{
    this.submitted = true;
    if (this.storeform.invalid) {
        return;
    }
    this.apiFlag = true;
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
          $('#text_modal').css('display', 'none');
          $('#modalAddCompany').css('display', 'none');
          this.successMessage = data.errors[0];
          $('#info_alertadd').css('display', 'block');
     });
  }

  closeModal(): void{
    this.apiFlagModal = false;
    this.cancel();
    //this.getDistributor();
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
        $('#myModal').css('display', 'none');
        this.successMessage = 'Country Added Successfully !';
        $('#info_successadd').css('display', 'block');
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

    cancel():void{
      $('#myModal').css('display', 'none');
      $('#myDistributorModal').css('display', 'none');
      $('#modalAddStore').css('display', 'none');
      $('#modalAddCompany').css('display', 'none');
    }
    
  cancelStoreAdd(): void {
    $('#modalAddStore').css('display', 'none');
  }

  cancelCompanyAdd(): void{
    $('#modalAddCompany').css('display', 'none');
  }

  /* setTerms(): void {
    if ($('#terms').prop('checked') === true)
    {
        this.formErrorSection7 = false;
    }
    else {
        this.formErrorSection7 = true;
    }
  } */

  getDistributor(): void {
    this.distID.userUID = localStorage.getItem('user_id');
    this.distID.PROC_TYPE = 'SELECT_DISTRIBUTOR_EDIT';
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

  // getOptionCountry(): void {
  //   this.http.post<any>(this.apiURL + '/api/getvehiclecountrylist', '')
  //     .subscribe(data => {
  //       const tempCountries = (data as any);
  //       this.countries = tempCountries.map((country) => {
  //         country.checked = false;
  //         return country;
  //       })
  //     });
  // }


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

  // getvehicleCountry(): void {
  //   this.http.post<any>(this.apiURL + '/api/getvehiclecountrylist ', {})
  //     .subscribe(data => {
  //         this.country = (data as any).countryName;
  //         console.log(data);
  //       });
  // }

  
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

  getCompany(e): void {
    this.dummy.userUID = localStorage.getItem('user_id');
    //this.compID.distributorUID = e.target.value;
    this.dummy.distributorUID = e.target.value;
    this.dummy.PROC_TYPE = 'SELECT_COMPANY_ALL';
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.dummy)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.company = (data as any).companyList;
          this.sectionGroup.companyName = '';
        }
        else {
          this.company = [];
          this.sectionGroup.companyName = '';
        }
      });
  }

  getCompanyDynamic(): void {
    this.dummy.userUID = localStorage.getItem('user_id');
    //this.compID.distributorUID = e.target.value;
    this.dummy.distributorUID = '5';
    this.dummy.PROC_TYPE = 'SELECT_COMPANY_ALL';
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.dummy)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.company = (data as any).companyList;
        }
        else {
          this.company = [];
          this.sectionGroup.companyName = '';
        }
      });
  }

  getOptionBranch(e): void {
    this.Edituser.singleStoreUID = e.target.value;
  }

  getOptionStores(e): void {
    this.dummy.companyUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/getstorebycomapanyuidanddistributoruid', this.dummy)
      .subscribe(data => {
        if (data.return_code != 1) {
          // let temp = '';
          // temp = (data as any).StoreDetails;
          // temp = temp.replace(/\\/g, '');
          // temp = temp.substring(0, (temp.length - 1));
          // temp = '[' + temp + ']';
          this.stores = (data as any).StoreDetails;
          this.Edituser.singleStoreUID = '';
        }
        else {
          this.stores = [];
          this.Edituser.singleStoreUID = '';
        }
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
          this.Edituser.singleStoreUID = '';
        }
      });
  }

  getOptionBrand(): void {
    this.dummy.ArchStatus = '0';
    this.http.post<any>(this.apiURL + '/api/getbrand', this.dummy)
      .subscribe(data => {
        this.brands = (data as any).brandDetails;
        this.getOptionSection();
      });
  }

  getOptionSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
        this.getOptionCountry();
        this.getDetails();
      });
  }

  getDetails(): void {
    this.route.params.subscribe(params => {
      this.user.userUID = params['id'];
    });
    this.http.post<any>(this.apiURL + '/api/edituserlist/' + this.user.userUID, this.user)
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log(data);
          if (data.user_details.trailDate != null && data.user_details.trailDate != '') {
            this.currentDate = new Date(data.user_details.trailDate);
          }
          else {
            this.currentDate = new Date();
            this.currentDate.setDate(this.currentDate.getDate() + 5);
          }
          data.country_details.map((item) => {
            const data = this.countries.find((country) => country.countryUID === item.countryUID)
            if (data) {
              this.userCountryChecked.push(item.countryUID);
              data.checked = true;
            }
          })
          this.trialSetDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
          this.Edituser.firstName = data.user_details.firstName;
          this.Edituser.email = data.user_details.email;
          this.Edituser.userName = data.user_details.userName;
          this.Edituser.lastName = data.user_details.lastName;
          this.Edituser.phone = data.user_details.phone;
          this.Edituser.roleUID = data.user_details.roleUID;
          this.selectedMenus = [...data.menu_details];
          this.selectedBrands = [...data.brand_details];
          this.selectedSections = [...data.section_details];


          for (var i = 0; i < data.note_details.length; i++) {
            /* console.log({name:data.note_details[i]['firstName']+' '+data.note_details[i]['lastName'],roleName:data.note_details[i]['roleName'],timestamp:data.note_details[i]['timestamp'],user_id:data.note_details[i]['createdBy'],note:data.note_details[i]['note']}); */
            this.userNotes.push({ name: data.note_details[i]['firstName'] + ' ' + data.note_details[i]['lastName'], roleName: data.note_details[i]['roleName'], timestamp: data.note_details[i]['timestamp'], user_id: data.note_details[i]['createdBy'], note: data.note_details[i]['note'] });
          }

          this.Edituser.hidden_userUID = data.user_details.userUID;
          this.getOptionMenu();
          if (this.Edituser.roleUID == 4 || this.Edituser.roleUID == 5 || this.Edituser.roleUID == 6 || this.Edituser.roleUID == 7) {
            this.sectionGroup.distributorName = data.user_details.distributorUID;
            this.compID.distributorUID = data.user_details.distributorUID;
            this.dummy.distributorUID = data.user_details.distributorUID;
            if (this.Edituser.roleUID == 5 || this.Edituser.roleUID == 6 || this.Edituser.roleUID == 7) {
              this.getCompanyDynamic();
              this.sectionGroup.companyName = data.user_details.companyUID;
              this.dummy.companyUID = data.user_details.companyUID;
              this.getOptionStoresDynamic();
            }
          }
          if (this.Edituser.roleUID == 6 || this.Edituser.roleUID == 7) {
            if (data.singleStoreDetails != null) {
              this.Edituser.singleStoreUID = data.singleStoreDetails.storeUID;
            }
          }
          if (data.user_details.isDistributorAds == 1) {
            $('#isDistributorAds').prop('checked', true);
          }
          if (data.user_details.isCompanyPic == 1) {
            $('#isCompanyPic').prop('checked', true);
          }
          if (data.user_details.isCompanyNotes == 1) {
            $('#isCompanyNotes').prop('checked', true);
          }
          if (data.user_details.isAdminPic == 1) {
            $('#isAdminPic').prop('checked', true);
          }
          if (data.user_details.isAdminNotes == 1) {
            $('#isAdminNotes').prop('checked', true);
          }
          if (data.user_details.istrail == 1) {
            $('#istrail').prop('checked', true);
            this.dateFlag = true;
          }
          if (data.user_details.isBannerAds == 1) {
            $('#addBanner').prop('checked', true);
          }
          if (data.user_details.terms == 1) {
            $('#terms').prop('checked', true);
            this.Edituser.terms = 1;
          }
         
          if (data.user_details.pricing != null) {
          if (data.user_details.pricing == 1) {
            $('#addPricing').prop('checked', true);
          }
          else {
            $('#addPricing').prop('checked', false);            
          }
        }
          this.processArray();
        }
      });
  }

  getOptionMenu(): void {
    this.menuRole.roleUID = this.Edituser.roleUID;
    this.menuRole.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmenubyroleid', this.menuRole)
      .subscribe(data => {
        this.menus = (data as any).menuDetails;
        //console.log(this.menus);

        this.processMenuArray();
      });

  }

  roleDetails(): void {
    this.http.post<any>(this.apiURL + '/api/getrolesbyroleid', this.role)
      .subscribe(data => {
        this.roles = (data as any).partDetails;
      });
  }

  processMenuArray(): void {
    // Menu Section
    this.temp1 = [];
    this.temp2 = [];
    this.temp3 = [];
    this.temp4 = [];
    this.count = 0;
    for (let i = 0; i < this.menus.length; i++) {
      for (let j = 0; j < this.selectedMenus.length; j++) {
        if (this.menus[i].menuUID == this.selectedMenus[j].menuUID) {
          this.temp1.push(this.menus[i]);
          this.temp2.push(i);
          this.count++;
        }
      }
    }
    this.finalSeletedMenus = [...this.temp1];
    this.temp3 = [...this.menus];
    for (let i = 0; i < this.count; i++) {
      delete this.temp3[this.temp2[i]];
    }
    this.temp4 = this.temp3.filter(function (value, index, arr) {
      return value != undefined;
    });
    this.finalMenus = [...this.temp4];
  }

  processArray(): void {
    // Brand Section
    this.temp1 = [];
    this.temp2 = [];
    this.temp3 = [];
    this.temp4 = [];
    this.count = 0;
    for (let i = 0; i < this.brands.length; i++) {
      for (let j = 0; j < this.selectedBrands.length; j++) {
        if (this.brands[i].brandUID == this.selectedBrands[j].brandUID) {
          this.temp1.push(this.brands[i]);
          this.temp2.push(i);
          this.count++;
        }
      }
    }
    this.finalSelectedBrands = [...this.temp1];
    this.temp3 = [...this.brands];
    for (let i = 0; i < this.count; i++) {
      delete this.temp3[this.temp2[i]];
    }
    this.temp4 = this.temp3.filter(function (value, index, arr) {
      return value != undefined;
    });
    this.finalBrands = [...this.temp4];
    // Section Section
    this.temp1 = [];
    this.temp2 = [];
    this.temp3 = [];
    this.temp4 = [];
    this.count = 0;
    for (let i = 0; i < this.sections.length; i++) {
      for (let j = 0; j < this.selectedSections.length; j++) {
        if (this.sections[i].searchSectionUID == this.selectedSections[j].sectionUID) {
          this.temp1.push(this.sections[i]);
          this.temp2.push(i);
          this.count++;
        }
      }
    }
    this.finalSelectedSections = [...this.temp1];
    this.temp3 = [...this.sections];
    for (let i = 0; i < this.count; i++) {
      delete this.temp3[this.temp2[i]];
    }
    this.temp4 = this.temp3.filter(function (value, index, arr) {
      return value != undefined;
    });
    this.finalSections = [...this.temp4];


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

  editUser(f: NgForm): void {
    console.log('test');
    const isChecked = this.countries.find(country => country.checked === true)
    if (f.invalid) {
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
    this.Edituser.userUID = localStorage.getItem('user_id');
    this.Edituser.roleUID = f.value.roleUID;
    /*if(this.Edituser.roleUID ==6)
    {
    this.Edituser.storebranchUID = getOptions('section10');

    if (this.Edituser.storebranchUID.length == 0)
    {
      this.formErrorSection5 = true;
      console.log("formErrorSection5");
      return;
    }

    }*/
    /*if(this.Edituser.roleUID !=6 && this.Edituser.roleUID!=7)
    {
    this.Edituser.storeUID = getOptions('section2');
    for (let i = 0; i < this.Edituser.storeUID.length; i++)
    {
      this.Edituser.storeUID[i] = this.Edituser.storeUID[i].replace(/\'/gi,'');
    }

    if (this.Edituser.storeUID.length == 0)
    {
      this.formErrorSection1 = true;
      console.log("formErrorSection1");
      return;
    }
    }*/

    this.Edituser.menuUID = getOptions('section4');
    this.Edituser.menuUID = this.Edituser.menuUID.map(function (e) { return parseInt(e.replace(/'/g, '')); });
    this.Edituser.brandUID = getOptions('section6');
    this.Edituser.sectionUID = getOptions('section8');
    this.Edituser.email = f.value.email;
    this.Edituser.firstName = f.value.firstName;
    this.Edituser.lastName = f.value.lastName;
    this.Edituser.phone = f.value.phone;
    this.Edituser.userName = f.value.userName;
    //this.Edituser.userName = f.value.userName;
    this.Edituser.distributorUID = f.value.distributorName;
    this.Edituser.companyUID = f.value.companyName;
    this.Edituser.countryUID = this.userCountryChecked;
    if (this.Edituser.menuUID.length == 0) {
      this.formErrorSection2 = true;
      // console.log("formErrorSection2");
      return;
    }
    if (this.Edituser.brandUID.length == 0) {
      this.formErrorSection3 = true;
      // console.log("formErrorSection3");
      return;
    }
    if (this.Edituser.sectionUID.length == 0) {
      this.formErrorSection4 = true;
      // console.log("formErrorSection4");
      return;
    }
    for (let i = 0; i < this.Edituser.storeUID.length; i++) {
      this.Edituser.storeUID[i] = this.Edituser.storeUID[i].replace(/\'/gi, '');
    }
    // Checkbox Values
    if ($('#isDistributorAds').prop('checked') === true) {
      this.Edituser.isDistributorAds = 1;
    }
    else {
      this.Edituser.isDistributorAds = 0;
    }
    if ($('#isCompanyPic').prop('checked') === true) {
      this.Edituser.isCompanyPic = 1;
    }
    else {
      this.Edituser.isCompanyPic = 0;
    }
    if ($('#isCompanyNotes').prop('checked') === true) {
      this.Edituser.isCompanyNotes = 1;
    }
    else {
      this.Edituser.isCompanyNotes = 0;
    }
    if ($('#isAdminPic').prop('checked') === true) {
      this.Edituser.isAdminPic = 1;
    }
    else {
      this.Edituser.isAdminPic = 0;
    }
    if ($('#isAdminNotes').prop('checked') === true) {
      this.Edituser.isAdminNotes = 1;
    }
    else {
      this.Edituser.isAdminNotes = 0;
    }
    if ($('#istrail').prop('checked') === true) {
      this.Edituser.istrail = 1;
      this.Edituser.trailDate = this.trialSetDate;
    }
    else {
      this.Edituser.istrail = 0;
      this.Edituser.trailDate = '';
    }
    if ($('#addBanner').prop('checked') === true) {
      this.Edituser.isBannerAds = 1;
    }
    else {
      this.Edituser.isBannerAds = 0;
    }  
    if ($('#addPricing').prop('checked') === true) {
        this.Edituser.pricing = 1;
    }
    else{
        this.Edituser.pricing = 0;
    }
    if (this.Edituser.roleUID != 5 && this.Edituser.roleUID != 6 && this.Edituser.roleUID != 7) {
      this.Edituser.pricing = null;
    }
    if ($('#terms').prop('checked') === true) {
      this.Edituser.terms = 1;
    }
    else {
      this.Edituser.terms = 0;
    }
    this.apiFlag = true;
    this.clicked = true;


    this.Edituser.userNotes = this.userNotes;

    console.log(this.Edituser);
    this.http.post<any>(this.apiURL + '/api/updateuserlist', this.Edituser)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'User details has been updated successfully!';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }
  
  sendCredentials(): void {
    console.log('test');
    this.apiFlag = true;
    this.clicked = true;
    this.usercredentials.userUID = this.user.userUID;
    this.http.post<any>(this.apiURL + '/api/sendusercredentials', this.usercredentials)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'User credentials has been send successfully!';
          document.getElementById('info_success').style.display = 'block';
          // setTimeout(() => {
          //   this.close1();
          // }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
    }

  addUserNotes(): void {
    var note = $('#userNoteTextArea').val();
    if (note != '') {
      var name = localStorage.getItem('name');
      var roleName = localStorage.getItem('roleName');
      var timestamp = getDateFormate() + ' ' + getDateTimeFormate();
      var user_id = localStorage.getItem('user_id');
      this.userNotes[this.userNotes.length] = { name: name, roleName: roleName, timestamp: timestamp, user_id: user_id, note: note };
      $('#userNoteTextArea').val('');
    }

  }

  deleteUserNotes(n): void {
    this.userNotes.splice(n, 1);
    this.userNotes = [...this.userNotes];
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('role_id') == '1') {
      $("#Username").prop('readonly', false)
    }
    else {
      $("#Username").prop('readonly', true)
    }
  }


}

function getDateFormate() {
  var date = new Date();
  return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
}
function getDateTimeFormate() {
  var date = new Date();
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  var strTime = hours + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' ' + ampm;

  return strTime;
}
