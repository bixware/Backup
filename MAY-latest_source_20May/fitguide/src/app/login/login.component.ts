import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PostService } from '../post.service';
import { environment } from 'src/environments/environment';
declare var webGlObject: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  filedata: any;
  filedatastore: any;
  captchaInt: string = null;
  title: any;
  submitted = false;
  subTitle1: any;
  subTitle2: any;
  copyright: any;
  loginImage: any;
  dummy: string;
  capserror_msg: string = null;
  error_msg: string = null;
  error = false;
  signInForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    captchaVal: new FormControl('', [Validators.required]),
    captchaInt: new FormControl('', [Validators.required]),
  });
  loginDate: any;
  month: any;
  day: any;
  hour: any;
  minute: any;
  apiFlag: any;
  clicked: any;
  imgFlag: any;
  successMessage: any;
  registerFlag: boolean;
  back: any;
  trial = {
    userUID: '',
  };
  public compannounce = {
    userUID: '',
    companyUID: null
  }
  public storeannounce = {
    userUID: '',
    storeUID: null
  }

  constructor(private router: Router, private postService: PostService, private http: HttpClient, public fb: FormBuilder, private location: Location) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;
  }

  get f1() {
    return this.signInForm.controls;
  }

  ngOnInit(): void {
    this.clicked = false;
    this.apiFlag = false;
    this.filedata = '';
    this.randomInteger();
    this.http.get<any>(this.apiURL + '/api/getallcommoncontent')
      .subscribe(data => {
        this.title = data.contentDetails[1].TextData;
        this.subTitle1 = data.contentDetails[5].TextData;
        this.subTitle2 = data.contentDetails[0].TextData;
        this.copyright = data.contentDetails[2].TextData + ' ' + data.contentDetails[3].TextData;
        let temp = data.contentDetails[4].imageURL;
        temp = temp.replace(/\\/g, '');
        this.loginImage = this.imgURL + temp + data.contentDetails[4].ImageData;
      });
    this.registerFlag = false;
    this.imgFlag = true;
    $("#rbtn").hide();
    $("#style-1").hide();
    $(".scrollbar").hide();
    $("#storedrop").hide();
    this.error = false;

  }

  randomInteger = () => {
    var a = Math.ceil(Math.random() * 10) + '';
    var b = Math.ceil(Math.random() * 10) + '';
    var c = Math.ceil(Math.random() * 10) + '';
    var d = Math.ceil(Math.random() * 10) + '';
    var e = Math.ceil(Math.random() * 10) + '';
    var f = Math.ceil(Math.random() * 10) + '';
    var g = Math.ceil(Math.random() * 10) + '';
    //  this.captchaInt = a + b + c + d;
    this.signInForm.patchValue({ captchaInt: a + b + c });
  }


  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  fileEventStore(e) {
    this.filedatastore = e.target.files[0];
  }

  removeError(event: any): void {
    this.capserror_msg = '';
  }


  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.back();
      this.clicked = false;
      location.reload();
    }
  }

  submit(): void {
    this.error = false;
    if (this.signInForm.value.userName != '') {
      this.error = false;
      if (this.signInForm.value.password != '') {
        this.error = false;
        if (this.signInForm.value.captchaVal != '' && this.signInForm.value.captchaVal == this.signInForm.value.captchaInt) {
          this.error = false;
          this.capserror_msg = '';
          this.postService.login(this.signInForm.value).subscribe(result => {
            if (result.return_code == '0') {
              this.loginDate = Date.now();
              localStorage.setItem('userName', result.user.userName);
              localStorage.setItem('user_id', result.user.userUID);
              localStorage.setItem('name', result.user.firstName + ' ' + result.user.lastName);
              localStorage.setItem('role_id', result.user.roleUID);
              localStorage.setItem('menu_data', JSON.stringify(result.roleMenus));
              localStorage.setItem('login_time', this.loginDate);
              localStorage.setItem('storeName', result.user_status[0].storeName);
              localStorage.setItem('branchName', result.user_status[0].branchName);
              localStorage.setItem('distributorName', result.user_status[0].distributorName);
              localStorage.setItem('companyName', result.user_status[0].companyName);
              //localStorage.setItem('companyLogo', result.companyLogo);
              //localStorage.setItem('token', result.authorisation.token);
              localStorage.setItem('isBannerAds', result.user.isBannerAds);
              localStorage.setItem('userStoreUID', result.user_store);
              localStorage.setItem('userCompanyUID', result.user.companyUID);
              localStorage.setItem('roleName', result.user_status[0].roleName);
              sessionStorage.setItem('globalAnnouncement', "false");
              sessionStorage.setItem('companyAnnouncement', "false");
              sessionStorage.setItem('storeAnnouncement', "false");
              this.router.navigate(['home/search']);
              localStorage.setItem('profileImage', this.imgURL + 'storage/app/public/uploads/company/' + result.companyLogo);
            }
            else {
              this.error = true;
              if (result.err_message == 'Validation Errors') {
                this.error_msg = result.errors[0];
              } else {
                this.error_msg = result.err_message;
              }
              this.signInForm.patchValue({ captchaVal: '' });
              this.randomInteger();
            }
          });
        } else {
          //this.error = true;
          //this.error_msg = 'Invalid login credentials';
          this.capserror_msg = 'Captcha does not match';
        }
      } else {
        this.error = true;
        this.error_msg = 'Please required Password';
        this.signInForm.patchValue({ captchaVal: '' });
        this.randomInteger();
      }
    } else {
      this.error = true;
      this.error_msg = 'Please required Username';
      this.signInForm.patchValue({ captchaVal: '' });
      this.randomInteger();
    }
  }


  ngAfterViewInit(): void {
    webGlObject.init();
  }
}
