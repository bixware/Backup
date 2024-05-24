import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
declare var updatePageTitle: any;
@Component({
  selector: 'app-bannerads',
  templateUrl: './bannerads.component.html',
  styleUrls: ['./bannerads.component.scss']
})
export class BanneradsComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  bannerform: FormGroup;
  submitted = false;
  public Addbanner = {
    firstName: null,
    email: null,
    userUID:null,
    store: null,
    mobileNo: null,
    decisionCheck: null,
    decisionPersonName: null,
    featuresInfo: null,
    alreadyKnow: null
  }
  apiFlag: any;
  successMessage: any;
  clicked: any;
  decisionMakerFlag:any;
  isDecisionchecked = false;
  contentImage ='';
  contentData :any;
  public user = {
    roleUID: '',
    userUID: ''
  }
  decisionCheckError : any;
  constructor(private http: HttpClient, private location: Location, public fb: FormBuilder) { 
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;

    this.bannerform = this.fb.group({
      firstName: ['', Validators.required],
      /* lastName: ['', Validators.required], */
      email: ['', [Validators.required, Validators.email]],
      store: ['', Validators.required],
      phone: ['', Validators.required],
      decisionMakerName: [''],
      isOtherFeatures: ['', Validators.required],
      checkyes: ['', Validators.required],
      /* decisionMaker: ['', Validators.required] */
    });
  }
  get b(): any { return this.bannerform.controls; }

  ngOnInit(): void {
    this.apiFlag = false;
    this.clicked = false;
    this.decisionMakerFlag = false;
    this.decisionCheckError =  false;
    this.Addbanner.userUID = localStorage.getItem('user_id');
    this.getContentImage();
    updatePageTitle('Signup Form');
  }

  back(): void {
    this.location.back();
  }

  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      //location.reload();
      this.clicked = false;
    }
  }

  addBanner(): void {
    this.submitted = true;
    if ($('#no').prop('checked') === true && this.Addbanner.decisionCheck == 0) {
      //this.isDecisionchecked = true;
      this.decisionCheckError =  true;
      this.Addbanner.decisionPersonName = this.bannerform.value.decisionMakerName ? this.bannerform.value.decisionMakerName : '' ;
    }
    else {
      //this.Addbanner.decisionCheck = 1;
      //this.isDecisionchecked = false;
      this.decisionCheckError =  true;
    }
    if (this.bannerform.invalid) {
      return;
    }
    /* if(this.isDecisionchecked ===true)
    if(this.bannerform.value.decisionMakerName=="" && this.bannerform.value.decisionMakerName==null && this.bannerform.value.decisionMakerName==undefined)
    {
    this.decisionCheckError = true;
    return;
    }
    else {
      this.decisionCheckError = false;
    } */
    console.log(this.bannerform.value.isOtherFeatures)
     this.Addbanner.userUID = localStorage.getItem('user_id');
     this.Addbanner.firstName = this.bannerform.value.firstName;
     this.Addbanner.email = this.bannerform.value.email;
     this.Addbanner.store = this.bannerform.value.store;
     this.Addbanner.mobileNo = this.bannerform.value.phone;
     this.Addbanner.decisionPersonName = this.bannerform.value.decisionMakerName ? this.bannerform.value.decisionMakerName : '' ;
     this.Addbanner.featuresInfo = this.bannerform.value.isOtherFeatures =="0"? 1:0;
     this.Addbanner.alreadyKnow = this.bannerform.value.isOtherFeatures =="1"? 1:0;
     this.Addbanner.decisionCheck = this.bannerform.value.checkyes =="1" ? 1:0;
     console.log(this.Addbanner);
     this.apiFlag = true;
     this.clicked = true;
      this.http.post<any>(this.apiURL + '/api/adddetailsfrombanner', this.Addbanner)
        .subscribe(data => {
          document.getElementById('text').style.display = 'none';
          if (data.return_code == 0) {
            this.successMessage = 'Mail has been sent to Site Administrator';
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

  setDecisionMaker(): void {
    if ($('#no').prop('checked') === true) {
      this.decisionMakerFlag = true;
    }
    else {
      this.decisionMakerFlag = false;
    }
  }

  changeFeature(e) {
    console.log(e.target.value);
  }

getContentImage(){
  this.user.roleUID = localStorage.getItem('role_id');
  this.user.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/getallcontent', this.user)
        .subscribe(data => {
        this.contentData = (data as any).contentDetails;
       let bannerContent = this.contentData.find((item)=>item.contentUID === 24);
       //let bannerContent = this.contentData.find((item)=>item.contentUID === 28);
       this.contentImage =this.imgURL + 'storage/app/public/uploads/content/' + bannerContent.ImageData;
       console.log(this.contentImage);
       
  });
}

}

