import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-editdistributor',
  templateUrl: './editdistributor.component.html',
  styleUrls: ['./editdistributor.component.css']
})
export class EditdistributorComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  public distributor = {
    distributorUID : '',
    userUID: ''

  };
  form: FormGroup;
  editcountryform: FormGroup;
  submitted = false;
  public State = {
    StateUID: null
  };
  public City = {
    StateUID: null,
    CountyUID: null
  };
  countries:any;
  regions:any;
  states: any;
  cities: any;
  dummy: string;
  stateUID: any;
  distributorUID: any;
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
 
  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.countryName='';
    this.redirectSecounds = environment.redirectSecounds;
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
    updatePageTitle('Edit Distributor');
    this.getCountry();
    this.getRegion();
    this.getState();
    this.clicked = false;
    this.apiFlag = false;
    this.apiFlagModal = false;
    this.filedata = '';
    this.route.params.subscribe(params => {
      this.distributor.distributorUID = params['id'];
    });
    this.distributor.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/editdistributor', this.distributor)
    .subscribe(data => {
      this.form.patchValue({
        distributorName: data.distributorDetails.distributorName,
        distributorPrimaryContact: data.distributorDetails.distributorPrimaryContactName != null ? data.distributorDetails.distributorPrimaryContactName : '',
        distributorAddress: data.distributorDetails.distributorAddress != null ? data.distributorDetails.distributorAddress : '',
        distributorZip: data.distributorDetails.distributorZip != null ? data.distributorDetails.distributorZip : '',
        distributorEmail: data.distributorDetails.distributorEmail != null ? data.distributorDetails.distributorEmail : '',
        distributorContact: data.distributorDetails.distributorContact != null ? data.distributorDetails.distributorContact : '',
        distributorWebsite: data.distributorDetails.distributorWebsite != null ? data.distributorDetails.distributorWebsite : ''
      });
      this.form.get('distributorCountry').patchValue(data.distributorDetails.distributorCountry != null ? data.distributorDetails.distributorCountry : '');
      this.form.get('distributorRegion').patchValue(data.distributorDetails.distributorRegion != null ? data.distributorDetails.distributorRegion : '');
      this.form.get('distributorState').patchValue(data.distributorDetails.distributorStateUID != null ? data.distributorDetails.distributorStateUID : '');
      this.getRegionbyStateDistributor($("#stateDistributor option:selected").text()); 
      this.distributorUID = data.distributorDetails.distributorUID != null ? data.distributorDetails.distributorUID : '';
      if (data.distributorDetails.distributorStateUID != null) {
        this.getCityDynamic(data.distributorDetails.distributorStateUID);
        this.form.get('distributorCity').patchValue(data.distributorDetails.distributorCityUID != null ? data.distributorDetails.distributorCityUID : '');
      }
      if (data.distributorDetails.distributorImage != null && data.distributorDetails.distributorImage != '')
      {
        this.prevImage = this.imgURL + 'storage/app/public/uploads/distributor/' + data.distributorDetails.distributorImage;
      }
    });
  }
  countryOnchange(e): void {
    this.countryName=e.target.value;
    this.form.get('distributorRegion').patchValue(this.countryName=='USA'?'':this.countryName);
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
      this.getRegionbyStateDistributor($("#stateDistributor option:selected").text()); 
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
     this.form.get('distributorRegion').patchValue("");
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
    myFormData.append('distributorUID', this.distributorUID);
    console.log(this.form);
    this.http.post<any>(this.apiURL + '/api/updatedistributor', myFormData)
     .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Distributor Edited Successfully !';
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

