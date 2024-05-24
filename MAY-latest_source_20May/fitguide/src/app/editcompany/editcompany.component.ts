import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css']
})
export class EditcompanyComponent implements OnInit {

  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  public company = {
    companyUID : '',
    userUID: ''
  };
  public distID = {
    userUID: null,
    PROC_TYPE: ''
  };
  form: FormGroup;
  editcountryform: FormGroup;
  submitted = false;
  public State = {
    StateUID: null
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  countries:any;
  regions:any;
  states: any;
  cities: any;
  dummy: string;
  companyUID: any;
  distributors: any;
  distributorUID: any;
  hidden_distributorUID: any;
  storeImage: any;
  clicked: any;
  apiFlag: any;
  apiFlagModal: any;
  successMessage: any;
  prevImage: any;
  filedata: any;
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
  //StateName:any;
  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.countryName='';
    //this.StateName='';
    this.form = this.fb.group({
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
      companyWebsite: ['']
    });
    this.editcountryform = this.fb.group({
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
  get e(): any { return this.editcountryform.controls; }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  ngOnInit(): void {
    updatePageTitle('Edit Company');
    this.getCountry();
    this.getRegion();
    this.getState();
    this.getDistributor();
    this.clicked = false;
    this.apiFlag = false;
    this.apiFlagModal = false;
    this.filedata = '';
    this.route.params.subscribe(params => {
      this.company.companyUID = params['id'];
    });
    this.company.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/editcompany', this.company)
    .subscribe(data => {
      this.form.patchValue({
        companyName: data.companyDetails[0].companyName,
        companyPrimaryContact: data.companyDetails[0].companyPrimaryContactName != null ? data.companyDetails[0].companyPrimaryContactName : '',
        companyAddress: data.companyDetails[0].companyAddress != null ? data.companyDetails[0].companyAddress : '',
        companyZip: data.companyDetails[0].companyZip != null ? data.companyDetails[0].companyZip : '',
        companyEmail: data.companyDetails[0].companyEmail != null ? data.companyDetails[0].companyEmail : '',
        companyContact: data.companyDetails[0].companyContact != null ? data.companyDetails[0].companyContact : '',
        companyWebsite: data.companyDetails[0].companyWebsite != null ? data.companyDetails[0].companyWebsite : '',
        companyRegion: data.companyDetails[0].companyRegion != null ? data.companyDetails[0].companyRegion : ''
      });
      this.form.get('companyCountry').patchValue(data.companyDetails[0].companyCountry != null ? data.companyDetails[0].companyCountry : '');
      this.form.get('companyState').patchValue(data.companyDetails[0].companyStateUID != null ? data.companyDetails[0].companyStateUID : '');
      //this.getRegionbyStateCompany($("#stateCompany option:selected").text());
      this.form.get('companyRegion').patchValue(data.companyDetails[0].companyRegion != null ? data.companyDetails[0].companyRegion : '');
      this.companyUID = data.companyDetails[0].companyUID != null ? data.companyDetails[0].companyUID : '';
      if(data.companyDetails[0].distributorUID != null) {
        this.form.get('distributorName').patchValue(data.companyDetails[0].distributorUID);
        this.hidden_distributorUID=data.companyDetails[0].distributorUID;
      }
      if (data.companyDetails[0].companyStateUID != null) {
      this.getCityDynamic(data.companyDetails[0].companyStateUID);
      this.form.get('companyCity').patchValue(data.companyDetails[0].companyCityUID != null ? data.companyDetails[0].companyCityUID : '');
      }
      if (data.companyDetails[0].companyImage != null && data.companyDetails[0].companyImage != '')
      {
        this.prevImage = this.imgURL + 'storage/app/public/uploads/company/' + data.companyDetails[0].companyImage;
      }
    });
  }

  countryOnchange(e): void {
    this.countryName=e.target.value;
    this.form.get('companyRegion').patchValue(this.countryName=='USA'?'':this.countryName);
    //this.form.get('distributorState').patchValue(this.countryName=='USA'?'':this.StateName);
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
    this.dummy = '';
    this.http.post<any>(this.apiURL + '/api/getallstates', this.dummy)
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
    this.distID.PROC_TYPE =  'SELECT_DISTRIBUTOR_EDIT';
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
    if (this.clicked == true) {
      this.location.back();
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

  addcountry():void {
    $('#myModal').css('display', 'block');
    this.submitted = false;
    this.editcountryform.reset();
    $('#myModal').css('height', document.body.scrollHeight);
  }

  saveCountry(): void{
    this.submitted = true;
      if (this.editcountryform.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('countryName', this.editcountryform.value.countryName);
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

  submitForm(): void {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('companyUID', this.companyUID);
    myFormData.append('companyName', this.form.value.companyName);
    myFormData.append('companyPrimaryContactName', this.form.value.companyPrimaryContact);
    myFormData.append('distributorUID', this.form.value.distributorName);
    myFormData.append('companyAddress', this.form.value.companyAddress);
    myFormData.append('companyCountry', this.form.value.companyCountry);
    myFormData.append('companyStateUID', this.form.value.companyState);
    myFormData.append('companyCityUID', this.form.value.companyCity);
    myFormData.append('companyRegion', this.form.value.companyRegion);
    myFormData.append('companyZip', this.form.value.companyZip);
    myFormData.append('companyImage', this.filedata);
    myFormData.append('companyEmail', this.form.value.companyEmail);
    myFormData.append('companyWebsite', this.form.value.companyWebsite);
    myFormData.append('companyContact', this.form.value.companyContact);
    myFormData.append('hidden_distributorUID', this.hidden_distributorUID);
    console.log(this.form); 
    this.http.post<any>(this.apiURL + '/api/updatecompany', myFormData)
     .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Company Edited Successfully !';
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

}

