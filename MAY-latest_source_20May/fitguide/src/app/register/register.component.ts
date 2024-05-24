import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { PostService } from '../post.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
declare var updatePageTitle: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  registerForm: FormGroup;
  storeForm: FormGroup;
  companyForm: FormGroup;
  filedata: any;
  filedatastore: any;
  captchaInt: string = null;
  error_msg: string = null;
  error = false;
  capserror_msg: string = null;
  title: any;
  registerFlag: any;
  emailVerifyFlag = false;
  passwordVerifyFlag = false;
  registerSuccess = false;
  registerSuccessMsg: any;
  distributors: any;
  public distID = {
    userUID: null,
    PROC_TYPE:''
  };
  public State = {
    StateUID: null
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  dummy: string;
  states: any;
  cities: any;
  month: any;
  day: any;
  hour: any;
  minute: any;
  deploymentDate: any;
  deploymentSTime: any;
  deploymentETime: any;
  deplolymentbeforeMessage: any;
  section: any;
  sfFlag: any;
  companyFlag: any;
  storeFlag1: any;
  storeFlag2: any;
  apiFlag: any;
  clicked: any;
  successMessage: any;
  submitted: boolean;
  disableFlag: boolean;
  constructor(private router: Router, private postService: PostService, private http: HttpClient, public fb: FormBuilder, private location: Location)
  {
      this.apiURL = environment.apiURL;
      this.imgURL = environment.imgURL;
      this.redirectSecounds = environment.redirectSecounds;
      this.registerForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        verifyEmail: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)]],
       /*storeName: ['', Validators.required],
        storeAddress: ['', Validators.required],
        storeState: ['', Validators.required],
        storeCity: ['', Validators.required],
        region: ['', Validators.required],
        storeZip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],*/
        userPassword: ['', Validators.required],
        verifyPassword: ['', Validators.required],
        trial: ['1', Validators.required],
      });
      this.companyForm = this.fb.group({
        companyName: [''],
        //distributorName: [''],
        companyAddress: [''],
        companyState: [''],
        companyCity: [''],
        companyZip: [''],
        companyEmail: [''],
        companyContact: [''],
        companyImage: [''],
        companyPrimaryContact: [''],
        companyWebsite: ['']
      });
      this.storeForm = this.fb.group({
        isstoreAvailable: [''],
        storeName: [''],
        //distributorName: [''],
        companyName: [''],
        storeAddress: [''],
        storeState: [''],
        storeCity: [''],
        storeZipcode: [''],
        storeImage: [''],
        storeEmail: [''],
        storeContact: [''],
        storePrimaryContact: [''],
        storeWebsite: ['']
      });
  }

  ngOnInit(): void {
    updatePageTitle('Register User');
    this.disableFlag = false;
    this.clicked = false;
    this.apiFlag = false;
    this.registerFlag = false;
    this.getState();
    this.filedata = '';
    this.submitted = false;
    this.companyFlag = false;
    this.storeFlag1 = false;
    this.storeFlag2 = false;
    this.registerFlag = true;
    this.registerSuccess = false;
    this.emailVerifyFlag = false;
    this.passwordVerifyFlag = false;
    this.registerForm.reset();
    this.storeForm.get('storeState').patchValue('');
    this.storeForm.get('storeCity').patchValue('');
    //this.registerForm.get('region').patchValue('');
    this.registerForm.get('trial').patchValue('1');
    $("#arrows").show();
    $("#previous").hide();
    $("#cf").show();
    $("#next").show();
    $("#rf").hide();
    $("#sf").hide();
    this.sfFlag = false;
    this.section = 1;
  }
  get branches(): FormArray {
    return this.storeForm.get('branches') as FormArray;
  }
  get f(): any { return this.registerForm.controls; }
  get f2(): any { return this.storeForm.controls; }
  get f3(): any { return this.companyForm.controls; }

  randomInteger = () => {
      var a = Math.ceil(Math.random() * 10) + '';
      var b = Math.ceil(Math.random() * 10) + '';
      var c = Math.ceil(Math.random() * 10) + '';
      var d = Math.ceil(Math.random() * 10) + '';
      var e = Math.ceil(Math.random() * 10) + '';
      var f = Math.ceil(Math.random() * 10) + '';
      var g = Math.ceil(Math.random() * 10) + '';
      //  this.captchaInt = a + b + c + d;
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
  }

  /* getDistributor(): void {
    this.distID.userUID = '1';
    this.distID.PROC_TYPE = 'SELECT_DISTRIBUTOR_ADD';
    this.http.post<any>(this.apiURL + '/api/getdistributorUID', this.distID)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.distributors = (data as any).distributorList;
        }
      });
  } */

  setStore(e): void {
      if($("#storeQuestion").val() == "1"){
        this.sfFlag = true;
        $("#sf").show();
        $("#storedrop").hide();
        this.storeFlag1 = false;
      }
      if($("#storeQuestion").val() == "0"){
        this.sfFlag = false;
        $("#sf").hide();
        $("#storedrop").show();
        this.Next();
        this.storeFlag1 = false;
      }      
  }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  fileEventStore(e){
    this.filedatastore = e.target.files[0];
  }

  /* register(): void {
    console.log('test');
    
  } */

  cblur(): void {
    this.companyFlag = false;
  }

  sf2blur(): void {
    this.storeFlag2 = false;
  }

  emailBlur(): void {
    this.emailVerifyFlag = false;
  }

  passBlur(): void {
    this.passwordVerifyFlag = false;
  }

  Prev(): void{
    if(this.section == 1)
    {
      this.section = 1;
    } else {
      this.section -= 1;
    } 
    switch(this.section) {
      case 1:
        $("#rf").hide();
        $("#sf").hide();
        $("#storedrop").hide();
        $("#cf").show();
        $("#previous").hide();
        $("#next").show();
        $("#rbtn").hide();
        break;
      case 2:
        $("#rf").hide();
        $("#cf").hide();
        if (this.sfFlag) {
          $("#sf").show();
          $("#storedrop").hide();
        } else {
          $("#storedrop").show();
          $("#sf").hide();
        }
        $("#previous").show();
        $("#next").show();
        $("#rbtn").hide();
        break;
      case 3:
        $("#rf").hide();
        $("#sf").hide();
        $("#cf").hide();
        $("#next").show();
        $("#rbtn").hide();
        break;
    }   
  }

  Next(): void{
    if(this.section == 3)
    {
      this.section = 3;
    } else {
      this.section += 1;
    }
    switch(this.section) {
      case 1:
        $("#rf").hide();
        $("#sf").hide();
        $("#storedrop").hide();
        $("#cf").show();
        $("#previous").hide();
        $("#rbtn").hide();
        break;
      case 2:
        $("#rf").hide();
        if (this.sfFlag) {
          $("#sf").show();
          $("#storedrop").hide();
        } else {
          $("#storedrop").show();
          $("#sf").hide();
        }
        $("#cf").hide();
        $("#previous").show();
        $("#rbtn").hide();
        break;
      case 3:
        $("#rf").show();
        $("#rbtn").show();
        $("#sf").hide();
        $("#storedrop").hide();
        $("#cf").hide();
        $("#next").hide();
        break;
    }
  }

  registerUser(): void {
    this.submitted = false;
    this.companyFlag = false;
    this.storeFlag1 = false;
    this.storeFlag2 = false;
    this.registerSuccess = false;
    if (this.companyForm.value.companyName == '') {      
      this.companyFlag = true;
      this.submitted = true;
      this.Prev();
      this.Prev();
      return;
    }
    if (this.storeForm.value.isstoreAvailable == '') {
      this.storeFlag1 = true;
      this.submitted = true;
      this.Prev();
      return;
    }
    if (this.storeForm.value.storeName == '' && this.storeFlag1 == true) {
      this.storeFlag2 = true;
      this.submitted = true;
      this.Prev();
      return;
    }
    if (this.registerForm.invalid) {
      this.submitted = true;
      return;
    }
    if (this.registerForm.value.email != this.registerForm.value.verifyEmail) {
      this.submitted = true;
      this.emailVerifyFlag = true;
      return;
    }
    if (this.registerForm.value.userPassword != this.registerForm.value.verifyPassword) {
      this.submitted = true;
      this.passwordVerifyFlag = true;
      return;
    }
    console.log(this.registerForm.value);
    const myFormData = new FormData();
    myFormData.append('firstName', this.registerForm.value.firstName);
    myFormData.append('lastName', this.registerForm.value.lastName);
    myFormData.append('email', this.registerForm.value.email);
    myFormData.append('phone', this.registerForm.value.phone);
    myFormData.append('password', this.registerForm.value.userPassword);
    myFormData.append('isTrail', this.registerForm.value.trial);
    myFormData.append('companyName', this.companyForm.value.companyName);
    //myFormData.append('distributorUID', this.companyForm.value.distributorName);
    myFormData.append('companyAddress', this.companyForm.value.companyAddress);
    myFormData.append('companyStateUID', this.companyForm.value.companyState);
    myFormData.append('companyCityUID', this.companyForm.value.companyCity);
    myFormData.append('companyZip', this.companyForm.value.companyZip);
    myFormData.append('companyEmail', this.companyForm.value.companyEmail);
    myFormData.append('companyContact', this.companyForm.value.companyContact);
    myFormData.append('companyImage', this.filedata);
    myFormData.append('companyPrimaryContactName', this.companyForm.value.companyPrimaryContact);
    myFormData.append('companyWebsite', this.companyForm.value.companyWebsite);
    myFormData.append('isstoreAvailable', this.storeForm.value.isstoreAvailable);
    myFormData.append('storeName', this.storeForm.value.storeName);
    myFormData.append('storePrimaryContactName', this.storeForm.value.storePrimaryContact);
    myFormData.append('storeAddress', this.storeForm.value.storeAddress);
    myFormData.append('storeState', this.storeForm.value.storeState);
    myFormData.append('storeCity', this.storeForm.value.storeCity);
    myFormData.append('storeZipcode', this.storeForm.value.storeZipcode);
    myFormData.append('storeImage', this.filedatastore);
    myFormData.append('storeEmail', this.storeForm.value.storeEmail);
    myFormData.append('storeContact', this.storeForm.value.storeContact);
    myFormData.append('storeWebsite', this.storeForm.value.storeWebsite);
    this.apiFlag = true;
    this.clicked = true;
    this.disableFlag = true;
    this.http.post<any>(this.apiURL + '/api/companystoreuserregistration', myFormData)
        .subscribe(data => {
          document.getElementById('text').style.display = 'none';
          if (data.return_code == 0) {
            this.successMessage = 'User Registered Sucessfully';
            this.disableFlag = false;
            document.getElementById('info_success').style.display = 'block';
            setTimeout(() => {
              this.close1();
            }, this.redirectSecounds);
          }
          else {
            this.successMessage = data.errors[0];
            this.clicked = false;
            this.disableFlag = false;
            document.getElementById('info_alert').style.display = 'block';
          }
    });
  }

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.back();
      this.clicked = false;
      location.reload();
    }
  }

  back(): void {
    this.registerFlag = false;
    this.registerSuccess = false;
    $("#arrows").hide();
    $("#rf").hide();
    $("#sf").hide();
    $("#cf").hide();
    $("#storedrop").hide();
    $("#rbtn").hide();
  }

  removeError(event: any): void {
    this.capserror_msg = '';
  }
   getuserbyCompany(): void {
   if($('#Companyuserinfo').prop('checked') === true) {

    this.registerForm.get('firstName').patchValue(this.companyForm.value.companyPrimaryContact);
    this.registerForm.get('lastName').patchValue(this.companyForm.value.companyPrimaryContact);
    this.registerForm.get('email').patchValue(this.companyForm.value.companyEmail);
    this.registerForm.get('verifyEmail').patchValue(this.companyForm.value.companyEmail);
    this.registerForm.get('phone').patchValue(this.companyForm.value.companyContact);
    this.filedatastore = this.filedata;
   } 
   else{
    this.registerForm.get('firstName').patchValue('');
    this.registerForm.get('lastName').patchValue('');
    this.registerForm.get('email').patchValue('');
    this.registerForm.get('verifyEmail').patchValue('');
    this.registerForm.get('phone').patchValue('');
    this.filedatastore = '';
   }
   }

   getStorebyCompany(): void {
    if($('#Companyinfo').prop('checked') === true) { 
     this.storeForm.get('storeName').patchValue(this.companyForm.value.companyName);
     this.storeForm.get('storeAddress').patchValue(this.companyForm.value.companyAddress);
     this.storeForm.get('storePrimaryContact').patchValue(this.companyForm.value.companyPrimaryContact);
     this.storeForm.get('storeWebsite').patchValue(this.companyForm.value.companyWebsite);
     this.storeForm.get('storeState').patchValue(this.companyForm.value.companyState);
     this.storeForm.get('storeCity').patchValue(this.companyForm.value.companyCity);
     this.storeForm.get('storeZipcode').patchValue(this.companyForm.value.companyZip);
     this.storeForm.get('storeEmail').patchValue(this.companyForm.value.companyEmail);
     this.storeForm.get('storeContact').patchValue(this.companyForm.value.companyContact);
     this.filedatastore = this.filedata;
    } 
    else{
     this.storeForm.get('storeName').patchValue('');
     this.storeForm.get('storeAddress').patchValue('');
     this.storeForm.get('storePrimaryContact').patchValue('');
     this.storeForm.get('storeWebsite').patchValue('');
     this.storeForm.get('storeState').patchValue('');
     this.storeForm.get('storeCity').patchValue('');
     this.storeForm.get('storeZipcode').patchValue('');
     this.storeForm.get('storeEmail').patchValue('');
     this.storeForm.get('storeContact').patchValue('');
     this.filedatastore = '';
    }
    }
   

}